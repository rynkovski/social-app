"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPatchNotes } from "@/actions/get-patch-notes";
import { Skeleton } from "@/components/ui/skeleton";
import { SquareArrowOutUpRight } from "lucide-react";
import { Post } from "@/types/patch-notes.types";

const Page = () => {
  const { data, isFetching } = useGetPatchNotes();

  if (isFetching)
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </div>
    );

  return (
    <div className="container py-2">
      <h1 className="text-3xl font-bold">All patch notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {data?.map((post: Post) => (
          <Link href={`/patch-notes/${post.version}`} key={post.id}>
            <Card className="shadow-md sm:shadow-inherit sm:hover:shadow-md">
              <CardHeader className="relative">
                <CardTitle>Patch {post.version}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
                <SquareArrowOutUpRight className="absolute right-4 top-6" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
