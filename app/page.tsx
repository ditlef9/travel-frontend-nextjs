import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>

      {/* Header */}
      <header>
        <p><a href="/">Smart Travel App</a></p>
        <span>Get itineraries, attractions, and accommodations based on your travel interests with AI</span>
      </header>

      {/* Nav */}
      <nav>
        <ul>
          <li><a href="/sign-up">Sign up</a></li>
          <li><a href="/sign-in">Sign in</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <div className="hero">
        <img src="/gfx/hero/suitcase-1280x405.png" alt="suitcase-1280x405.png" />
      </div>

      {/* Main */}
      <main>

      </main>

      {/* Footer */}
      <footer>
        <ul>
          <li><a href="http://github.com/ditlef9">&copy; 2024 Ditlefsen</a></li>
        </ul>
      </footer>
    </>
  );
}
