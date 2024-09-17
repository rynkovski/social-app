"use client";

import { useGetCurrentUser } from "@/actions/get-current-user";
import { Loader, Mail } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TMessage } from "@/types/user.types";
import { Button } from "./ui/button";
import { useState } from "react";
import { postReadMessage } from "@/actions/post-read-message";
import { toast } from "./ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQueryClient } from "@tanstack/react-query";

function MessagesIcon() {
  const { data: userData, isFetching } = useGetCurrentUser();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleRead = async (messageId: number) => {
    setLoading(true);
    const data = {
      id: messageId,
    };

    postReadMessage(data)
      .then(() => {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        toast({
          variant: "success",
          title: "You read the message! 🎉",
          description: `We added reward to your account!`,
        });
      })
      .catch((error) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
      });
  };

  if (!userData?.has_unread_messages) return null;

  return (
    <>
      {isFetching ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : (
        <>
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="fixed bottom-16 left-2 sm:bottom-5 z-50 cursor-pointer ">
                <div className="relative bg-gray-300 dark:bg-slate-800 p-2 rounded-full">
                  <Mail className="dark:text-muted-foreground" />
                  {userData?.has_unread_messages && (
                    <span className="absolute w-3 h-3 rounded-full bg-red-500 right-0 top-0 text-[8px] text-white text-center">
                      {userData?.unread_messages.length}
                    </span>
                  )}
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>You have new messages</AlertDialogTitle>
                <AlertDialogDescription>
                  (some of them may be important)
                </AlertDialogDescription>
                <div className="flex flex-col items-center justify-center gap-2">
                  {userData?.unread_messages.map((message: TMessage) => (
                    <div
                      key={message.id}
                      className="bg-muted p-2 sm:p-6 w-full rounded-lg"
                    >
                      <div className="text-sm font-semibold">
                        From:
                        <span className="italic font-normal">
                          {message.sender === null ? " ADMIN" : message.sender}
                        </span>
                      </div>
                      <Collapsible>
                        <CollapsibleTrigger className="text-sm">
                          Read more
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="text-primary my-4">
                            {message.message}
                          </div>
                          <div className="text-sm font-semibold my-2">
                            Reward:
                            <span className="ml-1 font-normal">
                              {message.coins}
                            </span>
                          </div>
                          <Button
                            disabled={loading}
                            onClick={() => {
                              handleRead(message.id);
                            }}
                            variant={"outline"}
                          >
                            {loading ? (
                              <Loader className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              "Mark as read"
                            )}
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}

export default MessagesIcon;
