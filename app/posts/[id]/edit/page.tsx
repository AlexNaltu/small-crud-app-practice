import { updatePost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import { fetchPostsById } from "@/db/queries/posts";

interface PostsEditProps {
  params: {
    id: string;
  };
}

// Defining a new page, server component PostsEdit
export default async function PostsEdit({ params }: PostsEditProps) {
  // Receives params as a prop, which includes the id of the post to be edited.
  const { id } = params;

  // Fetches the post from the database
  const post = await fetchPostsById(id);

  // binds the id to the updatePost action to create an updateAction,
  const updateAction = updatePost.bind(null, id);
  /// renders a PostForm component, passing the updateAction as the form as the initial data
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostForm
          formAction={updateAction}
          initialData={{
            title: post?.title ?? "",
            content: post?.content ?? "",
          }}
        />
      </div>
    </main>
  );
}
