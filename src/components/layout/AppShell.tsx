import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface AppShellProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function AppShell({ title, subtitle, children }: AppShellProps) {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#1e3a5f,#0f172a,#0d1117)]">
            <div className="pointer-events-none absolute -left-32 top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <TopBar />
            <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 pt-6 md:grid-cols-[240px_1fr]">
                <Sidebar />
                <main className="space-y-8 min-w-0">
                    <header className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-sm sm:p-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Workspace</p>
                        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
                        {subtitle ? (
                            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
                        ) : null}
                    </header>
                    {children}
                </main>
            </div>
        </div>
    );
}
