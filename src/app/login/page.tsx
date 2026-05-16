"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/dashboard",
        });

        if (result?.error) {
            setError(result.error === "CredentialsSignin"
                ? "Invalid email or password"
                : result.error);
        } else if (result?.ok) {
            window.location.href = "/dashboard";
        } else {
            setError("Sign in failed. Please try again.");
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a5f,#0f172a,#0d1117)] px-4 py-12">
            <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dashlance</p>
                    <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to continue managing your projects and tasks.
                    </p>
                    <div className="mt-8 space-y-4 text-sm text-slate-400">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="font-semibold text-white">Tip</p>
                            <p className="mt-1 text-xs">Use the demo admin credentials from your seed data.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="font-semibold text-white">Need access?</p>
                            <p className="mt-1 text-xs">Invite your team to a project workspace in minutes.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-sm p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Login</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Use your email and password to access the dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block text-sm font-medium text-slate-300">
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                                placeholder="name@company.com"
                                required
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-300">
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                                placeholder="Your password"
                                required
                            />
                        </label>

                        {error ? (
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                        <div className="text-center text-xs text-slate-500">
                            New here?{" "}
                            <a className="font-semibold text-white" href="/signup">
                                Create an account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
