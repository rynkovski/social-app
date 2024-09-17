"use client";
import { Meeting } from "@/types/meetings.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getMeetingsConfirmed = async (): Promise<Meeting[]> => {
  const response = await api.get("/meetings/confirmed/");
  return response.data;
};

export const useGetMeetingsConfirmed = () => {
  const queryFN = () => getMeetingsConfirmed();
  return useQuery({
    queryKey: ["meetings-confirmed"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
