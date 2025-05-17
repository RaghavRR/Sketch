import { ReactNode } from "react";

export function IconButton({
  icon,
  onClick,
  activated,
  title,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center rounded-xl border
        transition-all duration-300 ease-in-out backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-400
        w-11 h-11 sm:w-12 sm:h-12
        ${
          activated
            ? "bg-gradient-to-tr from-red-500 to-red-400 text-white border-red-400 shadow-lg scale-[1.08]"
            : "bg-gray-800 text-gray-300 border-gray-700 hover:scale-105 hover:shadow-md hover:text-white hover:border-gray-500"
        }
      `}
      style={{
        boxShadow: activated
          ? "0 4px 14px rgba(255, 100, 100, 0.4)"
          : "0 2px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <span className="text-lg sm:text-xl">{icon}</span>
    </button>
  );
}
