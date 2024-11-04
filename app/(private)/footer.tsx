// app/(private)/footer.tsx

"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li><Link href="http://github.com/ditlef9">&copy; 2024 Ditlefsen</Link></li>
        <li><Link href="/terms-of-service">Terms of Service</Link></li>
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
      </ul>
    </footer>
  );
}
