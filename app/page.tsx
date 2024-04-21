import PostDelete from "@/components/post-delete";
import { fetchPosts } from "@/db/queries/posts";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <div>
        <Link href={"/posts/create"}>Create Post</Link>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Link key={post.id} href={`/posts/${post.id}/edit`}>
                <h1>{post.title}</h1>
              </Link>
              <>{post.content}</>
              <PostDelete id={post.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
