"use client";

import React from "react";
import { Bot, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function ChatTopbar() {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Bot size={36} className="bg-slate-500 p-2 rounded-full text-white" />

          <span className="absolute w-3 h-3 bottom-0 right-0  rounded-full bg-green-400   border border-black"></span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Friendly chatbot</span>
          <span className="text-xs">Online</span>
        </div>
      </div>

      <div>
        <Link
          href="/profile/bot"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <Info size={20} className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
