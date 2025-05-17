// page.tsx (Dashboard)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "../components/Header";
import { CreateRoom } from "../components/CreateRoom";
import { RoomList } from "../components/RoomList";
import { Footer } from "../components/Footer";

interface Room {
  id: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("User");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [joinRoomId, setJoinRoomId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/signin");
      return;
    }

    if (storedName) setName(storedName);

    fetchRooms(storedToken);
  }, [router]);

  const fetchRooms = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3001/my-rooms", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await response.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoomCreated = (room: Room) => {
    setRooms((prevRooms) => [...prevRooms, room]);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/signin");
  };

  const handleJoinRoomById = () => {
    if (joinRoomId.trim()) {
      router.push(`/canvas/${joinRoomId.trim()}`);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete a room.");
      router.push("/signin");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/room/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to delete room");
        return;
      }

      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (error) {
      alert("Error deleting room");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 flex flex-col">
      {/* Header */}
      <Header name={name} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Side-by-side container */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            {/* Create Room */}
            <CreateRoom onRoomCreated={handleRoomCreated} />

            {/* Join Room */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md lg:max-w-xl">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Join Room by ID
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="flex-grow border border-gray-300 rounded-xl px-5 py-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                  aria-label="Enter room ID to join"
                />
                <button
                  onClick={handleJoinRoomById}
                  className="px-6 py-3 rounded-xl text-white font-semibold transition bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
                  aria-label="Join room by ID"
                >
                  Join Room
                </button>
              </div>
            </section>
          </div>

          {/* Room List */}
          <RoomList rooms={rooms} onDelete={handleDeleteRoom} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
