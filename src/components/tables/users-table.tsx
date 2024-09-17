"use client";
import UserAvatar from "../user/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MeetingUser } from "@/types/meetings.types";

export default function UsersTable({ users }: { users: MeetingUser[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Participant</TableHead>
          <TableHead>Confirmed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableHead>
              <UserAvatar username={user.username} />
            </TableHead>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.confirmed ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
