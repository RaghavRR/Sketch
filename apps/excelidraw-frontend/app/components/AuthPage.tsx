"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const endpoint = isSignin
      ? "http://localhost:3001/signin"
      : "http://localhost:3001/signup";

    const payload = isSignin
      ? { username: form.username, password: form.password }
      : { name: form.name, username: form.username, password: form.password };

    try {

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();

        if (isSignin) {
          localStorage.setItem("token", data.token); // ✅ Save token only on signin
          localStorage.setItem("name", data.name);
          router.push("/dashboard"); // ✅ Go to dashboard
        } else {
          // After signup, redirect to signin page
          router.push("/signin");
        }
      }
      else { 
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 m-2 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignin ? "Sign in" : "Sign up"}
        </h2>

        {!isSignin && (
          <div className="p-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}

        <div className="p-2">
          <input
            type="username"
            placeholder="Email (used as username)"
            className="border p-2 w-full rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="p-2">
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm px-2 py-1">{error}</div>
        )}

        <div className="pt-4 text-center">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
            onClick={handleSubmit}
          >
            {isSignin ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
