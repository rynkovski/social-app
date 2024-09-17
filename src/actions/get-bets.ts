"use client";
import { MetaBet } from "@/types/bets.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getBets = async (): Promise<MetaBet[]> => {
  const response = await api.get("/bets/");
  return response.data;
};

export const useGetBets = () => {
  const queryFN = () => getBets();
  return useQuery({
    queryKey: ["bets"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
