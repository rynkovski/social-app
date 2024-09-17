"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBottombar from "./chat-bottombar";
import UserAvatar from "../user/avatar";
import { useGetCurrentUser } from "@/actions/get-current-user";
import { Skeleton } from "../ui/skeleton";
import { TMessage } from "./chat";
import { Bot } from "lucide-react";

type ChatListProps = {
  messages?: TMessage[];

  sendMessage: (newMessage: TMessage) => void;
  isMobile: boolean;
};

export function ChatList({ messages, sendMessage, isMobile }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { data: userData, isFetching: isFetchingUser } = useGetCurrentUser();
  const username = userData?.username as string;

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages && messages.length > 0 ? (
            <>
              {messages?.map((message, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: messages.indexOf(message) * 0.05 + 0.2,
                    },
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  className={cn(
                    "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div className="flex gap-3 items-center">
                    {message.role === "assistant" && (
                      <>
                        <Bot
                          size={36}
                          className="bg-slate-500 p-2 rounded-full text-white"
                        />
                      </>
                    )}
                    <span className="bg-accent p-3 rounded-md max-w-xs">
                      {message.content}
                    </span>
                    {isFetchingUser ? (
                      <Skeleton className="w-10 h-10 rounded-full" />
                    ) : (
                      <>
                        {message.role === "user" && (
                          <UserAvatar username={username} />
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <div className=" flex flex-col gap-2 p-4 whitespace-pre-wrap">
              <div className="flex gap-3 items-center">
                <Bot
                  size={36}
                  className="bg-slate-500 p-2 rounded-full text-white"
                />

                <span className="bg-accent p-3 rounded-md max-w-xs text-muted-foreground">
                  Bot is waiting for your message
                </span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
