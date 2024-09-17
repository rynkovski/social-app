export type HighCard = {
  bet_amount: number;
  card_suit: string;
  card_value: string;
  demo_play: boolean;
  has_won: boolean;
  reward: number;
  multipliers: number[];
};
export type Roulette = {
  has_won: boolean;
  amount: number;
  rolled_number: number;
  rolled_number_index: number;
  color: "string";
};

export type TBetRoulette =
  | "NUMBER"
  | "FIRST12"
  | "SECOND12"
  | "THIRD12"
  | "ROW1"
  | "ROW2"
  | "ROW3"
  | "BLACK"
  | "RED"
  | "GREEN"
  | "ODD"
  | "EVEN"
  | "HALF_LOW"
  | "HALF_HIGH";
