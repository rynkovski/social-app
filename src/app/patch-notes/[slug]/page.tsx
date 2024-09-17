"use client";
import { useGetPatchNotes } from "@/actions/get-patch-notes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

function Index({ params }: { params: { slug: string } }) {
  const { data } = useGetPatchNotes();
  const markdown = data?.find((post) => post.version === params.slug)?.text;
  const postDate = data?.find((post) => post.version === params.slug)?.date;
  return (
    <article className="px-2">
      <Link href="/patch-notes/" className="w-fit">
        <Button variant="link" className="p-0">
          <ChevronLeft size={16} />
          Return
        </Button>
      </Link>
      <div className="px-2">
        <h1 className="text-3xl font-bold mb-3">Patch {params.slug}</h1>
        <p className="text-lg mb-3 text-muted-foreground">{postDate}</p>
        <Markdown className={"prose dark:prose-invert"}>{markdown}</Markdown>
      </div>
    </article>
  );
}

export default Index;
