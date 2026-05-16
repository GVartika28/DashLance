import Link from "next/link";
import UserMenu from "./UserMenu";

export default function TopBar() {
    return (
        <div className="sticky top-0 z-20 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        D
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dashlance</p>
                        <p className="text-sm font-semibold text-white">Workspace</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 md:hidden">
                        <Link className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300" href="/projects">
                            Projects
                        </Link>
                        <Link className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700" href="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                    <UserMenu />
                </div>
            </div>
        </div>
    );
}
