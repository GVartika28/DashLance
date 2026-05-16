interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">{title}</p>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
            {actionLabel ? (
                <button
                    onClick={onAction}
                    className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                >
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}
