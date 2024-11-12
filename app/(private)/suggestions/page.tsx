// app/(private)/interests/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

export default function SugestionsPage() {
  // Session
  const { data: session } = useSession();
  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  const [suggestions, setSuggestions] = useState<SuggestionI[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch interests when the component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/suggestions", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session?.user?.token
          },
        });
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
      }
    };

    fetchSuggestions();
  }, []);


  return (
    <div>
      <h1>{session?.user?.name}'s Travel Suggestions</h1>
      {loading && <p>Loading...</p>}

    
    </div>
  );
}

