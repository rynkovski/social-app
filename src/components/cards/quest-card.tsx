"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";
import { useGetQuests } from "@/actions/get-quests";
import { useGetQuestStatus } from "@/actions/get-quest-status";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { postQuestRedeem } from "@/actions/post-quest-redeem";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Confetti } from "../magicui/confetti";

type Props = {
  questEndDate: Date;
  time: number;
  totalTime: number;
};

function QuestCard({ questEndDate, time, totalTime }: Props) {
  const { data: questsChoices } = useGetQuests();
  const { data: questData } = useGetQuestStatus();
  const [disabled, setDisabled] = useState(false);

  const [progress, setProgress] = useState(33);
  const queryClient = useQueryClient();

  const redeemQuest = () => {
    postQuestRedeem()
      .then((response) => {
        setDisabled(true);
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        queryClient.invalidateQueries({ queryKey: ["quest-status"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        shootCoins();
        toast({
          variant: "success",
          title: "Reward claimed! 🥳",
          description: `We added ${response.coins} coins to your account!`,
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

  const shootCoins = () => {
    const scalar = 2;
    const coin = Confetti.shapeFromText({ text: "🪙", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [coin],
      scalar,
    };

    const shoot = () => {
      Confetti({
        ...defaults,
        particleCount: 30,
      });
      Confetti({
        ...defaults,
        particleCount: 5,
        flat: true,
      });
      Confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  useEffect(() => {
    setProgress((time / totalTime) * 100);
  }, [time]);

  if (!questData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2">
          {" "}
          {questsChoices?.[questData?.quest_id - 1]?.title}
        </CardTitle>
        <div>
          <Progress className="sm:h-6 " value={progress} />
        </div>
        <CardDescription>
          {questsChoices?.[questData?.quest_id - 1]?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm p-0">
        {!questData?.finished ? (
          <div className="flex flex-col gap-3 p-6 pt-0">
            <div>
              <span className="font-semibold">Remaining time: </span>
              {`${Math.floor(time / 60)}`.padStart(2, "0")}:
              {`${time % 60}`.padStart(2, "0")}
            </div>
            <div>
              <span className="font-semibold">End time: </span>{" "}
              {format(questEndDate, "PPPpp")}
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-center items-center flex-col gap-3">
        {questData?.finished && <span>Daily quest finished! </span>}
        {questData?.finished && !questData?.redeemed && (
          <Button onClick={redeemQuest} disabled={disabled}>
            Claim reward 🏆
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default QuestCard;
