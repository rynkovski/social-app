import { highCardSchema } from "@/schemas/casino-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { postPlayHighCard } from "@/actions/post-play-high-card";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  setCard: (card: { value: string; suit: string }) => void;
  setMultipliers: (multipliers: number[]) => void;
  multipliers: number[];
};

type TBet = "low" | "high" | "equal";

type BetButton = {
  bet: TBet;
  name: string;
  variant: "default" | "outline" | "ghost";
  multiplier: string;
};

const BUTTONS = [
  {
    bet: "low",
    name: "Lower",
    variant: "outline",
  },
  {
    bet: "equal",
    name: "Equal",
    variant: "default",
  },
  {
    bet: "high",
    name: "Higher",
    variant: "outline",
  },
] as BetButton[];

function HighCardForm({ setCard, setMultipliers, multipliers }: Props) {
  const [betValue, setBetValue] = useState<TBet>("high");
  const [cardValue, setCardValue] = useState("");
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof highCardSchema>>({
    resolver: zodResolver(highCardSchema),
    defaultValues: {
      bet_amount: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof highCardSchema>) {
    const newBet = {
      bet: betValue,
      bet_amount: data.bet_amount,
    };
    setDisabled(true);
    postPlayHighCard(newBet)
      .then((response) => {
        const newCard = {
          value: response.card_value,
          suit: response.card_suit,
        };
        setCard(newCard);
        setDisabled(false);
        setCardValue(response.card_value);
        setMultipliers(response.multipliers);
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        if (response.has_won) {
          toast({
            variant: "success",
            title: "You won! 🥳",
            description: `We added ${response.reward} coins to your account!`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "You lost 😔",
            description: "Better luck next time.",
          });
        }
      })
      .catch((error) => {
        setDisabled(false);
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="bet_amount"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 ">
                <FormLabel>Bet amount:</FormLabel>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Bet"
                  className="w-fit space-y-0"
                  {...field}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2">
          {BUTTONS.map((button) => (
            <div
              className="flex items-center justify-center gap-2 flex-col"
              key={button.bet}
            >
              <Button
                variant={button.variant}
                value={button.bet}
                onClick={() => setBetValue(button.bet)}
                type="submit"
                size={"sm"}
                disabled={
                  (cardValue === "2" && button.bet === "low") ||
                  (cardValue === "A" && button.bet === "high") ||
                  disabled
                }
              >
                {button.name}
              </Button>
              <span className="text-sm text-muted-foreground">
                {multipliers[BUTTONS.indexOf(button)]}
              </span>
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}

export default HighCardForm;
