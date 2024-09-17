"use client";

import React, { useState } from "react";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import { chatbotTalk } from "@/actions/post-chatbot";
import { toast } from "../ui/use-toast";

type ChatProps = {
  isMobile: boolean;
};

export type TMessage = {
  role: string;
  content: string;
};

export function Chat({ isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<TMessage[]>([]);

  const sendMessage = async (newMessage: TMessage) => {
    setMessages([...messagesState, newMessage]);

    const chatMessage = {
      message: [...messagesState, newMessage],
    };

    chatbotTalk(chatMessage)
      .then((response) => {
        const newChatbotMessage = response.pop() as TMessage;
        setTimeout(() => {
          setMessages([...messagesState, newMessage, newChatbotMessage]);
        }, 3000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
      });
  };

  return (
    <div className="flex flex-col justify-between w-full h-[80dvh]">
      <ChatTopbar />
      <ChatList
        messages={messagesState}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
