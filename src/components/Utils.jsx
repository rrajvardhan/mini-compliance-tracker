export const STATUSES = ["All", "Pending", "In Progress", "Completed"]
export const CATEGORIES = ["All", "Legal", "Finance", "Compliance"]
export const PRIORITIES = ["Low", "Medium", "High"]

export function isOverdue(task) {
  if (task.status === "Completed") return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(task.due_date) < today
}
