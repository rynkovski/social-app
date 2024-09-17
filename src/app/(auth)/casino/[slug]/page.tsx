"use client";

import HighCardGame from "@/components/casino/high-card-game/high-card-game";
import RouletteGame from "@/components/casino/roulette/roulette-game";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Index({ params }: { params: { slug: string } }) {
  return (
    <section className="p-2">
      <Link href="/casino/" className="w-fit">
        <Button variant="link" className="p-0" size={"sm"}>
          <ChevronLeft size={16} />
          Return
        </Button>
      </Link>
      <div className="p-2">
        {params.slug === "high-card" ? <HighCardGame /> : null}
        {params.slug === "roulette" ? <RouletteGame /> : null}
      </div>
    </section>
  );
}

export default Index;
