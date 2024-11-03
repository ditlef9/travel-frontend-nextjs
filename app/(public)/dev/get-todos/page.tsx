// app/(public)/dev/get-todos/page.tsx

"use client";
import { Todo } from "@/app/types/TodoI";
import React, { FormEvent, useEffect, useState } from "react";


export default function GetTodos() {
  // Staes
  const [username, setUsername] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // State for todos
  const [feedbackType, setFeedbackType] = useState<string | undefined>(undefined);
  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>(undefined);

  // Handle submit
  async function handleSubmit(e: FormEvent) {
    console.log(`GetTodos()::handleSubmit()::Init with username=${username} from http://localhost:8080/users/${username}/todos`);

    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/users/${username}/todos`, {
        method: "GET",
        headers: {
          "Origin": "http://localhost:3000",
          "Access-Control-Allow-Origin":  "http://localhost:3000"
        },
      });

      if (!res.ok) {
        console.log(`GetTodos()::handleSubmit()::Failed to fetch todos because ???`);
        throw new Error("Failed to fetch todos");
      }

      const resJson: Todo[] = await res.json(); // Assuming response is an array of todos
      setTodos(resJson); // Set todos to state
      console.log(`GetTodos()::handleSubmit()::Success resJson=${resJson}`);
      setFeedbackType("success");
      setFeedbackMessage("Todos fetched successfully!");
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("An error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  }

// Delete
async function handleDelete(id: number) { 
  console.log(`GetTodos()::handleSubmit()::Deleting ${username}/${id} from http://localhost:8080/users/${username}/todos/${id}`);

  try {
    const res = await fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.log(`GetTodos()::handleDelete()::Failed to delete todo with id=${id}`);
      throw new Error("Failed to delete todo");
    }

    // Optionally, you might want to refresh the todos after deletion
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)); // Update state without needing another fetch
    setFeedbackType("success");
    setFeedbackMessage("Todo deleted successfully!");
  } catch (error) {
    setFeedbackType("error");
    setFeedbackMessage("An error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

  return (
    <>
      <h1>Get Todos for Username!</h1>
      
      {/* Error */}
      {feedbackMessage && (
        <div className={feedbackType}>
          <span>{feedbackMessage}</span>
        </div>
      )}


      {/* Form */ }
      <form onSubmit={handleSubmit}>

        {/* Username Input */}
        <p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            placeholder="Username"
            required
          />
        </p>

        <p>
          <button type="submit">Show Todos</button>
        </p>
      </form>

      
      {/* Todos Table */}
      {todos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Desc</th>
              <th>Target</th>
              <th>Done</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.targetDate}</td>
                <td>{todo.done ? 'Yes' : 'No'}</td>
                <td><button className="btn_warning" onClick={() => handleDelete(todo.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </>
  );
}
