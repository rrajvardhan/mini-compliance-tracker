"use client"

import { useState } from "react"
import SideBar from "@/components/SideBar"
import TaskPanel from "@/components/TaskPanel"

export default function Page() {
  const [selectedClient, setSelectedClient] = useState(null)

  return (
    <div className="flex min-h-screen">
      <SideBar selectedId={selectedClient} onSelect={setSelectedClient} />
      <TaskPanel clientId={selectedClient} />
    </div>
  )
}
