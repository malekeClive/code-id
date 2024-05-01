import { uniqueId } from "@/lib/utils";
import service from "@/services/service";
import { CommentPost, Post } from "@/types/views";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCommentsById = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => service.getCommentsById(postId),
  });
};

const usePostsById = (userId: number) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => service.getPostsByUserId(userId),
  });
};

const useCreateCommentById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment }: { comment: CreateComment }) =>
      service.createCommentById(comment),
    onMutate: async ({ comment }: { comment: CreateComment }) => {
      await queryclient.cancelQueries({
        queryKey: ["comments", comment.postId],
      });

      // Snapshot the previous posts
      const previousComments = queryclient.getQueryData([
        "comments",
        comment.postId,
      ]) as Post[];

      const newComments = [...previousComments, { id: uniqueId(), ...comment }];

      // Optimistic update to the new comments
      queryclient.setQueryData(["comments", comment.postId], () => newComments);

      return { previousComments, newComments };
    },
    onError: (err, comment, context) => {
      queryclient.setQueryData(
        ["comments", comment.comment.postId],
        context?.previousComments
      );
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const post: Post = data;
      // queryclient.invalidateQueries({ queryKey: ["posts", post.userId] });
    },
    // onSuccess: (data: CommentPost) => {
    //   queryclient.invalidateQueries({ queryKey: ["comments", data.postId] });
    // },
  });
};

const useCreatePostById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ post }: { post: CreatePost }) =>
      service.createPostById(post),
    onMutate: async ({ post }: { post: CreatePost }) => {
      await queryclient.cancelQueries({ queryKey: ["posts", post.userId] });

      // Snapshot the previous posts
      const previousPosts = queryclient.getQueryData([
        "posts",
        post.userId,
      ]) as Post[];

      const newPost = [...previousPosts, { id: uniqueId(), ...post }];

      // Optimistic update to the new posts
      queryclient.setQueryData(["posts", post.userId], () => newPost.reverse());

      return { previousPosts, newPost };
    },
    onError: (err, post, context) => {
      queryclient.setQueryData(
        ["posts", post.post.userId],
        context?.previousPosts
      );
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const post: Post = data;
      // queryclient.invalidateQueries({ queryKey: ["posts", post.userId] });
    },
  });
};

const useUpdatePostById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ post }: { post: UpdatePost }) => service.editPostById(post),
    onMutate: async ({ post }: { post: UpdatePost }) => {
      await queryclient.cancelQueries({ queryKey: ["posts", post.userId] });

      // Snapshot the previous posts
      const previousPosts = queryclient.getQueryData([
        "posts",
        post.userId,
      ]) as Post[];

      const newPost = previousPosts.map((prevPost) =>
        prevPost.id === post.id
          ? { ...prevPost, title: post.title, body: post.body }
          : prevPost
      );

      // Optimistic update to the new posts
      queryclient.setQueryData(["posts", post.userId], () => newPost);

      return { previousPosts, newPost };
    },
    onError: (err, post, context) => {
      queryclient.setQueryData(
        ["posts", post.post.userId],
        context?.previousPosts
      );
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const post: Post = data;
      // queryclient.invalidateQueries({ queryKey: ["posts", post.userId] });
    },
  });
};

const useUpdateCommentById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment }: { comment: UpdateComment }) =>
      service.editCommentById(comment),
    onMutate: async ({ comment }: { comment: UpdateComment }) => {
      await queryclient.cancelQueries({
        queryKey: ["comments", comment.postId],
      });

      // Snapshot the previous comments
      const previousComments = queryclient.getQueryData([
        "comments",
        comment.postId,
      ]) as Post[];

      const newPost = previousComments.map((prevComment) =>
        prevComment.id === comment.id
          ? { ...prevComment, body: comment.body }
          : prevComment
      );

      // Optimistic update to the new comments
      queryclient.setQueryData(["comments", comment.postId], () => newPost);

      return { previousComments, newPost };
    },
    onError: (err, comment, context) => {
      queryclient.setQueryData(
        ["comments", comment.comment.postId],
        context?.previousComments
      );
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const comment: CommentPost = data;
      // queryclient.invalidateQueries({ queryKey: ["comments", comment.postId] });
    },
  });
};

const useDeletePostById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ id: id }: { id: number }) => service.deletePostById(id),
    onMutate: async ({ id, userId }: { id: number; userId: number }) => {
      await queryclient.cancelQueries({ queryKey: ["posts", userId] });

      // Snapshot the previous posts
      const previousPosts = queryclient.getQueryData([
        "posts",
        userId,
      ]) as Post[];

      const newPost = previousPosts.filter((prevPost) => prevPost.id !== id);

      // Optimistic update to the new posts
      queryclient.setQueryData(["posts", userId], () => newPost);

      return { previousPosts, newPost };
    },
    onError: (err, post, context) => {
      queryclient.setQueryData(["posts", post.userId], context?.previousPosts);
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const post: Post = data;
      // queryclient.invalidateQueries({ queryKey: ["posts", post.userId] });
    },
  });
};

const useDeleteCommentById = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ id: id }: { id: number }) => service.deleteCommentById(id),
    onMutate: async ({ id, postId }: { id: number; postId: number }) => {
      await queryclient.cancelQueries({ queryKey: ["comments", postId] });

      // Snapshot the previous comments
      const previousComments = queryclient.getQueryData([
        "comments",
        postId,
      ]) as Post[];

      const newPost = previousComments.filter(
        (prevComment) => prevComment.id !== id
      );

      // Optimistic update to the new comments
      queryclient.setQueryData(["comments", postId], () => newPost);

      return { previousComments, newPost };
    },
    onError: (err, comment, context) => {
      queryclient.setQueryData(
        ["comments", comment.postId],
        context?.previousComments
      );
    },
    onSettled: (data) => {
      // will comment this since it will refetch the data from the server
      // const comment: CommentPost = data;
      // queryclient.invalidateQueries({ queryKey: ["comments", comment.postId] });
    },
  });
};

export {
  usePostsById,
  useCommentsById,
  useCreatePostById,
  useCreateCommentById,
  useDeletePostById,
  useDeleteCommentById,
  useUpdatePostById,
  useUpdateCommentById,
};
