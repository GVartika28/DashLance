interface StatCardProps {
    label: string;
    value: string;
    delta: string;
    tone?: "amber" | "blue" | "emerald";
}

const toneMap = {
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

export default function StatCard({ label, value, delta, tone = "amber" }: StatCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-sm sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
            <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-semibold text-white sm:text-3xl">{value}</p>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}>
                    {delta}
                </span>
            </div>
        </div>
    );
}
