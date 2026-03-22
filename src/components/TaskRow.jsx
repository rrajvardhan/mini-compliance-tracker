import { isOverdue, STATUSES } from "./Utils"

export default function TaskRow({ task, onStatusChange }) {
  const overdue = isOverdue(task)

  return (
    <div
      className={[
        "py-4 border-t transition-colors duration-150",
        overdue ? "border-[#d4806a]/20 bg-[#d4806a]/3" : "border-[#2a2a2a]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {overdue && (
            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#d4806a]" />
          )}
          <span
            className={[
              "text-[12px] font-bold font-mono leading-tight",
              task.status === "Completed"
                ? "text-[#666] line-through"
                : "text-[#e8e8e8]",
            ].join(" ")}
          >
            {task.title}
          </span>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm outline-none hover:border-[#444] transition-colors cursor-pointer"
        >
          {STATUSES.filter((s) => s !== "All").map((s) => (
            <option
              key={s}
              value={s}
              style={{ background: "#1a1a1a", color: "#d4d4d4" }}
            >
              {s}
            </option>
          ))}
        </select>
      </div>

      {task.description && (
        <p className="text-[10px] font-mono text-[#666] mt-1 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-3 mt-2">
        <span className="text-[9px] font-mono text-[#666]">
          {task.priority}
        </span>
        <span className="text-[9px] font-mono text-[#666]">
          {task.category}
        </span>
        <span
          className={[
            "text-[9px] font-mono tracking-[0.05em] ml-auto",
            overdue ? "text-[#d4806a]" : "text-[#666]",
          ].join(" ")}
        >
          {overdue ? "⚠ " : ""}
          {task.due_date}
        </span>
      </div>
    </div>
  )
}
