"use client";

import { useGetMeetingsConfirmed } from "@/actions/get-meetings-confirmed";
import { useGetMeetingsNotConfirmed } from "@/actions/get-meetings-not-confirmed";
import MeetingsCard from "@/components/cards/meetings-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Meeting } from "@/types/meetings.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Index() {
  const { data: meetingsDataConfirmed, isFetching } = useGetMeetingsConfirmed();
  const { data: meetingsDataNotConfirmed } = useGetMeetingsNotConfirmed();

  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    if (meetingsDataConfirmed && meetingsDataNotConfirmed) {
      setMeetings(meetingsDataConfirmed.concat(meetingsDataNotConfirmed));
    }
  }, [meetingsDataConfirmed, meetingsDataNotConfirmed]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Link href="/meetings/add">
          <Button className="w-full">Add meeting</Button>
        </Link>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetching ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-48 rounded-lg" />
              ))}
            </>
          ) : (
            <>
              {meetings.length > 0 ? (
                <React.Fragment key={"meetings-cards"}>
                  {meetings.map((meeting: Meeting) => (
                    <React.Fragment key={meeting.id}>
                      <MeetingsCard meeting={meeting} />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ) : (
                <p key={"no-meetings"}>No meetings</p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
