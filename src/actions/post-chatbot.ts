import { TMessage } from "@/components/chat/chat";
import api from "@/utils/api";

type Props = {
  message: TMessage[];
};

export const chatbotTalk = async (message: Props): Promise<TMessage[]> => {
  const response = await api.post("/chatbot/talk/", message);
  return response.data;
};
