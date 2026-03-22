import client from "@/lib/mongodb"

export async function GET() {
  try {
    await client.connect()

    const db = client.db("compliance_tracker")
    const clients = await db.collection("clients").find({}).toArray()
    return Response.json(clients)
  } catch (err) {
    return Response.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}
