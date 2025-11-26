"use client";
import { useEffect, useRef } from "react";

interface Props {
  input: string;
  result: string;
}

export default function Display({ input, result }: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  // 👉 auto-scroll to the right when input grows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  return (
    <div className="bg-gray-700 rounded-xl p-3 mb-3 text-right">
      {/* Input line */}
      <div
        ref={inputRef}
        className="text-gray-300 text-xl overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {input || "0"}
      </div>

      {/* Result line */}
      <div className="text-white text-2xl font-bold">{result}</div>
    </div>
  );
}
