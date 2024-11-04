// app/(private)/header.tsx

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession

export default function Header() {
  const { data: session } = useSession(); // Get session data

  return (
    <header style={{ paddingBottom: 0, marginBottom: 0 }}>
      <p style={{ padding: 0, margin: 0 }}>
        <Link href="/dashboard">Smart Travel App</Link>
      </p>
      {/* Display user email or a placeholder if the user is not authenticated */}
      <span style={{ fontWeight: 'bold', color: '#FFD700' }}>
        {session?.user?.name || "Guest"} {/* Use optional chaining to avoid undefined errors */}
      </span>
    </header>
  );
}
