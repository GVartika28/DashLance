import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import connectToDatabase from "../lib/mongodb";
import authOptions from "../lib/authOption";
import User, { IUser } from "../models/User";

export async function getUserFromRequest(_req?: Request): Promise<IUser | null> {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Error in getServerSession:", error);
    return null;
  }
  const sessionUser = session?.user;
  if (!sessionUser?.id && !sessionUser?.email) return null;

  await connectToDatabase();
  const user = sessionUser.id
    ? await User.findById(sessionUser.id).select("-password")
    : await User.findOne({ email: sessionUser.email }).select("-password");
  return user as IUser | null;
}

export async function requireUser(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}
