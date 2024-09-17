"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpinWheel from "./spin-wheel";
import GridRoulette from "./grid-roulette";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { postPlayRoulette } from "@/actions/post-play-roulette";
import { TBetRoulette } from "@/types/casino.types";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function RouletteGame() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [betAmount, setBetAmount] = useState(50);
  const [betType, setBetType] = useState<TBetRoulette>("EVEN");
  const [betNumber, setBetNumber] = useState<number | undefined>(undefined);
  const betsContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const handleSpinClick = async () => {
    setShow(false);
    const data = { bet_amount: betAmount, bet: betType, number: betNumber };

    if (!mustSpin) {
      postPlayRoulette({ ...data })
        .then((response) => {
          setPrizeNumber(response.rolled_number_index);
          setMustSpin(true);
          setTimeout(() => {
            setShow(true);
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            if (response.has_won) {
              toast({
                variant: "success",
                title: "You won! 🥳",
                description: `We added ${response.amount} coins to your account!`,
              });
            } else {
              toast({
                variant: "destructive",
                title: "You lost 😔",
                description: "Better luck next time.",
              });
            }
          }, 6000);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Sorry, something went wrong 😔",
            description: error?.response?.data.detail,
          });
        });
    }
  };

  const scrollToBetsContainer = () => {
    if (betsContainerRef.current) {
      betsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClick = () => {
    scrollToBetsContainer();
    setTimeout(() => {
      handleSpinClick();
    }, 1000);
  };

  return (
    <>
      <Card
        className="flex flex-col justify-between items-center w-full sm:max-w-3xl mx-auto text-center "
        ref={betsContainerRef}
      >
        <CardHeader className="sm:my-4 pt-4 pb-0">
          <CardTitle className="text-lg sm:text-3xl">Roulette</CardTitle>
          <CardDescription className="text-[12px] sm:text-sm">
            Basic roulette game, select bet type and amount, then click spin
            button.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center relative p-3 pt-0 gap-2">
          <SpinWheel
            setMustSpin={setMustSpin}
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            show={show}
          />
          <GridRoulette
            disabled={mustSpin}
            setBetAmount={setBetAmount}
            setBetType={setBetType}
            setBetNumber={setBetNumber}
          />
        </CardContent>
        <CardFooter className="pb-3 flex items-center flex-col justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <span>Bet type: {betType || betNumber}</span>
            <span>Bet amount: {betAmount}</span>
          </div>

          <Button
            className="bg-fuchsia-500 hover:bg-fuchsia-600"
            onClick={handleClick}
            disabled={mustSpin}
          >
            SPIN
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default RouletteGame;
