// app/(private)/header.tsx

"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{paddingBottom: 0, marginBottom: 0}}>
      <p style={{padding: 0, margin: 0}}><Link href="/dashboard">Smart Travel App</Link></p>
      <span>NAME</span>
    </header>
  );
}
