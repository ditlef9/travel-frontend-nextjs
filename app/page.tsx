'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { CredentialsForm } from "./(public)/sign-in/components/credentialsForm";


export default function Home() {
  // State to store the random background style
  const [bgStyle, setBgStyle] = useState({});


  useEffect(() => {
    // Define an array of background image URLs
    const backgrounds = [
      '/gfx/hero/background-suitcase.jpg',
      '/gfx/hero/pexels-ajay-donga-1113836-2174656.jpg',
      '/gfx/hero/pexels-andreimike-1271619.jpg',
      '/gfx/hero/pexels-element5-1051075.jpg',
      '/gfx/hero/pexels-te-lensfix-380994-1371360.jpg'
    ];

    // Pick a random background image
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Set the background style
    setBgStyle({ backgroundImage: `url(${randomBg})` });
  }, []);

  
  return (
    <div className="container" style={bgStyle}>
      <div className="container-content">

        {/* Header */}
        <header>
          <p><a href="/">Smart Travel App</a></p>
          <span>Get itineraries, attractions, and accommodations based on your travel interests with AI</span>
        </header>


        {/* Main */}
        <main>
            {/* Sign in/sign up */}
            <div className="tabs">
                <Link href="/" className="active">Sign In</Link>
                <Link href="/sign-up">Sign Up</Link>
            </div>
            {/* Sign in */}
            <div className="sign-in">
              
              {/* Sign-In Form */}
              <CredentialsForm />

            </div>
        </main>


        {/* Footer */}
        <footer>
          <ul>
            <li><a href="http://github.com/ditlef9">&copy; 2024 Ditlefsen</a></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </footer>
      </div> {/* //container-content - */}
    </div>
  );
}
