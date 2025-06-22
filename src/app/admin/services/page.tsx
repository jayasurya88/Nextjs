"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState, useEffect } from "react";

type Service = {
  title: string;
  description: string;
};

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setForm(services[index]);
  }

  function handleDelete(index: number) {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
    saveServices(updated);
  }

  function handleCancel() {
    setEditIndex(null);
    setForm({ title: "", description: "" });
  }

  async function saveServices(updated: Service[]) {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Services updated!");
    } catch {
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let updated: Service[];
    if (editIndex !== null) {
      updated = services.map((s, i) => (i === editIndex ? form : s));
    } else {
      updated = [...services, form];
    }
    setServices(updated);
    setForm({ title: "", description: "" });
    setEditIndex(null);
    await saveServices(updated);
  }

  return (
    <AdminAuthGuard>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Manage Services</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
              {editIndex !== null ? "Update" : "Add"}
            </button>
            {editIndex !== null && (
              <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            )}
          </div>
        </form>
        {success && <div className="text-green-600 text-center mb-2">{success}</div>}
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <ul>
          {services.map((service, i) => (
            <li key={i} className="mb-4 p-4 rounded bg-gray-100 dark:bg-gray-700 flex flex-col gap-2">
              <div className="font-bold">{service.title}</div>
              <div>{service.description}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(i)} className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(i)} className="text-xs bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminAuthGuard>
  );
} 