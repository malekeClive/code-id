import { z } from "zod";

const CreatePostForm = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

const UpdatePostForm = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

const CreateCommentForm = z.object({
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

const UpdateCommentForm = z.object({
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

export { CreatePostForm, UpdatePostForm, CreateCommentForm, UpdateCommentForm };
