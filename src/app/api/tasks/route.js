import client from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("clientId")

  if (!clientId) {
    return Response.json({ error: "clientId is required" }, { status: 400 })
  }

  await client.connect()
  try {
    const db = client.db("compliance_tracker")
    const tasks = await db
      .collection("tasks")
      .find({ client_id: Number(clientId) })
      .toArray()
    return Response.json(tasks)
  } catch (err) {
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request) {
  const body = await request.json()

  await client.connect()
  try {
    const db = client.db("compliance_tracker")
    const result = await db.collection("tasks").insertOne({
      ...body,
      client_id: Number(body.client_id),
      created_at: new Date(),
    })
    return Response.json({ insertedId: result.insertedId }, { status: 201 })
  } catch (err) {
    return Response.json({ error: "Failed to create task" }, { status: 500 })
  }
}

export async function PATCH(request) {
  const body = await request.json()
  const { id, ...update } = body

  await client.connect()
  try {
    const db = client.db("compliance_tracker")
    await db
      .collection("tasks")
      .updateOne({ _id: new ObjectId(id) }, { $set: update })
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: "Failed to update task" }, { status: 500 })
  }
}
