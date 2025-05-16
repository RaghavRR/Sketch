"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const endpoint = isSignin ? "/api/signin" : "/api/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded shadow">
        {!isSignin && (
          <div className="p-2">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}
        <div className="p-2">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="p-2">
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="pt-2">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isSignin ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
