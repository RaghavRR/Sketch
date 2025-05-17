import { ClipboardCopy, Trash2 } from "lucide-react";
import { useState } from "react";

interface Room {
  id: string;
  slug: string;
  status?: string;
}

interface RoomListProps {
  rooms: Room[];
  onDelete?: (id: string) => void;
}

export function RoomList({ rooms, onDelete }: RoomListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert("Failed to copy!");
    }
  };

  const getDisplayName = (room: Room) => {
  const trimmedSlug = room.slug?.trim();
  return !trimmedSlug || trimmedSlug.toLowerCase() === "unnamed room"
    ? `room-${String(room.id).slice(0, 6)}`
    : trimmedSlug;
};

  return (
    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-5 text-gray-900">Rooms</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-400 text-lg text-center py-20 italic select-none">
          No rooms yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gradient-to-tr from-white to-gray-50 border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 p-7 flex flex-col justify-between"
              role="region"
              aria-labelledby={`room-title-${room.id}`}
            >
              <h3
                id={`room-title-${room.id}`}
                className="text-2xl font-semibold mb-4 text-gray-900 truncate"
                title={room.slug}
              >
                {getDisplayName(room)}
              </h3>

              <div className="flex items-center gap-3 mb-5 text-gray-600 font-mono text-sm select-text">
                <span className="truncate">ID: {room.id}</span>
                <ClipboardCopy
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => handleCopy(room.id)}
                  title="Copy room ID"
                  role="button"
                  tabIndex={0}
                  aria-label={`Copy room ID ${room.id}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleCopy(room.id);
                  }}
                />
                {copiedId === room.id && (
                  <span className="text-green-600 text-xs ml-2 select-none font-medium">
                    Copied!
                  </span>
                )}
              </div>

              <p className="mb-6 text-sm font-semibold text-purple-700 tracking-wide">
                Status:{" "}
                <span className="capitalize text-gray-700">
                  {room.status || "active"}
                </span>
              </p>

              <button
                onClick={() => onDelete?.(room.id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-red-600 font-semibold rounded-xl hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
                aria-label={`Delete room ${room.slug}`}
                type="button"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
