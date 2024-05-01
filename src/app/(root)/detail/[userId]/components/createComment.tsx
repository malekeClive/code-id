"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCommentById } from "@/hooks/useQueryHooks";
import { CreateCommentForm } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSnapshot } from "valtio";
import { state } from "@/store/store";

export default function CreateComment({ postId }: { postId: number }) {
  const snapUser = useSnapshot(state.user);
  const { mutate: createComment } = useCreateCommentById();

  const form = useForm<z.infer<typeof CreateCommentForm>>({
    resolver: zodResolver(CreateCommentForm),
    defaultValues: {
      body: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateCommentForm>) {
    createComment({
      comment: {
        postId: postId,
        name: snapUser.name,
        email: snapUser.email,
        body: data.body,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-2 mt-6"
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Write a comment..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="space-y-0" type="submit">
          Comment
        </Button>
      </form>
    </Form>
  );
}
