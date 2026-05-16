import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserFromRequest } from "../../../middleware/auth";
import {
  createProject,
  getProjectsForUser,
} from "../../../services/projectService";

const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters")
      .optional(),
    title: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters")
      .optional(),
    description: z.string().optional(),
  })
  .transform((data) => ({
    name: data.name ?? data.title ?? "",
    description: data.description,
  }))
  .refine((data) => data.name.length >= 2, {
    message: "Project name must be at least 2 characters",
    path: ["name"],
  });

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await getProjectsForUser(user._id.toString());
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = createProjectSchema.parse(body);

    const project = await createProject({
      name: parsed.name,
      description: parsed.description,
      createdBy: user._id.toString(),
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bad Request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
