export interface SwipeCard {
  id: string;
  image: string;
  look_name: string;
  look_desc: string;
  tags: string[];
  url: string;
  btn_text: string;
}

export interface SwipeResult {
  tag_name: string;
  result_title: string;
  result_desc: string;
  result_image: string;
  result_url: string;
  result_btn: string;
}

export type SwipeAction = 'like' | 'skip';

export interface SwipeHistoryItem {
  cardId: string;
  action: SwipeAction;
}

export interface StoredSwipeState {
  index: number;
  likedIds: string[];
  history: SwipeHistoryItem[];
}
