"use client";
import { User } from "@/types/user.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}/`);
  return response.data;
};

export const useGetUserById = (id: number) => {
  const queryFN = () => getUserById(id);
  return useQuery({
    queryKey: ["user", id],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
