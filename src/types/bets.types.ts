export type MetaBet = {
  id: number;
  started_by: {
    id: number;
    username: string;
    points: number;
  };
  text: string;
  total_votes: string;
  can_vote: boolean;
  label_1: string;
  label_2: string;
  ratio_1: number;
  ratio_2: number;
  total: string;
  created_at: string;
  deadline: string;
  rewards_granted: boolean;
  is_open: boolean;
};

export type BetAdd = {
  text: string;
  label_1: string;
  label_2: string;
  deadline: Date;
};
