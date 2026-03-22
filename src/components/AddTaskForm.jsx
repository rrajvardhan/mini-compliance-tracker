"use client"

import { useState } from "react"
import { CATEGORIES, PRIORITIES } from "./Utils"

const inputCls =
  "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#d4d4d4] font-mono text-[11px] px-3 py-2 rounded-sm outline-none focus:border-[#444] transition-colors placeholder-[#444]"

export default function AddTaskForm({ clientId, onAdd, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Finance",
    due_date: "",
    priority: "Medium",
  })
  const [toast, setToast] = useState("")

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSubmit() {
    if (!form.title.trim() || !form.due_date) {
      setToast("Title and due date are required")
      setTimeout(() => setToast(""), 2500)
      return
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          client_id: clientId,
          status: "Pending",
        }),
      })
      const { insertedId } = await res.json()
      onAdd({
        _id: insertedId,
        client_id: clientId,
        status: "Pending",
        ...form,
      })
    } catch (err) {
      setToast("Failed to add task")
      setTimeout(() => setToast(""), 2500)
    }
  }

  return (
    <div className="border border-[#2a2a2a] rounded-sm p-4 flex flex-col gap-3 mb-6">
      {toast && (
        <div className="fixed top-6 right-6 text-[15px] px-4 py-2 bg-[#d4806a]/10 border border-[#d4806a]/40 text-[#d4806a] rounded-sm">
          {toast}
        </div>
      )}
      <span className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#7ec8a4]">
        New Task
      </span>
      <input
        className={inputCls}
        placeholder="Title"
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
      />
      <textarea
        className={inputCls + " resize-none"}
        placeholder="Description (optional)"
        rows={2}
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
      />
      <div className="grid grid-cols-3 gap-2">
        <select
          className={inputCls + " cursor-pointer"}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
        >
          {CATEGORIES.filter((c) => c !== "All").map((c) => (
            <option key={c} style={{ background: "#1a1a1a", color: "#d4d4d4" }}>
              {c}
            </option>
          ))}
        </select>
        <select
          className={inputCls + " cursor-pointer"}
          value={form.priority}
          onChange={(e) => set("priority", e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} style={{ background: "#1a1a1a", color: "#d4d4d4" }}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="date"
          className={inputCls}
          value={form.due_date}
          onChange={(e) => set("due_date", e.target.value)}
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          className="flex-1 text-[10px] font-bold font-mono tracking-[0.15em] uppercase py-2 bg-[#7ec8a4]/10 border border-[#7ec8a4]/40 text-[#7ec8a4] rounded-sm hover:bg-[#7ec8a4]/20 transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={onCancel}
          className="px-4 text-[10px] font-bold font-mono tracking-[0.15em] uppercase py-2 border border-[#2a2a2a] text-[#666] rounded-sm hover:text-[#d4d4d4] hover:border-[#444] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
