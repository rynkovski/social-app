"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meeting } from "@/types/meetings.types";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { postConfirmMeeting } from "@/actions/post-confirm-meeting";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { useState } from "react";
function MeetingsCard({ meeting }: { meeting: Meeting }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleClick = async () => {
    setIsLoading(true);
    postConfirmMeeting(meeting.id)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["meetings-not-confirmed"] });
        queryClient.invalidateQueries({ queryKey: ["meetings-confirmed"] });
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        toast({
          variant: "success",
          title: "Meeting confirmed! 🎉",
          description: "Congratulations we added reward to your account!",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
      });
  };

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{meeting.place.name}</CardTitle>
        <CardDescription>{meeting.date}</CardDescription>
        <Link href={`/meetings/${meeting.id}`}>
          <SquareArrowOutUpRight size={26} className="absolute right-4 top-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <p>{meeting.users} participants</p>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        {meeting.confirmed_by_majority ? (
          <p className="text-green-500">Confirmed by majority</p>
        ) : (
          <p className="text-red-500">Not confirmed</p>
        )}
        {!meeting.confirmed_by_you && meeting.participated && (
          <Button
            disabled={isLoading}
            onClick={handleClick}
            className="bg-fuchsia-500 hover:bg-fuchsia-600"
          >
            Confirm
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default MeetingsCard;
