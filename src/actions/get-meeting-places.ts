"use client";
import { Place } from "@/types/meetings.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getMeetingPlaces = async (): Promise<Place[]> => {
  const response = await api.get("/meetings/places/");
  return response.data;
};

export const useGetMeetingPlaces = () => {
  const queryFN = () => getMeetingPlaces();
  return useQuery({
    queryKey: ["meeting-places"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
