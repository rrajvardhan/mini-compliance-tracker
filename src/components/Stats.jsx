import { isOverdue } from "./Utils"

export default function Stats({ tasks }) {
  const total = tasks.length
  const pending = tasks.filter((t) => t.status === "Pending").length
  const overdue = tasks.filter(isOverdue).length

  return (
    <div className="border-[#2a2a2a] flex items-center gap-6">
      <div>
        <div className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#666]">
          Total
        </div>
        <div className="text-[1.2rem] font-extrabold font-mono text-[#e8e8e8] leading-none mt-0.5">
          {total}
        </div>
      </div>
      <div>
        <div className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#666]">
          Pending
        </div>
        <div className="text-[1.2rem] font-extrabold font-mono text-[#e8e8e8] leading-none mt-0.5">
          {pending}
        </div>
      </div>
      <div>
        <div className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#666]">
          Overdue
        </div>
        <div
          className={[
            "text-[1.2rem] font-extrabold font-mono leading-none mt-0.5",
            overdue > 0 ? "text-[#d4806a]" : "text-[#e8e8e8]",
          ].join(" ")}
        >
          {overdue}
        </div>
      </div>
    </div>
  )
}
