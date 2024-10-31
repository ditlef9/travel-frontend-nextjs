// app/(public)/sign-dup/page.tsx

"use client";
import React, { FormEvent, useEffect, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState<boolean>(false);

  const [error, setError] = useState<string>(""); // main error message
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // Reset errors
    setError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!agreeToTerms) {
      setError("You must agree to the terms of service.");
      return;
    }

    if (!agreeToPrivacy) {
      setError("You must agree to the privacy policy.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.{12,})/; // Include . in the regex
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

      setPasswordError(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("The passwords you entered do not match. Please try again.");
      return;
    }

    const res = await fetch("http://localhost:8080/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      const errorResponse = await res.json();
      const errorMessage = errorResponse.error === "email already exists" 
        ? "This email is already registered. Please use a different email address or log in."
        : "An error occurred during sign up. Please try again later.";
      setError(errorMessage);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg">
        <div className="text-center">
          <h3 className="font-semibold">Sign Up</h3>
        </div>

        <div className="my-3">
          <hr />
        </div>

        {/* Error */}
        {error && <div className="error" role="alert"><span>{error}</span></div>}

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            className={`text-black p-3 border ${emailError ? 'border-red-500' : 'border-slate-700'} rounded-lg`}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Email"
            required
          />
          {emailError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert"><span className="font-medium text-red-800">{emailError}</span></div>}
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            className="text-black p-3 border border-slate-700 rounded-lg"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            placeholder="Name"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label>Password<br />
            <span className="text-sm">Your password must be at least 12 characters long, contain at least one uppercase letter, and at least one special character.</span>
          </label>
          <input className={`text-black p-3 border ${passwordError ? 'border-red-500' : 'border-slate-700'} rounded-lg`} type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password" placeholder="Password" required />
          {passwordError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert"><span className="font-medium text-red-800">{passwordError}</span></div>}
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            className={`text-black p-3 border ${confirmPasswordError ? 'border-red-500' : 'border-slate-700'} rounded-lg`}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            id="confirm-password"
            placeholder="Confirm Password"
            required
          />
          {confirmPasswordError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert"><span className="font-medium text-red-800">{confirmPasswordError}</span></div>}
        </div>

        {/* Terms of Service and Privacy Policy */}
        <div className="flex flex-col gap-2 mt-4">
          <label>
            <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} />
            &nbsp;I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-500">terms of service</a>.
          </label>
          <label>
            <input type="checkbox" checked={agreeToPrivacy} onChange={(e) => setAgreeToPrivacy(e.target.checked)} />
            &nbsp;I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500">privacy policy</a>.
          </label>
        </div>

        <button type="submit" className="mt-4 bg-slate-900 text-white p-3 rounded-lg">Sign Up</button>
      </form>
    </div>
  );
}
