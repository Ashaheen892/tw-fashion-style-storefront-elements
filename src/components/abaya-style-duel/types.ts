export interface DuelRound {
  id: string;
  question: string;
  img_a: string;
  name_a: string;
  url_a: string;
  votes_a: number;
  img_b: string;
  name_b: string;
  url_b: string;
  votes_b: number;
  result_desc: string;
  enable_next: boolean;
}

export type DuelChoice = 'a' | 'b';

export interface StoredVotes {
  votes: Record<string, DuelChoice>;
}
