// import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

// GET /api/post/.getPost
export default async function handle(req, res) {
  const result = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      link: true,
      tags: true,
      author: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(result);
}
