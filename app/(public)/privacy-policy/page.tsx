// app/(public)/privacy-policy/page.tsx

"use client";
import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last Updated: 01.11.2024</p>

      <p>
        Your privacy is important to us. This Privacy Policy explains how [Your App Name] 
        (“we,” “our,” “us”) collects, uses, and discloses your information when you use our 
        mobile application (the “App”) and related services (the “Services”).
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect and process the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Information that can identify you, such as your 
          name, email address, phone number, and payment information when you register for an 
          account or use our Services.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you use our App, including your IP 
          address, browser type, operating system, pages visited, and the time and date of your 
          visit.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We may use your information for the following purposes:</p>
      <ul>
        <li>To provide and maintain our Services.</li>
        <li>To improve, personalize, and expand our Services.</li>
        <li>To communicate with you, including customer support and marketing communications.</li>
        <li>To process transactions and send you related information.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We do not sell or rent your personal information to third parties. We may share your 
      information with:</p>
      <ul>
        <li>Service providers who help us operate our App and provide our Services.</li>
        <li>Business partners to offer you certain products or services.</li>
        <li>Law enforcement or other governmental agencies if required by law.</li>
      </ul>

      <h2>4. Security of Your Information</h2>
      <p>
        We implement reasonable security measures to protect your information from unauthorized 
        access, use, or disclosure. However, no method of transmission over the Internet or method 
        of electronic storage is 100% secure, and we cannot guarantee its absolute security.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have certain rights regarding your personal information, including:</p>
      <ul>
        <li>The right to access, update, or delete your personal information.</li>
        <li>The right to object to or restrict the processing of your information.</li>
        <li>
          The right to withdraw consent at any time where we rely on consent to process your 
          information.
        </li>
      </ul>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by 
        posting the new Privacy Policy on this page with a new “Last Updated” date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at 
        https://github.com/ditlef9.
      </p>
    </>
  );
}
