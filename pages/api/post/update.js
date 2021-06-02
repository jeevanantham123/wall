// import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

// POST /api/post/update
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, link, tagList, postId } = req.body.data;
  const result = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title: title,
      link: link,
      tags: tagList,
    },
  });
  res.json(result);
}
