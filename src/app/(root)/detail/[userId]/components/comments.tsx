"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  useCommentsById,
  useDeleteCommentById,
  useUpdateCommentById,
} from "@/hooks/useQueryHooks";
import CreateComment from "./createComment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateCommentForm } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnapshot } from "valtio";
import { state } from "@/store/store";

export default function Comments({ postId }: { postId: number }) {
  const [editDialog, setEditDialog] = React.useState<{
    isOpen: boolean;
    commentId: number;
  }>({
    isOpen: false,
    commentId: 0,
  });

  const [removeDialog, setRemoveDialog] = React.useState<{
    isOpen: boolean;
    commentId: number;
  }>({ isOpen: false, commentId: 0 });

  const snapUser = useSnapshot(state.user);
  const { mutate: updateComment } = useUpdateCommentById();
  const { mutate: deleteComment } = useDeleteCommentById();

  const form = useForm<z.infer<typeof UpdateCommentForm>>({
    resolver: zodResolver(UpdateCommentForm),
    defaultValues: {
      body: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdateCommentForm>) {
    const comment: UpdateComment = {
      id: editDialog.commentId,
      postId: postId,
      name: snapUser.name,
      email: snapUser.email,
      body: data.body,
    };

    updateComment({ comment });
    setEditDialog({
      isOpen: false,
      commentId: 0,
    });
  }

  const [showComments, setShowComments] = React.useState<boolean>(false);
  const { data } = useCommentsById(postId);

  const showHideComment = () => setShowComments((prev) => !prev);

  const onEdit = (id: number, body: string) => {
    form.setValue("body", body);
    setEditDialog({
      isOpen: true,
      commentId: id,
    });
  };

  const onRemove = (id: number) => {
    setRemoveDialog({
      isOpen: true,
      commentId: id,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button size="sm" variant="secondary" onClick={showHideComment}>
        {showComments ? "Hide comments" : "Show comments"}
      </Button>
      {showComments && (
        <div className="mt-4 pt-4 flex flex-col gap-4">
          {data?.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col">
                  <p>
                    <strong>{comment.name}</strong>
                  </p>
                  <p className="text-slate-500 text-xs">{comment.email}</p>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost">
                      <Menu size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto" align="end">
                    <div className="flex flex-row gap-2">
                      <Button
                        size="icon"
                        onClick={() => {
                          onEdit(comment.id, comment.body);
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onRemove(comment.id)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm">{comment.body}</p>
            </div>
          ))}

          <CreateComment postId={postId} />
        </div>
      )}

      <Dialog
        open={editDialog.isOpen}
        onOpenChange={(e: boolean) =>
          setEditDialog({ isOpen: e, commentId: 0 })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit message</DialogTitle>
            <DialogDescription>
              Make changes to your message here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
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
        onOpenChange={(e: boolean) =>
          setRemoveDialog({ isOpen: e, commentId: 0 })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              message from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteComment({ id: removeDialog.commentId, postId: postId })
              }
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
