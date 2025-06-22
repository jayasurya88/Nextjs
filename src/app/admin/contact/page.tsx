"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState, useEffect } from "react";

export default function ContactAdminPage() {
  const [form, setForm] = useState({ email: "", phone: "", address: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then(res => res.json())
      .then(data => setForm(data));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Contact info updated!");
    } catch {
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  }

  return (
    <AdminAuthGuard>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Contact Info</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          {success && <div className="text-green-600 text-center mt-2">{success}</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
      </div>
    </AdminAuthGuard>
  );
} 