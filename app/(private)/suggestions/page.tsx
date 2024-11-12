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

  const [suggestedDestinations, setSuggestedDestinations] = useState<VisitedDestinationI[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch suggested destinations when the component mounts
  useEffect(() => {
    const fetchSuggestedDestinations = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/visited-destinations/suggestions", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session?.user?.token,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch suggested destinations");
        const data = await response.json();
        setSuggestedDestinations(data);
      } catch (error) {
        console.error("Failed to fetch suggested destinations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedDestinations();
  }, []);

  return (
    <div>
      <h1>Suggested Destinations for {session?.user?.name}</h1>
      {loading && <p>Loading...</p>}

      {/* Display suggested destinations */}
      {suggestedDestinations.length === 0 ? (
        <p>No suggestions available. Add more interests or destinations!</p>
      ) : (
        <ul>
          {suggestedDestinations.map((destination) => (
            <li key={destination.id}>{destination.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
