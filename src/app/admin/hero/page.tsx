"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState } from "react";
import React from "react";

export default function HeroAdminPage() {
  // Initial values could be fetched from an API in the future
  const [title, setTitle] = useState("Jayasurya");
  const [subtitle, setSubtitle] = useState("Aspiring DevOps Engineer | Automating the Future");
  const [buttonText, setButtonText] = useState("View My Work");
  const [buttonLink, setButtonLink] = useState("#projects");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, buttonText, buttonLink }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess('Hero section updated!');
    } catch (err) {
      setError('Failed to save. Please try again.');
    }
    setLoading(false);
  }

  return (
    <AdminAuthGuard>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Hero Section (Main Banner)</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={e => setButtonText(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Button Link</label>
            <input
              type="text"
              value={buttonLink}
              onChange={e => setButtonLink(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            {loading ? "Saving..." : "Save"}
          </button>
          {success && <div className="text-green-600 text-center mt-2">{success}</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
      </div>
    </AdminAuthGuard>
  );
} 