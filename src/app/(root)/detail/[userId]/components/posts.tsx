"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Comments from "./comments";
import {
  useDeletePostById,
  usePostsById,
  useUpdatePostById,
} from "@/hooks/useQueryHooks";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdatePostForm } from "@/types/schema";

export default function Posts({ userId }: { userId: number }) {
  const [editDialog, setEditDialog] = React.useState<{
    isOpen: boolean;
    postId: number;
  }>({
    isOpen: false,
    postId: 0,
  });

  const [removeDialog, setRemoveDialog] = React.useState<{
    isOpen: boolean;
    postId: number;
  }>({ isOpen: false, postId: 0 });
  const { data: posts } = usePostsById(userId);

  const { mutate: updatePost } = useUpdatePostById();
  const { mutate: deletePost } = useDeletePostById();

  const form = useForm<z.infer<typeof UpdatePostForm>>({
    resolver: zodResolver(UpdatePostForm),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdatePostForm>) {
    const post: UpdatePost = {
      id: editDialog.postId,
      userId: userId,
      title: data.title,
      body: data.body,
    };

    updatePost({ post });
    setEditDialog({ isOpen: false, postId: 0 });
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader className="relative overflow-hidden flex flex-row justify-between">
              <CardTitle>{post.title}</CardTitle>
              <Popover>
                <PopoverTrigger asChild className="absolute top-2 right-4">
                  <Button variant="ghost">
                    <Menu size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="end">
                  <div className="flex flex-row gap-2">
                    <Button
                      size="icon"
                      onClick={() => {
                        form.setValue("title", post.title);
                        form.setValue("body", post.body);
                        setEditDialog({
                          isOpen: true,
                          postId: post.id,
                        });
                      }}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        setRemoveDialog({ isOpen: true, postId: post.id })
                      }
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
            <CardFooter>
              <Comments postId={post.id} />
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={editDialog.isOpen}
        onOpenChange={(e: boolean) => setEditDialog({ isOpen: e, postId: 0 })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>
              Make changes to your post here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={removeDialog.isOpen}
        onOpenChange={(e: boolean) => setRemoveDialog({ isOpen: e, postId: 0 })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deletePost({ id: removeDialog.postId, userId: userId })
              }
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
