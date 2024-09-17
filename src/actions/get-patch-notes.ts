"use client";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
type Post = {
  id: number;
  date: string;
  version: string;
  text: string;
  title: string;
};
export const getPatchNotes = async (): Promise<Post[]> => {
  const response = await api.get("/patch_notes/");
  return response.data;
};

export const useGetPatchNotes = () => {
  const queryFN = () => getPatchNotes();
  return useQuery({
    queryKey: ["patch-notes"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: [],
  });
};
