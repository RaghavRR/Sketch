import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  Circle,
  Pencil,
  RectangleHorizontalIcon,
  ArrowRight,
  TextCursorInput,
  Slash,
  Eraser,
} from "lucide-react";
import { Game } from "@/Draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "line" | "arrow" | "text" | "eraser";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const [, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setTool(selectedTool);
    }
  }, [selectedTool]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const g = new Game(canvasRef.current, roomId, socket);
    gameRef.current = g;
    g.setTool(selectedTool);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "draw" && message.roomId === roomId) {
        g.drawFromServer(message.shape, message.data);
      }
    };

    return () => {
      g.destroy();
      socket.onmessage = null;
      gameRef.current = null;
    };
  }, [roomId, socket]);

  useEffect(() => {
    function handleResize() {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
      if (canvasRef.current && gameRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        gameRef.current.clearCanvas();
        gameRef.current.redrawAll();
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen bg-zinc-900 overflow-hidden relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="block border border-zinc-700 bg-zinc-900"
      />
      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  const buttons: { tool: Tool; icon: JSX.Element; label: string }[] = [
    { tool: "pencil", icon: <Pencil size={18} />, label: "Pencil" },
    { tool: "line", icon: <Slash size={18} />, label: "Line" },
    { tool: "arrow", icon: <ArrowRight size={18} />, label: "Arrow" },
    { tool: "rect", icon: <RectangleHorizontalIcon size={18} />, label: "Rectangle" },
    { tool: "circle", icon: <Circle size={18} />, label: "Circle" },
    { tool: "text", icon: <TextCursorInput size={18} />, label: "Text" },
    { tool: "eraser", icon: <Eraser size={18} />, label: "Eraser" }
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-3 bg-zinc-800/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-zinc-700">
        {buttons.map(({ tool, icon, label }) => (
          <IconButton
            key={tool}
            onClick={() => setSelectedTool(tool)}
            activated={selectedTool === tool}
            icon={icon}
            title={label}
          />
        ))}
      </div>
    </div>
  );
}
