"use client";
import AdminAuthGuard from "./components/AdminAuthGuard";
import Link from "next/link";
import { FaUser, FaProjectDiagram, FaCogs, FaEnvelope, FaHome, FaInbox } from "react-icons/fa";

const sections = [
  {
    name: "Hero",
    href: "/admin/hero",
    icon: <FaHome className="text-2xl text-blue-500" />,
    desc: "Edit main banner"
  },
  {
    name: "About",
    href: "/admin/about",
    icon: <FaUser className="text-2xl text-blue-500" />,
    desc: "Edit bio and profile image"
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: <FaProjectDiagram className="text-2xl text-blue-500" />,
    desc: "Manage your projects"
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: <FaCogs className="text-2xl text-blue-500" />,
    desc: "Manage your services"
  },
  {
    name: "Contact Info",
    href: "/admin/contact",
    icon: <FaEnvelope className="text-2xl text-blue-500" />,
    desc: "Edit contact details"
  },
  {
    name: "Contacted Submissions",
    href: "/admin/contacted",
    icon: <FaInbox className="text-2xl text-blue-500" />,
    desc: "View contact form submissions"
  }
];

export default function AdminDashboardHome() {
  return (
    <AdminAuthGuard>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Admin Dashboard</h1>
        <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
          Welcome! Use the cards below to manage your portfolio sections.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700 hover:border-blue-500 w-full min-h-[180px]"
            >
              <div className="mb-3">{section.icon}</div>
              <div className="text-xl font-semibold mb-1 text-center">{section.name}</div>
              <div className="text-gray-500 dark:text-gray-400 text-center text-sm">{section.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </AdminAuthGuard>
  );
} 