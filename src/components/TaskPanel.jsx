"use client"

import { useState, useEffect } from "react"
import TaskRow from "./TaskRow"
import FilterBar from "./FilterBar"
import AddTaskForm from "./AddTaskForm"
import { STATUSES, CATEGORIES } from "./Utils"

export default function TaskPanel({ clientId }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatus] = useState("All")
  const [categoryFilter, setCategory] = useState("All")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!clientId) return
    setLoading(true)
    async function load() {
      try {
        const res = await fetch(`/api/tasks?clientId=${clientId}`)
        const data = await res.json()
        setTasks(data)
      } catch (err) {
        console.error("Failed to fetch tasks:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [clientId])

  async function handleStatusChange(id, status) {
    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error("Update failed")
      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)))
    } catch (err) {
      console.error("Failed to update task:", err)
    }
  }

  function handleAdd(task) {
    setTasks((prev) => [...prev, task])
    setShowForm(false)
  }

  const visible = tasks.filter((t) => {
    if (statusFilter !== "All" && t.status !== statusFilter) return false
    if (categoryFilter !== "All" && t.category !== categoryFilter) return false
    return true
  })

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
    <div className="flex-1 flex flex-col min-h-0 p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#7ec8a4]">
            Tasks
          </span>
          <h2 className="text-[2rem] font-extrabold font-mono text-[#e8e8e8] tracking-tight leading-none mt-1">
            Task Board
          </h2>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[9px] font-bold font-mono tracking-[0.15em] uppercase px-3 py-2 border border-[#2a2a2a] text-[#666] rounded-sm hover:border-[#7ec8a4]/50 hover:text-[#7ec8a4] transition-colors"
        >
          {showForm ? "✕ Cancel" : "+ New Task"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <AddTaskForm
          clientId={clientId}
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col gap-2.5 pb-4 border-b border-[#2a2a2a]">
        <FilterBar
          label="Status"
          options={STATUSES}
          value={statusFilter}
          onChange={setStatus}
        />
        <FilterBar
          label="Category"
          options={CATEGORIES}
          value={categoryFilter}
          onChange={setCategory}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="py-12 text-center text-[11px] font-mono text-[#444]">
            Loading…
          </div>
        ) : visible.length === 0 ? (
          <div className="py-12 text-center text-[11px] font-mono text-[#444] tracking-widest uppercase">
            No tasks
          </div>
        ) : (
          visible.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}
