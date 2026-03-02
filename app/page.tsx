"use client";

import { useEffect } from "react";
import { useApp } from "@/context";

export default function Home() {
  const { state, setMessage } = useApp();

  useEffect(() => {
    console.log("[Home] app state:", state);
  }, [state]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center gap-4 p-6">
      <div className="rounded-box bg-zinc-900 p-4">
        <p className="mb-2 text-sm font-medium text-zinc-400">
          Current context message:
        </p>
        <p className="mb-4 text-lg font-semibold text-white">
          {state.message}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setMessage("Hello from the Home page!")}
          >
            Set Home message
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setMessage("Global context ready for your project")}
          >
            Reset message
          </button>
        </div>
      </div>
    </main>
  );
}
