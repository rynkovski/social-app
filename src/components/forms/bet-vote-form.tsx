"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { betVoteSchema } from "@/schemas/bets-schema";
import { Input } from "../ui/input";
import { MetaBet } from "@/types/bets.types";
import { postBetVote } from "@/actions/post-bet-vote";

function BetVoteForm({ bet }: { bet: MetaBet }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof betVoteSchema>>({
    resolver: zodResolver(betVoteSchema),
    defaultValues: {
      amount: 0,
      vote: "",
    },
  });

  async function onSubmit(data: z.infer<typeof betVoteSchema>) {
    setIsLoading(true);
    const id = bet.id;
    postBetVote({ data, id })
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["bets"] });
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        toast({
          variant: "success",
          title: `Congratulations! 🎉`,
          description: `You bet ${data.amount} coins for ${data.vote === "a" ? bet.label_1 : bet.label_2} in bet: ${bet.text}`,
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormLabel>
                Bet amount:<span className="text-red-500">*</span>
              </FormLabel>

              <Input
                type="number"
                inputMode="numeric"
                placeholder="Bet"
                className="max-w-[150px] w-full mx-auto space-y-0"
                {...field}
                required
                disabled={!bet.can_vote}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center w-full gap-2 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              type="submit"
              variant={"outline"}
              disabled={!bet.can_vote || isLoading}
              onClick={() => {
                form.setValue("vote", "a");
              }}
              className="max-w-max h-fit"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <span className="break-words break-all whitespace-pre-wrap">
                  {bet.label_1}
                </span>
              )}
            </Button>
            <div className="text-muted-foreground">Rate: {bet.ratio_1}</div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              type="submit"
              variant={"outline"}
              disabled={!bet.can_vote || isLoading}
              onClick={() => {
                form.setValue("vote", "b");
              }}
              className="max-w-max h-fit"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <span className="break-words break-all whitespace-pre-wrap h-full">
                  {bet.label_2}
                </span>
              )}
            </Button>
            <div className="text-muted-foreground">Rate: {bet.ratio_2}</div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default BetVoteForm;
