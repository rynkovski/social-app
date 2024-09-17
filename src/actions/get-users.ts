"use client";
import { User } from "@/types/user.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/");
  return response.data;
};

export const useGetUsers = () => {
  const queryFN = () => getUsers();
  return useQuery({
    queryKey: ["users"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
