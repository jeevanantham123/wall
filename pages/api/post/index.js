import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, link, tagList } = req.body.data;
  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      link: link,
      tags: tagList,
      author: { connect: { name: session?.user?.name } },
    },
  });
  res.json(result);
}
