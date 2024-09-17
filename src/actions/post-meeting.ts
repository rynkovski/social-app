import api from "@/utils/api";

type TMeeting = {
  participants: number[];
  place_name: string;
  date: string;
};
export const postMeeting = async (data: TMeeting) => {
  const response = await api.post("/meetings/", data);
  return response.data;
};
