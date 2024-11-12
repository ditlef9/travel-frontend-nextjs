// app/(private)/visited-destinations/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

interface VisitedDestination {
  id: number;
  name: string;
}

export default function DestinationsPage() {
  // Session
  const { data: session } = useSession();
  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  const [visitedDestinations, setVisitedDestinations] = useState<VisitedDestination[]>([]);
  const [newDestination, setNewDestination] = useState("");
  const [editingDestination, setEditingDestination] = useState<VisitedDestination | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch visited destinations when the component mounts
  useEffect(() => {
    const fetchVisitedDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/visited-destinations", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session?.user?.token,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch visited destinations");
        const data = await response.json();
        setVisitedDestinations(data);
      } catch (error) {
        console.error("Failed to fetch visited destinations", error);
      }
    };

    fetchVisitedDestinations();
  }, []);

  // Add a new destination
  const addDestination = async () => {
    if (!newDestination) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/visited-destinations", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token,
        },
        body: JSON.stringify({ name: newDestination }),
      });
      if (!response.ok) throw new Error("Failed to add destination");
      const data = await response.json();
      setVisitedDestinations((prev) => [...prev, data]);
      setNewDestination("");
    } catch (error) {
      console.error("Failed to add destination", error);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing destination
  const updateDestination = async (id: number, name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/visited-destinations/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token,
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to update destination");
      const updatedDestination = await response.json();
      setVisitedDestinations((prev) =>
        prev.map((destination) =>
          destination.id === id ? updatedDestination : destination
        )
      );
      setEditingDestination(null);
    } catch (error) {
      console.error("Failed to update destination", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a destination
  const deleteDestination = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/visited-destinations/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token,
        },
      });
      if (!response.ok) throw new Error("Failed to delete destination");
      setVisitedDestinations((prev) => prev.filter((destination) => destination.id !== id));
    } catch (error) {
      console.error("Failed to delete destination", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{session?.user?.name}'s Visited Destinations</h1>
      {loading && <p>Loading...</p>}

      {/* Add New Destination */}
      <form>
        <p>
          <input
            type="text"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            placeholder="New destination"
          />
          &nbsp;
          <button onClick={addDestination} disabled={loading || !newDestination}>
            Add Destination
          </button>
        </p>
      </form>

      {/* Display destinations */}
      {visitedDestinations.length === 0 ? (
        <p>No destinations found. Add one!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th><span>Destination Name</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {visitedDestinations.map((destination) => (
              <tr key={destination.id}>
                {editingDestination?.id === destination.id ? (
                  <td colSpan={2}>
                    <span>
                      <input
                        type="text"
                        value={editingDestination.name}
                        onChange={(e) =>
                          setEditingDestination({
                            ...editingDestination,
                            name: e.target.value,
                          })
                        }
                      />
                      &nbsp;
                      <button onClick={() => updateDestination(destination.id, editingDestination.name)}>
                        Save
                      </button>
                      &nbsp;
                      <button onClick={() => setEditingDestination(null)}>Cancel</button>
                    </span>
                  </td>
                ) : (
                  <>
                    <td><span>{destination.name}</span></td>
                    <td>
                      <span>
                        <button onClick={() => setEditingDestination(destination)}>Edit</button>
                        &nbsp;
                        <button onClick={() => deleteDestination(destination.id)}>Delete</button>
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
