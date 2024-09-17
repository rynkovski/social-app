"use client";

import React, { useEffect, useState } from "react";
import { Chat } from "./chat";

interface ChatLayoutProps {
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({}: ChatLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return <Chat isMobile={isMobile} />;
}
