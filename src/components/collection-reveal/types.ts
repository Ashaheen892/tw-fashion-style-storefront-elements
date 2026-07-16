export interface RevealProduct {
  image: string;
  name: string;
  desc: string;
  url: string;
  btn_text: string;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}
