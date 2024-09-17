import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlayingCard from "@/components/casino/high-card-game/playing-card";
import { postPlayHighCard } from "@/actions/post-play-high-card";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import HighCardForm from "@/components/forms/high-card-form";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const initCard = {
  value: "9",
  suit: "H",
};

function HighCardGame() {
  const [playState, setPlayState] = useState(false);
  const [card, setCard] = useState(initCard);
  const [multipliers, setMultipliers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePlay = () => {
    setLoading(true);
    setPlayState(true);
    postPlayHighCard({ bet_amount: 0, bet: "high" })
      .then((response) => {
        const newCard = {
          value: response.card_value,
          suit: response.card_suit,
        };
        setCard(newCard);
        setMultipliers(response.multipliers);
        setTimeout(() => {
          setLoading(false);
        }, 300);
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
    <Card className=" flex flex-col justify-between items-center w-full sm:max-w-3xl mx-auto text-center">
      <CardHeader className="sm:my-4 pt-4 pb-0">
        <CardTitle className="text-lg sm:text-3xl">High Card</CardTitle>
        <CardDescription className="text-[12px] sm:text-sm">
          This is a game where you have to predict if next card will be higher
          or lower.
        </CardDescription>
      </CardHeader>
      {playState ? (
        <>
          {loading ? (
            <Loader2Icon className="animate-spin my-12" />
          ) : (
            <>
              {" "}
              <CardContent className="flex justify-center items-center w-full max-w-md mx-auto p-4 ">
                <PlayingCard value={card.value} suit={card.suit} />
              </CardContent>
              <CardFooter className="flex items-center justify-center gap-2 flex-col p-4">
                <HighCardForm
                  setCard={setCard}
                  multipliers={multipliers}
                  setMultipliers={setMultipliers}
                />
              </CardFooter>
            </>
          )}
        </>
      ) : (
        <div className="h-24 flex justify-center items-center">
          <Button onClick={handlePlay}>PLAY</Button>
        </div>
      )}
    </Card>
  );
}

export default HighCardGame;
