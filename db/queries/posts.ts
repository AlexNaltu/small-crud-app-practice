import type { Post } from "@prisma/client";
import { db } from "..";
import { notFound } from "next/navigation";

export async function fetchPosts(): Promise<Post[]> {
  return await db.post.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function fetchPostsById(id: string): Promise<Post | null> {
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
