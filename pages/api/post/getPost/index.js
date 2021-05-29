// import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

// GET /api/post/.getPost

export default async function handle(req, res) {
  const result = await prisma.post.findMany();
  res.json(result);
}
