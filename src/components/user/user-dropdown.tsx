"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useGetCurrentUser } from "@/actions/get-current-user";
import UserAvatar from "./avatar";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useState } from "react";

function UserDropdown() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const theme = useTheme().resolvedTheme;
  const { data: userData, isFetching } = useGetCurrentUser();
  const [open, setOpen] = useState(false);
  const username = userData?.username as string;
  const logout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        {isFetching ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <div className="relative">
            <UserAvatar username={username} />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel onClick={() => setOpen(false)}>
          <Link href={"/profile/" + username}>{username}</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Change theme
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
