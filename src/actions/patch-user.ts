"use client";
import { User } from "@/types/user.types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  description: string;
};

export const patchUserById = async ({
  data,
  id,
}: {
  data: Props;
  id: number;
}): Promise<User> => {
  const response = await api.patch(`/users/${id}/`, data);
  return response.data;
};

export const usePatchUserById = ({ data, id }: { data: Props; id: number }) => {
  const queryFN = () => patchUserById({ data, id });
  return useQuery({
    queryKey: ["user", id],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
