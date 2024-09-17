"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useGetCurrentUser } from "@/actions/get-current-user";
import { Skeleton } from "../ui/skeleton";

function UserInfo({ className }: { className?: string }) {
  const { data: userData, isFetching } = useGetCurrentUser();

  return (
    <>
      <div className={className}>
        <Popover>
          <PopoverTrigger>
            <span className="flex gap-2">
              💰
              {isFetching ? (
                <Skeleton className="h-6 w-6" />
              ) : (
                <p>
                  {userData.coins > 1000000000
                    ? "a lot"
                    : userData.coins > 1000000
                      ? (userData.coins / 1000000).toFixed(2) + "m"
                      : userData.coins > 1000
                        ? (userData.coins / 1000).toFixed(2) + "k"
                        : userData.coins}
                </p>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <span className="text-sm flex items-center justify-center">
              {userData.coins} coins
            </span>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <span className="flex gap-2">
              👑
              {isFetching ? (
                <Skeleton className="h-6 w-6" />
              ) : (
                <p>
                  {userData.points > 1000000000
                    ? "a lot"
                    : userData.points > 1000000
                      ? (userData.points / 1000000).toFixed(2) + "m"
                      : userData.points > 1000
                        ? (userData.points / 1000).toFixed(2) + "k"
                        : userData.points}
                </p>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <span className="text-sm flex items-center justify-center">
              {userData.points} points
            </span>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <span className="flex gap-2">
              {isFetching ? (
                <Skeleton className="h-6 w-6" />
              ) : (
                <div className="bg-fuchsia-300 border border-fuchsia-400 dark:bg-fuchsia-800 dark:border-fuchsia-700 text-fuchsia-700 dark:text-fuchsia-200 rounded-lg p-2 text-sm w-6 h-6 flex items-center justify-center">
                  {userData.level}{" "}
                </div>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-fit text-sm flex flex-col gap-2">
            <p>Level points</p>
            <div className="flex gap-2 flex-col">
              <Progress
                value={(userData.exp * 100) / userData.exp_to_next_level}
              />
              <span>
                {userData.exp}/{userData.exp_to_next_level}
                {""}
                <span> to {userData.level + 1} lvl</span>
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default UserInfo;
