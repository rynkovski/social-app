import GameCard from "@/components/casino/game-card";
import SpinWheel from "@/components/casino/roulette/spin-wheel";
import Link from "next/link";

const games = [
  {
    id: 0,
    title: "High Card",
    description: "Try your luck with high card and see how much you can earn!",
    href: "high-card/",
  },
  {
    id: 1,
    title: "Roulette",
    description: "Early access.",
    href: "roulette/",
  },
  {
    id: 2,
    title: "Bells",
    description: "In progress..",
    href: "#",
  },
  {
    id: 3,
    title: "Blackjack",
    description: "In progress..",
    href: "#",
  },
];

function Index() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <h1 className="text-4xl text-center font-bold">Casino 🎰</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/casino/${game.href}`}
              className={
                game.href === "#" ? "cursor-not-allowed " : "cursor-pointer"
              }
            >
              <GameCard {...game} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Index;
