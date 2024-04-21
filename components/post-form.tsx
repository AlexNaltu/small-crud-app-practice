"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

//props for FormErrors
interface FormErrors {
  title?: string[];
  content?: string[];
}

//props for FormState
interface FormState {
  errors: FormErrors;
}

//props interface for PostForm
interface PostFormProps {
  formAction: any;
  initialData: {
    title: string;
    content: string;
  };
}

export default function PostForm({ formAction, initialData }: PostFormProps) {
  // create a function that returns an object with the form state and a function to update the form state
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  return (
    <>
      <h1>{initialData.title ? " 'Update" : "Create"} Post</h1>
      <form action={action} className="text-black bg-red-200">
        <div className="w-96">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input type="text" name="title" id="title" />
            {formState.errors.title && (
              <div className="text-red-500">
                {formState.errors.title?.join(", ")}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={initialData.content}
              className="rounded p-2 w-full"
            ></textarea>
            {formState.errors.content && (
              <div className="text-red-500">
                {formState.errors.content?.join(", ")}
              </div>
            )}
          </div>
          <button type="submit" className="mx-4">
            {" "}
            Save
          </button>
          <Link href={"/"}>Cancel</Link>
        </div>
      </form>
    </>
  );
}
