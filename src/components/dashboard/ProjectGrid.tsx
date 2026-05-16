"use client";

// ✅ Client component — "New project" button modal open kar sake

import { useState } from "react";
import CreateProjectModal from "../projects/CreateProjectModal";

interface ProjectCard {
  id: string;
  name: string;           // ✅ name (not title)
  description?: string;
  progress?: number;
  userRole?: "ADMIN" | "MEMBER";
}

interface ProjectGridProps {
  projects: ProjectCard[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Projects
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Recent workspaces
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition sm:w-auto"
          >
            + New project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-500">
            No projects yet. Create a project to see progress here.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/40 hover:bg-white/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {project.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {project.description || "No description added."}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${project.userRole === "ADMIN"
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "bg-white/10 text-slate-400"
                      }`}
                  >
                    {project.userRole ?? "MEMBER"}
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${project.progress ?? 0}%` }}
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}