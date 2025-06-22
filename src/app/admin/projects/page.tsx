"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "", tech: "", github: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setForm({
      ...projects[index],
      tech: Array.isArray(projects[index].tech) ? projects[index].tech.join(", ") : projects[index].tech || ""
    });
  }

  function handleDelete(index: number) {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    saveProjects(updated);
  }

  function handleCancel() {
    setEditIndex(null);
    setForm({ title: "", description: "", tech: "", github: "" });
  }

  async function saveProjects(updated: Project[]) {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Projects updated!");
    } catch {
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let updated: Project[];
    if (editIndex !== null) {
      updated = projects.map((p, i) => (i === editIndex ? { ...form, tech: form.tech.split(",").map((t: string) => t.trim()) } as Project : p));
    } else {
      updated = [...projects, { ...form, tech: form.tech.split(",").map((t: string) => t.trim()) } as Project];
    }
    setProjects(updated);
    setForm({ title: "", description: "", tech: "", github: "" });
    setEditIndex(null);
    await saveProjects(updated);
  }

  return (
    <AdminAuthGuard>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <input name="tech" value={form.tech} onChange={handleChange} placeholder="Tech (comma separated)" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub Link" className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" />
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
          {projects.map((project, i) => (
            <li key={i} className="mb-4 p-4 rounded bg-gray-100 dark:bg-gray-700 flex flex-col gap-2">
              <div className="font-bold">{project.title}</div>
              <div>{project.description}</div>
              <div className="text-sm text-blue-600">{Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}</div>
              <div>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub</a>
                )}
              </div>
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