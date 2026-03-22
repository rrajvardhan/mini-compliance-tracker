"use client"

export default function TaskPanel({ clientId }) {
  if (!clientId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[11px] font-mono text-[#444] tracking-widest uppercase">
          Select a client
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8">
      <span className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#7ec8a4]">
        Tasks
      </span>
      <p className="mt-2 text-[12px] font-mono text-[#666]">
        Client ID: <span className="text-[#e8e8e8]">{clientId}</span>
      </p>
    </div>
  )
}
