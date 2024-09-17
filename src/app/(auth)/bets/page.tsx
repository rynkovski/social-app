"use client";
import { useGetBets } from "@/actions/get-bets";
import BetsCard from "@/components/cards/bets-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MetaBet } from "@/types/bets.types";
import Link from "next/link";

function Index() {
  const { data: betsData, isFetching } = useGetBets();

  const sortedBetsData = betsData
    ?.reduce((acc, curr) => {
      if (curr.is_open === false) {
        return [...acc, curr];
      } else {
        return [...acc, curr];
      }
    }, [] as MetaBet[])
    .sort((a, b) => {
      if (a.is_open === b.is_open) {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return dateA.getTime() - dateB.getTime();
      }
      return a.is_open ? -1 : 1;
    });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Link href="/bets/add">
          <Button className="w-full">ADD BET</Button>
        </Link>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetching ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-32" />
              ))}
            </>
          ) : (
            <>
              {sortedBetsData?.map((bet) => (
                <BetsCard key={bet.id} bet={bet} />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Index;
