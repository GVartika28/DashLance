import { getUserFromRequest } from "../../../middleware/auth";
import { getProjectById } from "../../../services/projectService";
import { getTasks } from "../../../services/taskService";
import { redirect } from "next/navigation";
import AppShell from "../../../components/layout/AppShell";
import ProjectWorkspace from "../../../components/projects/ProjectWorkspace";
import EmptyState from "../../../components/shared/EmptyState";

type ApiProject = {
  _id: string;
  name: string;
  description?: string;
  userRole?: "ADMIN" | "MEMBER" | null;
  currentUserId: string;
  members: Array<{
    memberId: string;
    role: "ADMIN" | "MEMBER";
    user: {
      _id: string;
      name: string;
      email: string;
      avatar?: string;
    };
  }>;
};

type ApiTask = {
  _id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
  assignedTo?: {
    _id?: string;
    name?: string;
    email?: string;
  } | null;
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: ApiProject | null = null;
  let tasks: ApiTask[] = [];

  try {
    const user = await getUserFromRequest();
    if (!user) {
      redirect("/login");
    }

    const rawProject = await getProjectById(id);
    if (rawProject) {
      const isMember = rawProject.members.some(m => (m.user as any)._id.toString() === user._id.toString());
      if (isMember) {
        project = {
          ...rawProject,
          _id: rawProject._id.toString(),
          currentUserId: user._id.toString(),
          userRole: rawProject.members.find(m => (m.user as any)._id.toString() === user._id.toString())?.role || null,
          members: rawProject.members.map(m => {
            const memberUser = m.user as any;
            return {
              memberId: m.memberId,
              role: m.role,
              user: {
                _id: memberUser._id.toString(),
                name: memberUser.name,
                email: memberUser.email,
                avatar: memberUser.avatar,
              }
            };
          })
        } as unknown as ApiProject;

        const rawTasks = await getTasks({ projectId: id });
        tasks = rawTasks.map(task => {
          const val = typeof task.toJSON === 'function' ? task.toJSON() : task;
          return {
            _id: val._id.toString(),
            title: val.title,
            description: val.description,
            status: val.status,
            priority: val.priority,
            dueDate: val.dueDate?.toString() || null,
            assignedTo: val.assignedTo ? {
              _id: (val.assignedTo as any)._id?.toString() || val.assignedTo.toString(),
              name: (val.assignedTo as any).name,
              email: (val.assignedTo as any).email
            } : null
          } as ApiTask;
        });
      }
    }
  } catch (error) {
    console.error("Project details error:", error);
    project = null;
    tasks = [];
  }

  if (!project) {
    return (
      <AppShell title="Project" subtitle="Project details">
        <EmptyState
          title="Project not found"
          description="We could not load this project. Check the URL or create a new project."
          actionLabel="Back to projects"
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      title={project.name}
      subtitle={project.description || "Manage members and tasks from one place."}
    >
      <ProjectWorkspace project={project} tasks={tasks} />
    </AppShell>
  );
}
