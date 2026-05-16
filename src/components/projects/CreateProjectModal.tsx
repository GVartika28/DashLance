"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setName("");
      setDescription("");
      onClose();

      if (data.project?._id) {
        router.push(`/projects/${data.project._id}`);
      }
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-md p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Create project</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Project name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g., Q2 Roadmap"
              disabled={loading}
              autoFocus
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Description <span className="text-xs text-slate-500">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this project about?"
              disabled={loading}
              rows={3}
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none disabled:opacity-60"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          ) : null}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
