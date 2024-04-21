import { createPost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import React from "react";

const PostsCreate = () => {
  return (
    <div className="flex min-h-screen flex-col items-start p-24">
      <main className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostForm
          initialData={{ title: "", content: "" }}
          formAction={createPost}
        />
      </main>
    </div>
  );
};

export default PostsCreate;
