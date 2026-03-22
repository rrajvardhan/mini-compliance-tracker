import client from "@/lib/mongodb"

export async function GET() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    )
  } finally {
    await client.close()
  }

  return Response.json({ connected: true })
}
