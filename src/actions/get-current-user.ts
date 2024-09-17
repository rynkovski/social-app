"use client";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUser = async () => {
  const response = await api.get("/users/me/");
  return response.data;
};

export const useGetCurrentUser = () => {
  const queryFN = () => getCurrentUser();
  return useQuery({
    queryKey: ["current-user"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: {},
  });
};
