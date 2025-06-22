"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState, useEffect } from "react";

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  date: string;
};

export default function ContactedAdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    fetch("/api/contact/submit")
      .then(res => res.json())
      .then(data => setSubmissions(Array.isArray(data) ? data.reverse() : []));
  }, []);

  return (
    <AdminAuthGuard>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Contacted Submissions</h1>
        <ul>
          {submissions.length === 0 && <li className="text-gray-500">No contacts yet.</li>}
          {submissions.map((s, i) => (
            <li key={i} className="mb-6 p-4 rounded bg-gray-100 dark:bg-gray-700">
              <div className="font-bold">{s.name} <span className="text-xs text-gray-400">{new Date(s.date).toLocaleString()}</span></div>
              <div className="text-sm text-blue-600">{s.email}</div>
              <div className="mt-2">{s.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </AdminAuthGuard>
  );
} 