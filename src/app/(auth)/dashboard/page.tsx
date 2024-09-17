"use client";

import { useGetQuestStatus } from "@/actions/get-quest-status";
import QuestCard from "@/components/cards/quest-card";
import RankingCard from "@/components/cards/ranking-card";
import CasinoStatsCard from "@/components/casino/casino-stats-card";
import DiscordIcon from "@/components/discord-icon";
import DailyQuestButton from "@/components/quests/daily-quest-button";
import QuestSelect from "@/components/quests/quest-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [quest, setQuest] = useState<number>(0);
  const [questStart, setQuestStart] = useState(false);
  const [questEndDate, setQuestEndDate] = useState(new Date());
  const [totalTime, setTotalTime] = useState(10);
  const [time, setTime] = useState(0);
  const { data: questData, refetch } = useGetQuestStatus();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          intervalRef.current = null;
          refetch();
          return 0;
        } else return prevTime - 1;
      });
    }, 1000);
    intervalRef.current = timer;
  };
  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (questData !== undefined) {
      setTime(questData?.remaining_time);
      setTotalTime(questData?.total_time);
      setQuestEndDate(questData?.will_end_at);
      startTimer();
    }
  }, [questData]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex gap-2 flex-col">
            <QuestSelect setQuest={setQuest} questStart={questStart} />
            {questStart || (questData !== undefined && !questData?.redeemed) ? (
              <QuestCard
                questEndDate={questEndDate}
                time={time}
                totalTime={totalTime}
              />
            ) : (
              <DailyQuestButton
                quest={quest}
                setQuestStart={setQuestStart}
                setQuestEndDate={setQuestEndDate}
                setTotalTime={setTotalTime}
                setTime={setTime}
                startTimer={startTimer}
              />
            )}
          </div>
          <RankingCard />
          <CasinoStatsCard />
        </div>
      </div>
    </main>
  );
}
