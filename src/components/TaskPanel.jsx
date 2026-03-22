"use client"

import { useState, useEffect } from "react"
import TaskRow from "./TaskRow"

export default function TaskPanel({ clientId }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

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

  async function handleStatusChange(id, next) {
    try {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      })
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: next } : t)),
      )
    } catch (err) {
      console.error("Failed to update task:", err)
    }
  }

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
      <div className="mb-6">
        <span className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-[#7ec8a4]">
          Tasks
        </span>
        <h2 className="text-[2rem] font-extrabold font-mono text-[#e8e8e8] tracking-tight leading-none mt-1">
          Task Board
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="py-12 text-center text-[11px] font-mono text-[#444]">
            Loading…
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-12 text-center text-[11px] font-mono text-[#444] tracking-widest uppercase">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
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
