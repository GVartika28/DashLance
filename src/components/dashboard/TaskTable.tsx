interface TaskRow {
    id: string;
    title: string;
    project: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    due: string;
}

interface TaskTableProps {
    tasks: TaskRow[];
}

const statusStyles: Record<TaskRow["status"], string> = {
    TODO: "bg-amber-500/15 text-amber-300",
    IN_PROGRESS: "bg-blue-500/15 text-blue-300",
    DONE: "bg-emerald-500/15 text-emerald-300",
};

export default function TaskTable({ tasks }: TaskTableProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-sm sm:p-6 min-w-0" id="tasks">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned tasks</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">This week</h2>
                </div>
                <button className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition sm:w-auto">
                    View all
                </button>
            </div>
            {tasks.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-500">
                    No tasks assigned yet. Tasks will appear here once created.
                </div>
            ) : (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                    <table className="min-w-[520px] w-full text-left text-sm">
                        <thead className="bg-white/5 text-[11px] uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-3 py-2 sm:px-4 sm:py-3">Task</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3">Project</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3">Status</th>
                                <th className="hidden px-3 py-2 sm:table-cell sm:px-4 sm:py-3">Priority</th>
                                <th className="hidden px-3 py-2 sm:table-cell sm:px-4 sm:py-3">Due</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-white/5 transition">
                                    <td className="px-3 py-3 text-sm font-medium leading-snug text-white sm:px-4">
                                        {task.title}
                                    </td>
                                    <td className="px-3 py-3 text-xs text-slate-400 sm:px-4 sm:text-sm">
                                        {task.project}
                                    </td>
                                    <td className="px-3 py-3 sm:px-4">
                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${statusStyles[task.status]}`}>
                                            {task.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">{task.priority}</td>
                                    <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">{task.due}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
