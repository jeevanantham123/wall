import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      author: { connect: { name: session?.user?.name } },
    },
  });
  res.json(result);
}
