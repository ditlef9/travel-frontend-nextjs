// app/(private)/layout.tsx
// This is the layout for the private / logged in pages.
//

"use client"; 

import { SWRConfig } from "swr";
import Header from "./header";
import Footer from "./footer";
import fetcher from "@/app/util/fetcher";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerLayout>{children}</InnerLayout>
    </SessionProvider>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  console.log("InnerLayout()::Init");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    // Authentication
    if (status === "unauthenticated") {
      console.log("InnerLayout()::unauthenticated!");
      router.push("/"); // Redirect to sign-in page if not authenticated
    }

    // Random BG
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
    
  }, [status, router]);

  if (status === "loading") {
    console.log("InnerLayout()::Loading layout!");
    return <div><span style={{color: "black"}}>Loading - Please wait while InnerLayout is loading!</span></div>;
  }

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <div className="container" style={bgStyle}>
        <div className="container-content">
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </SWRConfig>
  );
}
