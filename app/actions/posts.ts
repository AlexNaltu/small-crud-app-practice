"use server";

import { db } from "@/db";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { string, z } from "zod";

//create a schema for the post
const postSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10).max(1000),
});

//create an interface for the PostFormState
interface PostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

//create an asyncronous function that creates a post
export async function createPost(
  //the function accepts a form state and form data
  formState: PostFormState,
  formData: FormData
  //this promise receives the PostFormState interface
): Promise<PostFormState> {
  //parse the form data using the postSchema
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  //if the result is not successful, return an error
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  //create a variable post with the Post types
  let post: Post;
  //try to create the post
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
      },
    });
    //if the post is not created, return an error
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        //return an error with the error message
        errors: {
          _form: [error.message],
        },
      };
      //if the error is not an error, return an error
    } else {
      return {
        errors: {
          _form: ["Something went wrong."],
        },
      };
    }
  }

  //if the post is created, revalidate the posts page
  revalidatePath("/");
  redirect("/");
}

//create an asyncronous function that updates a post
export async function updatePost(
  //the function accepts an id, form state and form data
  id: string,
  formState: PostFormState,
  formData: FormData
  //this promise receives the PostFormState interface
): Promise<PostFormState> {
  //parse the form data using the postSchema
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  //if the result is not successful, return an error
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  //create a variable post with the Post types
  let post: Post;
  try {
    //try to update the post
    post = await db.post.update({
      where: { id },
      data: {
        title: result.data.title,
        content: result.data.content,
      },
    });
    //if the post is not created, return an error
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
      //if the error is not an error, return an error
    } else {
      return {
        errors: {
          _form: ["Something went wrong."],
        },
      };
    }
  }
  //if the post is created, revalidate the posts page
  revalidatePath("/");
  redirect("/");
}

//create an asyncronous function that deletes a post
export async function deletePost(id: string): Promise<PostFormState> {
  //create a variable post with the Post types
  let post: Post;

  //try to delete the post
  try {
    post = await db.post.delete({
      where: { id },
    });
    //if the post is not created, return an error
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
      //if the error is not an error, return an error
    } else {
      return {
        errors: {
          _form: ["Something went wrong."],
        },
      };
    }
  }

  //if the post is created, revalidate the posts page
  revalidatePath("/");
  redirect("/");
}
