// app/lib/auth.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Null check for credentials
        if (!credentials || !credentials.email || !credentials.password) return null;
      
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
      
        try {
          const res = await fetch("http://localhost:8080/api/users/sign-in", {
            method: "POST",
            headers: {
              "Origin": "http://localhost:3000",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          if (!res.ok) {
            const errorResponse = await res.json();
            console.log(`Error response: ${errorResponse.message}`);
            return null; // Return null if the response is not ok
          }
      
          const data = await res.json(); // Assuming the response contains the token
          const token = data.token; // Adjust this to match your API's response structure
          const userId = data.userId; // Adjust as necessary to obtain the user id
      
          // Type assertion here
          return {
            id: userId,  // Ensure you have a user id
            email: credentials.email,
            token, // Include the token
          } as unknown as User; // Cast it as unknown first, then to User
      
        } catch (error) {
          console.error("Error occurred during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach token to session if available
      if (session?.user && token) {
        session.user.email = token.email;
        session.user.token = token.token; // Add the token to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      // Persist user data and token in the JWT
      if (user) {
        token.email = user.email;
        token.token = user.token; // Save the token in the JWT
      }
      return token;
    },
  },
};
