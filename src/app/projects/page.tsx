// ✅ Server Component — data fetch karta hai
// Modal state → ProjectsClient (Client Component) mein hai

import AppShell from "../../components/layout/AppShell";
import ProjectsClient from "../../components/projects/ProjectsClient";
import { getUserFromRequest } from "../../middleware/auth";
import { getProjectsForUser } from "../../services/projectService";
import { redirect } from "next/navigation";

type ApiProject = {
    _id: string;
    name: string;
    description?: string;
    userRole?: "ADMIN" | "MEMBER";
};

export default async function ProjectsPage() {
    let projects: ApiProject[] = [];

    try {
        const user = await getUserFromRequest();
        if (!user) {
            redirect("/login");
        }

        const rawProjects = await getProjectsForUser(user._id.toString());
        projects = rawProjects.map(p => ({
            _id: p._id.toString(),
            name: p.name,
            description: p.description,
            userRole: p.userRole as "ADMIN" | "MEMBER"
        }));
    } catch (error) {
        console.error("Error fetching projects:", error);
        projects = [];
    }

    return (
        <AppShell
            title="Projects"
            subtitle="Track ownership, milestones, and delivery confidence."
        >

            <ProjectsClient projects={projects} />
        </AppShell>
    );
}