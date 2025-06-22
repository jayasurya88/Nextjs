"use client";
import AdminAuthGuard from "../components/AdminAuthGuard";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutAdminPage() {
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        setBio(data.bio || "");
        setImage(data.image || "");
      });
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      if (imageFile) formData.append("image", imageFile);
      const res = await fetch("/api/about", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save");
      const result = await res.json();
      setSuccess("About section updated!");
      if (result.image) setImage(result.image);
    } catch (err) {
      console.error(err);
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  }

  return (
    <AdminAuthGuard>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Edit About Section</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              rows={5}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
            {image && (
              <Image src={image} alt="About" width={128} height={128} className="mt-4 rounded-lg w-32 h-32 object-cover border" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          {success && <div className="text-green-600 text-center mt-2">{success}</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
      </div>
    </AdminAuthGuard>
  );
} 