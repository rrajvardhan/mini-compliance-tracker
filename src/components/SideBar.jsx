"use client"

import { useEffect, useState } from "react"

export default function SideBar({ selectedId, onSelect }) {
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then(setClients)
  }, [])

  return (
    <aside className="w-55 shrink-0 flex flex-col h-screen sticky top-0 bg-[#141414] border-r border-[#2a2a2a] overflow-hidden">
      <div className="px-6 pt-6 pb-3">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#7ec8a4] font-mono">
          Clients
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {clients.map((c) => {
          const isSelected = selectedId === c.id
          return (
            <div
              key={c.id}
              onClick={() => onSelect(isSelected ? null : c.id)}
              className={[
                "px-6 py-3 border-t border-[#2a2a2a] cursor-pointer transition-colors duration-150",
                isSelected ? "bg-[#7ec8a4]/5" : "hover:bg-[#1a1a1a]",
              ].join(" ")}
            >
              <div
                className={[
                  "text-[11px] font-bold font-mono tracking-tight transition-colors duration-150",
                  isSelected ? "text-[#7ec8a4]" : "text-[#e8e8e8]",
                ].join(" ")}
              >
                {c.company_name}
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[9px] font-mono text-[#666] tracking-[0.05em]">
                  {c.country}
                </span>
                <span className="text-[9px] font-mono text-[#666]">
                  [{c.entity_type}]
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
