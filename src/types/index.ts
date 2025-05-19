export interface Card {
  id: number;
  content: string;
  isMatched: boolean;
}

export interface GameState {
  score: number;
  level: number;
  highScore:number;
}