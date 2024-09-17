"use client";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getQuests = async () => {
  const response = await api.get("/quests/choices/");
  return response.data;
};

export const useGetQuests = () => {
  const queryFN = () => getQuests();
  return useQuery({
    queryKey: ["quests"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: {},
  });
};
