import Skeleton from "../../components/shared/Skeleton";

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a5f,#0f172a,#0d1117)] px-4 py-12">
            <div className="mx-auto w-full max-w-6xl space-y-6">
                <Skeleton className="h-28" />
                <div className="grid gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-32" />
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                    <Skeleton className="h-80" />
                    <Skeleton className="h-80" />
                </div>
            </div>
        </div>
    );
}
