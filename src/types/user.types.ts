export type User = {
  id: number;
  username: string;
  coins?: number;
  points: number;
  exp?: number;
  level?: number;
  daily_coins_redeemed?: boolean;
  exp_to_next_level?: number;
  date_joined?: string;
  unread_messages?: TMessage[];
  has_unread_messages?: boolean;
  description?: string;
};

export type TMessage = {
  id: number;
  message: string;
  coins: number;
  read: boolean;
  receiver: number;
  sender: number;
};
