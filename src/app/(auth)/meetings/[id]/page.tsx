"use client";
import { useGetMeetingById } from "@/actions/get-meeting-id";
import UsersTable from "@/components/tables/users-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MeetingUser } from "@/types/meetings.types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Index({ params }: { params: { id: number } }) {
  const { data, isFetching } = useGetMeetingById(params.id);
  const [users, setUsers] = useState<MeetingUser[]>([]);

  useEffect(() => {
    if (data?.users) {
      setUsers(data?.users);
    }
  }, [data]);

  return (
    <main className="p-4 sm:px-6 sm:py-0">
      <Link href="/meetings/" className="w-fit">
        <Button variant="link" className="p-0">
          <ChevronLeft size={16} />
          Return
        </Button>
      </Link>
      {isFetching ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-6 rounded-lg" />
          <Skeleton className="w-full h-6 rounded-lg" />
          <Skeleton className="w-full h-6 rounded-lg" />
          <Skeleton className="w-full h-6 rounded-lg" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-sm m-4">
          <div className="flex gap-2">
            <p className="font-bold text-3xl">{data?.place.name}</p>
            <p>({data?.place.used_in_meetings})</p>
          </div>

          <p className="text-muted-foreground">{data?.date}</p>
          <p className="italic">
            {data?.confirmed_by_majority ? "Confirmed" : "Not confirmed"} by
            majority
          </p>

          <p className="break-words font-semibold">{data?.description}</p>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <UsersTable users={users} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Index;
