"use client";
import { useGetUsers } from "@/actions/get-users";
import UserAvatar from "../user/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { User } from "@/types/user.types";
import Link from "next/link";

export default function RankingTable() {
  const { data: usersData, isFetching } = useGetUsers();

  const sortByPointsDescending = (a: User, b: User) => b.points - a.points;

  if (isFetching)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    );

  const sortedData = usersData?.sort(sortByPointsDescending);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>User</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData?.map((user: User) => (
          <TableRow key={user.id}>
            <TableHead>
              <UserAvatar username={user.username} />
            </TableHead>
            <TableCell className="font-medium">
              <Link href={"/profile/" + user.username}>
                {user.username.length > 10
                  ? user.username.slice(0, 12) + "..."
                  : user.username}
              </Link>
            </TableCell>
            <TableCell>{user.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
