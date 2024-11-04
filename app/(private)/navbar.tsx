// app/(private)/navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";

// Icons
import dashboard_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20 from '/public/icons/20x20/dashboard_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg';
import person_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20 from '/public/icons/20x20/person_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg';
import interests_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20 from '/public/icons/20x20/interests_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg';
import pin_drop_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20 from '/public/icons/20x20/pin_drop_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg';
import prompt_suggestion_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20 from '/public/icons/20x20/prompt_suggestion_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/dashboard">
            <div className="nav-item">
              <Image src={dashboard_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20} alt="Dashboard" width={20} height={20} />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <div className="nav-item">
              <Image src={person_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20} alt="Profile" width={20} height={20} />
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/interests">
            <div className="nav-item">
              <Image src={interests_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20} alt="Interests" width={20} height={20} />
              <span>Interests</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/locations">
            <div className="nav-item">
              <Image src={pin_drop_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20} alt="Locations" width={20} height={20} />
              <span>Locations</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/suggestions">
            <div className="nav-item">
              <Image src={prompt_suggestion_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20} alt="Travel Suggestions" width={20} height={20} />
              <span>Travel Suggestions</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
