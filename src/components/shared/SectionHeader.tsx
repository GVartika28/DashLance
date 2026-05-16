interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function SectionHeader({
    title,
    subtitle,
    actionLabel,
    onAction,
}: SectionHeaderProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
                {subtitle ? (
                    <h2 className="mt-2 text-xl font-semibold text-white">{subtitle}</h2>
                ) : null}
            </div>
            {actionLabel ? (
                <button
                    onClick={onAction}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}
