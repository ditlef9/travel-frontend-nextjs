// app/(public)/hello/page.tsx

"use client";
import React, { useState } from "react";

export default function SignUp() {
  // State hooks
  const [feedbackType, setFeedbackType] = useState<string | undefined>(undefined);
  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>(undefined);

  async function handleButton() {
    try {
      const res = await fetch("http://localhost:8080/hello-world-bean", {
        method: "GET",
        headers: {
          "Origin": "http://localhost:3000"
        },
      });

      // const resJson = await res.json();

      // Assuming resJson has fields like type and message
      // setFeedbackType(resJson.type); // Adjust based on actual response
      // setFeedbackMessage(resJson.message); // Adjust based on actual response
      setFeedbackType("success");
      setFeedbackMessage("Hello!");
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("An error occurred: " + (error as any).toString());

    }
  }

  return (
    <>
      <h1>Hello!</h1>
      
      {/* Error */}
      {feedbackMessage && (
        <div className={feedbackType}>
          <span>{feedbackMessage}</span>
        </div>
      )}

      <p>
        <button type="button" onClick={handleButton}>Call Rest API</button>
      </p>
    </>
  );
}
