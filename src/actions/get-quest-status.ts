"use client";
import { QuestStatus } from "@/types/quests.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getQuestStatus = async (): Promise<QuestStatus> => {
  const response = await api.get("/quests/status/");
  return response.data;
};

export const useGetQuestStatus = () => {
  const queryFN = () => getQuestStatus();
  return useQuery({
    queryKey: ["quest-status"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
