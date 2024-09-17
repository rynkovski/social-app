"use client";
import { Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ChatbotIcon() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/chat");

  if (isActive) {
    return null;
  }

  return (
    <Link href="/chat">
      <div className="fixed bottom-16 right-2 sm:bottom-4 sm:right-4 z-50 cursor-pointer">
        <Bot size={48} className="bg-slate-500 p-2 rounded-full text-white" />
        <span className="w-4 h-4 bottom-16 right-2  rounded-full fixed bg-green-400  sm:bottom-4 sm:right-4 border border-black"></span>
      </div>
    </Link>
  );
}

export default ChatbotIcon;
