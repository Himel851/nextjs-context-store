"use client";

import { useEffect } from "react";
import { useApp } from "@/context";

export default function Home() {
  const { state, setMessage } = useApp();

  useEffect(() => {
    console.log("[Home] app state:", state);
  }, [state]);

  return (
    <div>
      <button className="bg-primary text-white">
        Primary Button
      </button>

      <button className="bg-secondary text-white">
        Secondary Button
      </button>
    </div>
  );
}
