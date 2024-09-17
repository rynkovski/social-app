"use client";
import { Meeting } from "@/types/meetings.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getMeetingsNotConfirmed = async (): Promise<Meeting[]> => {
  const response = await api.get("/meetings/not_confirmed/");
  return response.data;
};

export const useGetMeetingsNotConfirmed = () => {
  const queryFN = () => getMeetingsNotConfirmed();
  return useQuery({
    queryKey: ["meetings-not-confirmed"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
