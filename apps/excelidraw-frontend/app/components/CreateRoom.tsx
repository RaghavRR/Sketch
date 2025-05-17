// components/CreateRoom.tsx
"use client";

import { useState } from "react";

interface CreateRoomProps {
  onRoomCreated: (room: { name: string; id: string }) => void;
}

export function CreateRoom({ onRoomCreated }: CreateRoomProps) {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!roomName.trim()) {
      alert("Room name cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please sign in again.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name: roomName }),
      });

      const data = await response.json();

      if (response.ok) {
        onRoomCreated({ name: roomName, id: data.roomId });
        setRoomName("");
      } else {
        alert(data.message || "Failed to create room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md lg:max-w-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Room</h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-xl px-5 py-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          disabled={loading}
          aria-label="Room name"
        />

        <button
          className={`px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={handleCreate}
          disabled={loading}
          aria-live="polite"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>
    </section>
  );
}
