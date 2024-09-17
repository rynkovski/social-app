import { MetaBet } from "@/types/bets.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import BetVoteForm from "../forms/bet-vote-form";

function BetsCard({ bet }: { bet: MetaBet }) {
  return (
    <Card
      className={
        bet.is_open === false
          ? "bg-muted text-muted-foreground text-center"
          : "text-center"
      }
    >
      <CardHeader>
        <CardDescription>
          {bet.is_open === false &&
            "Bet is closed. Wait to be determined by admin"}
        </CardDescription>
        <CardTitle className="break-words text-center">{bet.text}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex justify-center items-center flex-col gap-2 font-semibold">
          Created by:{" "}
          <span className="font-normal">{bet.started_by.username}</span>
        </div>
        <div className="flex  justify-center items-center flex-col gap-2 font-semibold">
          Deadline:{" "}
          <span className="font-normal">{format(bet.deadline, "PPPp")}</span>
        </div>
        <div className="flex  justify-center items-center flex-col gap-2 font-semibold">
          All votes: <span className="font-normal">{bet.total_votes}</span>
        </div>
        <div className="flex  justify-center items-center flex-col gap-2 font-semibold">
          Total coins: <span className="font-normal">{bet.total}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <BetVoteForm bet={bet} />
      </CardFooter>
    </Card>
  );
}

export default BetsCard;
