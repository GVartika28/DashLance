"use client";

import { useState } from "react";
import CreateProjectModal from "../projects/CreateProjectModal";

type ApiProject = {
  _id: string;
  name: string;
  description?: string;
  userRole?: "ADMIN" | "MEMBER";
};

type ProjectsClientProps = {
  projects: ApiProject[];
};

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Portfolio
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Active projects
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
          >
            + New project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              No projects yet
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Create your first project to start tracking tasks and milestones.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              Create project
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project._id}
                href={`/projects/${project._id}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/40 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.userRole === "ADMIN"
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {project.userRole ?? "MEMBER"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {project.description || "No description added yet."}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Click to view tasks</span>
                  <span className="font-semibold text-blue-400">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}