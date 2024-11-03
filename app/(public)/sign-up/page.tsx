// app/(public)/sign-up/page.tsx

"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState<boolean>(false);

  const [feedbackType, setFeedbackType] = useState<string | undefined>(undefined);
  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // Reset errors
    setFeedbackType("info");
    setFeedbackMessage("Loading...");
    setEmailError("");
    setPasswordError("");
  
    if (!agreeToTerms) {
      setFeedbackType("error");
      setFeedbackMessage("You must agree to the terms of service.");
      return;
    }
  
    if (!agreeToPrivacy) {
      setFeedbackType("error");
      setFeedbackMessage("You must agree to the privacy policy.");
      return;
    }
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedbackType("error");
      setFeedbackMessage("Email error.");
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.{12,})/; 
    if (!passwordRegex.test(password)) {
      const passwordLen = password.length;
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*.]/.test(password);
  
      let errorMessage = `Your password must be at least 12 characters long. Currently, it has ${passwordLen} characters.`;
      if (!hasUppercase) {
        errorMessage += " It should also contain at least one uppercase letter.";
      }
      if (!hasSpecialChar) {
        errorMessage += " Additionally, it must include at least one special character (e.g., !, @, #, $, %, ^, &, *, .).";
      }
  
      setFeedbackType("error");
      setFeedbackMessage("Password error.");
      setPasswordError(errorMessage);
      return;
    }
  

    // Print the JSON payload to the console
    // Create the payload
    const payload = {
      email: email,
      name: name,
      password: password,
    };
    console.log("SignUpPage()::handleSubmit()::Sending JSON:", JSON.stringify(payload, null, 2)); // Pretty print the JSON

    
    try {
      const res = await fetch("http://localhost:8080/api/users/sign-up", {
        method: "POST",
        headers: {
          "Origin": "http://localhost:3000",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        setFeedbackType("success");
        setFeedbackMessage("Welcome, " + name);
        window.location.href = "/";
      } else {
        const errorResponse = await res.json();
        setFeedbackType("error");
        setFeedbackMessage(errorResponse.message || "An error occurred during sign-up.");
      }
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage("An error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  }
  

  return (
    <>
      {/* Sign in/sign up */}
      <div className="tabs">
          <Link href="/">Sign In</Link>
          <Link href="/sign-up" className="active">Sign Up</Link>
      </div>
  
      {/* Sign up form */}
      <form onSubmit={handleSubmit}>

        {/* Error */}
        {feedbackMessage && (
          <div className={feedbackType}>
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Email Input */}
        <p>
          <input
          className={`input-field ${emailError ? 'error-border' : ''}`}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Email"
            required
          />
        </p>
        {emailError && <div className="error_small"><span>{emailError}</span></div>}


        {/* Name Input */}
        <p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            placeholder="Name"
            required
          />
        </p>

        {/* Password Input */}
        <p>
        
        <input
          className={`input-field ${passwordError ? 'error-border' : ''}`}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="Password"
          required
        />
        </p>
        {passwordError && <div className="error_small"><span>{passwordError}</span></div>}
        


        {/* Terms of Service and Privacy Policy */}
        <p>
        <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} />
        &nbsp;I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-500">terms of service</a>.
        </p>

        <p>
        <input type="checkbox" checked={agreeToPrivacy} onChange={(e) => setAgreeToPrivacy(e.target.checked)} />
        &nbsp;I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500">privacy policy</a>.
        </p>

        <button type="submit">Sign Up</button>
      </form>

          
    </>
  );
}
