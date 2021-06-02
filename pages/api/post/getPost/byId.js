import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

// GET /api/post/.getPost
export default async function handle(req, res) {
  const session = await getSession({ req });
  const user = await prisma.session.findMany({
    where: {
      accessToken: session.accessToken,
    },
    select: {
      userId: true,
    },
  });
  const result = await prisma.post.findMany({
    where: {
      authorId: user[0].userId,
    },
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
