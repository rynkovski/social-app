"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function UserAvatar({ username }: { username: string }) {
  const firstLetterOfUsername = Array.from(username)[0].toUpperCase();

  return (
    <Avatar>
      <AvatarFallback>{firstLetterOfUsername}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
