"use client";
import { MeetingById } from "@/types/meetings.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getMeetingById = async (id: number): Promise<MeetingById> => {
  const response = await api.get(`/meetings/${id}/`);
  return response.data;
};

export const useGetMeetingById = (id: number) => {
  const queryFN = () => getMeetingById(id);
  return useQuery({
    queryKey: ["meetings", id],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: {} as MeetingById,
  });
};
