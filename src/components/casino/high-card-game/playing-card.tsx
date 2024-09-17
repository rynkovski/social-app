import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const CARD_FIGURES = [
  {
    name: "hearts",
    symbol: "♥️",
  },
  {
    name: "spades",
    symbol: "♠️",
  },
  {
    name: "diamonds",
    symbol: "♦️",
  },
  {
    name: "clubs",
    symbol: "♣️",
  },
];

function PlayingCard({ value, suit }: { value: string; suit: string }) {
  const suitSymbol = CARD_FIGURES.find(
    (figure) => figure.name === suit
  )?.symbol;

  return (
    <Card className="w-1/2 h-full bg-stone-100 dark:bg-slate-500 shadow-lg  rounded-lg">
      <CardHeader className="items-start flex-row text-2xl">
        {value}
        {suitSymbol}
      </CardHeader>
      <CardContent className="text-3xl">{suitSymbol}</CardContent>
      <CardFooter className="flex justify-end flex-row text-2xl">
        {value}
        {suitSymbol}
      </CardFooter>
    </Card>
  );
}

export default PlayingCard;
