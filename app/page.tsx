"use client";

import { useEffect } from "react";
import { useApp } from "@/context";

export default function Home() {
  const { state, setMessage } = useApp();

  useEffect(() => {
    console.log("[Home] app state:", state);
  }, [state]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          React Context API Starter
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          This is a minimal template wired with a global context store.
          Start dropping in your pages and components without re‑doing the setup.
        </p>

        <div className="mb-4 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="mb-1 font-medium text-slate-800">
            Current context state
          </div>
          <pre className="overflow-x-auto rounded bg-white p-3 text-xs text-slate-700">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>

        <button
          type="button"
          onClick={() => setMessage("Hello from Context Template!")}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          Update message in context
        </button>
      </div>
    </main>
  );
}
