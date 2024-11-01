// app/(public)/terms-of-service/page.tsx

"use client";
import React from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <h1>Terms of Service</h1>
      
      <p>Last Updated: 01.11.2024</p>

      <p>
        Welcome to Travel App (“we,” “our,” “us”). By using our mobile application (the 
        “App”) and related services (the “Services”), you agree to these Terms of Service 
        (“Terms”). Please read them carefully.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using our App, you agree to be bound by these Terms. If you do not 
        agree, you may not use our Services.
      </p>

      <h2>2. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify you of any 
        changes by posting the new Terms on this page. Your continued use of the App after 
        changes are made constitutes your acceptance of the new Terms.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        To use certain features of our App, you may be required to create an account. You 
        agree to provide accurate, current, and complete information during the registration 
        process and to update such information to keep it accurate, current, and complete. You 
        are responsible for maintaining the confidentiality of your account and password and 
        for all activities that occur under your account.
      </p>

      <h2>4. Use of the App</h2>
      <p>
        You agree to use the App only for lawful purposes and in accordance with these Terms. 
        You agree not to:
      </p>
      <ul>
        <li>
          Use the App in any way that violates any applicable federal, state, local, or 
          international law or regulation.
        </li>
        <li>
          Engage in any conduct that restricts or inhibits anyone’s use or enjoyment of the 
          App.
        </li>
        <li>
          Transmit any unsolicited or unauthorized advertising or promotional material.
        </li>
      </ul>

      <h2>5. Third-Party Services</h2>
      <p>
        Our App may contain links to third-party websites or services that are not owned or 
        controlled by us. We have no control over, and assume no responsibility for, the 
        content, privacy policies, or practices of any third-party websites or services.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The App is provided on an “as-is” and “as-available” basis. We make no representations 
        or warranties of any kind, express or implied, regarding the operation of the App or 
        the information, content, materials, or products included in the App.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, we shall not be liable for any 
        direct, indirect, incidental, special, consequential, or punitive damages, including 
        without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
        resulting from (i) your use of or inability to use the App; (ii) any unauthorized 
        access to or use of our servers and/or any personal information stored therein.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of Norway, 
        without regard to its conflict of law principles.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at 
        <a href="https://github.com/ditlef9" target="_blank" rel="noopener noreferrer"> 
        https://github.com/ditlef9</a>.
      </p>
    </>
  );
}
