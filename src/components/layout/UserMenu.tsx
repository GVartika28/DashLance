"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function getInitials(name: string | null, email: string | null) {
    if (name?.trim()) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("");
    }

    if (email?.trim()) {
        return email.trim()[0]?.toUpperCase() ?? "U";
    }

    return "TF";
}

export default function UserMenu() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const name = session?.user?.name ?? null;
    const email = session?.user?.email ?? null;
    const displayName = name?.trim() || "User";
    const initials = getInitials(name, email);
    const isAuthenticated = status === "authenticated";

    if (!isAuthenticated) {
        return null;
    }

    return (
        <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm px-2 py-2 text-left shadow-sm transition hover:border-white/20 hover:bg-white/15">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
                    {initials}
                </div>
                <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                    <p className="truncate text-xs text-slate-400">{email ?? "No email available"}</p>
                </div>
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-md p-4 shadow-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
                <p className="mt-3 text-sm font-semibold text-white">{displayName}</p>
                <p className="mt-1 break-all text-sm text-slate-400">{email ?? "No email available"}</p>

                <button
                    type="button"
                    onClick={async () => {
                        await signOut({ redirect: false });
                        router.replace("/login");
                    }}
                    className="mt-4 w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                    Logout
                </button>
            </div>
        </details>
    );
}
