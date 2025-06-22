"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin-auth', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials');
        setLoading(false);
      }
    }, 800); // Simulate network delay
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-block bg-blue-600 text-white rounded-full p-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.5 4.5 0 008 6.75v3.75m8.25 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 00-4.5 0m0 0V6.75m0 3.75a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 00-4.5 0m0 0V6.75m0 3.75V6.75" />
            </svg>
          </span>
          <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-300">Admin Login</h2>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.13.995-.36 1.41m-1.41 1.41A3 3 0 019 12c0-.512.13-.995.36-1.41" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 01-3 3m0 0a3 3 0 01-3-3m6 0a3 3 0 01-3-3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 01-3 3m0 0a3 3 0 01-3-3m6 0a3 3 0 01-3-3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.687 1.654-1.212 2.36" />
              </svg>
            )}
          </button>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          <span>Tip: Use <b>admin</b> / <b>admin123</b> to log in.</span>
        </div>
      </form>
    </div>
  );
} 