import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];
const rooms = new Map<string, Set<User>>();

// Token verification function
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return null;
    if (!decoded || !(decoded as JwtPayload).userId) return null;
    return (decoded as JwtPayload).userId!;
  } catch (e) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const user: User = { ws, rooms: [], userId };
  users.push(user);

  ws.on("message", async function message(data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data.toString());
    } catch (err) {
      return;
    }

    const { type, roomId } = parsedData;

    if (type === "join-room") {
      if (!roomId) return;

      if (!user.rooms.includes(roomId)) {
        user.rooms.push(roomId);
      }

      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId)!.add(user);

    } else if (type === "leave-room") {
      if (!roomId) return;

      user.rooms = user.rooms.filter((r) => r !== roomId);
      rooms.get(roomId)?.delete(user);

      if (rooms.get(roomId)?.size === 0) {
        rooms.delete(roomId);
      }

    } else if (type === "draw") {
      if (!roomId || !rooms.has(roomId)) return;

      const recipients = rooms.get(roomId)!;
      const msg = JSON.stringify({
        type: "draw",
        roomId,
        shape: parsedData.shape,
        data: parsedData.data,
      });

      for (const u of recipients) {
        if (u.ws !== ws && u.ws.readyState === WebSocket.OPEN) {
          u.ws.send(msg);
        }
      }
    }
  });

  ws.on("close", () => {
    // Clean up user from all rooms
    for (const roomId of user.rooms) {
      const roomUsers = rooms.get(roomId);
      if (roomUsers) {
        roomUsers.delete(user);
        if (roomUsers.size === 0) {
          rooms.delete(roomId);
        }
      }
    }

    // Remove from user list
    const index = users.indexOf(user);
    if (index !== -1) users.splice(index, 1);
  });
});
