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
      image: true,
      image: {
        select: {
          id: true,
          version: true,
          publicId: true,
          format: true,
        },
      },
    },
  });
  console.log("***", result);
  res.json(result);
}
