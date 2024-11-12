// app/(private)/sign-out/page.tsx

"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  useEffect(() => {
    const signOutUser = async () => {
      await signOut({ callbackUrl: '/?signed-out' }); 
      // `callbackUrl` automatically redirects to this URL after signOut.
    };

    signOutUser();
  }, []);

  return (
    <>

      <div className="main_box">
        <div className="loading"></div><h1>Signing out...</h1>
      </div>
    </>
  );
}
