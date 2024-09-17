"use client";

import { Button } from "../ui/button";
import { postQuestStart } from "@/actions/post-quest-start";
import { useGetQuestStatus } from "@/actions/get-quest-status";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  quest: number;
  setQuestStart: (value: boolean) => void;
  setQuestEndDate: (value: Date) => void;
  setTime: (value: number) => void;
  setTotalTime: (value: number) => void;
  startTimer: () => void;
};

function DailyQuestButton({
  quest,
  setQuestStart,
  setTime,
  setTotalTime,
  setQuestEndDate,
  startTimer,
}: Props) {
  const { data: questData } = useGetQuestStatus();
  const queryClient = useQueryClient();

  const handleClick = () => {
    const data = {
      quest: quest,
    };
    postQuestStart(data)
      .then((response) => {
        setQuestStart(true);
        setTime(response.time);
        setTotalTime(response.time);
        setQuestEndDate(response.will_end_at);
        startTimer();
        queryClient.invalidateQueries({ queryKey: ["quest-status"] });
        toast({
          variant: "success",
          title: "Quest started! 🥳",
          description: `Don't forget to claim your reward!`,
        });
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
    <Button
      onClick={handleClick}
      className="w-full"
      disabled={questData?.finished || quest === 0}
    >
      {questData?.finished ? "Quest completed" : "Start quest"}
    </Button>
  );
}

export default DailyQuestButton;
