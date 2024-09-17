export type Meeting = {
  id: number;
  date: string;
  confirmed_by_majority: boolean;
  place: Place;
  users: number;
  casino: boolean;
  pizza: boolean;
  confirmed_by_you?: boolean;
  participated?: boolean;
  description: string;
};

export type MeetingById = Meeting & {
  users: MeetingUser[];
};

export type MeetingUser = {
  id: number;
  username: string;
  confirmed: boolean;
  drinking: boolean;
};

export type Place = {
  name: string;
  id: number;
  used_in_meetings: number;
};
