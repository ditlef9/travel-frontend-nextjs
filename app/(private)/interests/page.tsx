// app/(private)/interests/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

export default function InterestsPage() {
  // Session
  const { data: session } = useSession();
  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  const [interests, setInterests] = useState<InterestI[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [editingInterest, setEditingInterest] = useState<InterestI | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch interests when the component mounts
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/interests", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session?.user?.token
          },
        });
        if (!response.ok) throw new Error("Failed to fetch interests");
        const data = await response.json();
        setInterests(data);
      } catch (error) {
        console.error("Failed to fetch interests", error);
      }
    };

    fetchInterests();
  }, []);

  // Add a new interest
  const addInterest = async () => {
    if (!newInterest) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/interests", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token
         },
        body: JSON.stringify({ name: newInterest }),
      });
      if (!response.ok) throw new Error("Failed to add interest");
      const data = await response.json();
      setInterests((prev) => [...prev, data]);
      setNewInterest("");
    } catch (error) {
      console.error("Failed to add interest", error);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing interest
  const updateInterest = async (id: number, name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/interests/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token 
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to update interest");
      const updatedInterest = await response.json();
      setInterests((prev) =>
        prev.map((interest) => (interest.id === id ? updatedInterest : interest))
      );
      setEditingInterest(null);
    } catch (error) {
      console.error("Failed to update interest", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an interest
  const deleteInterest = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/interests/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.token 
        },
      });
      if (!response.ok) throw new Error("Failed to delete interest");
      setInterests((prev) => prev.filter((interest) => interest.id !== id));
    } catch (error) {
      console.error("Failed to delete interest", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{session?.user?.name}'s Interests</h1>
      {loading && <p>Loading...</p>}

      {/* Add New Interest */}
      <form>
        <p>
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="New interest"
        />
        &nbsp; <button onClick={addInterest} disabled={loading || !newInterest}>Add Interest</button>
        </p>
      </form>

      {/* Display Interests */}
      {interests.length === 0 ? (
          <p>No interests found. Add one!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th><span>Interest Name</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {interests.map((interest) => (
              <tr key={interest.id}>
                {editingInterest?.id === interest.id ? (
                  <td colSpan={2}>
                    <span>
                    <input
                      type="text"
                      value={editingInterest.name}
                      onChange={(e) => setEditingInterest({ ...editingInterest, name: e.target.value })}
                    />
                    &nbsp; <button onClick={() => updateInterest(interest.id, editingInterest.name)}>Save</button>
                    &nbsp; <button onClick={() => setEditingInterest(null)}>Cancel</button>
                    </span>
                  </td>
                ) : (
                  <>
                    <td><span>{interest.name}</span></td>
                    <td>
                      <span>
                        <button onClick={() => setEditingInterest(interest)}>Edit</button>
                      &nbsp;
                      <button onClick={() => deleteInterest(interest.id)}>Delete</button></span>
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

