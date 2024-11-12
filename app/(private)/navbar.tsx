// app/(private)/navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";

// Icons
import dashboard_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/dashboard_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import person_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/person_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import interests_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/interests_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import pin_drop_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/pin_drop_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import prompt_suggestion_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/prompt_suggestion_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 from '/public/icons/24x24/logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';


export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/suggestions">
            <div className="nav-item">
              <Image src={dashboard_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24} alt="Travel Suggestions" width={24} height={24} />
              <span>Travel Suggestions</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/interests">
            <div className="nav-item">
              <Image src={interests_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24} alt="Interests" width={24} height={24} />
              <span>Interests</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/visited-destinations">
            <div className="nav-item">
              <Image src={pin_drop_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24} alt="Locations" width={24} height={24} />
              <span>Visited Destinations</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/sign-out">
            <div className="nav-item">
              <Image src={logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24} alt="Log out" width={24} height={24} />
              <span>Sign out</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
