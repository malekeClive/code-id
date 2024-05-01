"use client";
import { setUser } from "@/store/store";
import { User } from "@/types/views";
import React from "react";

export default function UserDetail({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  setUser(user);
  return <>{children}</>;
}
