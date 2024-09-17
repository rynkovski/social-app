"use client";

import { useEffect, useState } from "react";
import { useGetCurrentUser } from "@/actions/get-current-user";
import { redeemDailyCoins } from "@/actions/redeem-daily-coins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Confetti } from "../magicui/confetti";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

function RedeemCoinsButton() {
  const [disabled, setDisabled] = useState(false);
  const { data: userData } = useGetCurrentUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    setDisabled(userData.daily_coins_redeemed);
  }, [userData]);

  const { mutateAsync: redeemDailyCoinsMutation } = useMutation({
    mutationFn: redeemDailyCoins,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const handleClick = () => {
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
    setDisabled(true);

    redeemDailyCoinsMutation()
      .then(() => {
        toast({
          variant: "success",
          title: "Coins redeemed!",
          description: `We added 50 coins to your account!`,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data,
        });
      });
  };
  return (
    <Button
      size={"sm"}
      onClick={handleClick}
      variant={"default"}
      disabled={disabled}
      className="text-xs sm:text-sm animate-buttonheartbeat disabled:animate-none rounded-md bg-fuchsia-500 px-4 py-1 font-semibold  hover:bg-fuchsia-600 translate-y-0 translate-x-0"
    >
      {disabled ? "Come back tomorrow 🥳" : "Claim coins"}
    </Button>
  );
}

export default RedeemCoinsButton;
