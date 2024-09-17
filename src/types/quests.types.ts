export type Quest = {
  id: string;
  title: string;
  level_required: number;
  duration: string;
};

export type QuestStatus = {
  quest_id: number;
  finished: boolean;
  redeemed: boolean;
  remaining_time: number;
  total_time: number;
  will_end_at: Date;
};
