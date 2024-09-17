import api from "@/utils/api";

type Props = {
  id: number;
};

export const postReadMessage = async (data: Props) => {
  const response = await api.post("/users/read_message/", data);
  return response.data;
};
