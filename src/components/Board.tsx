import React, { useState, useEffect} from 'react';
import Card from './Card';
import type { Card as CardType } from '../types';
import '../styles/ScoreBoard.css';

interface BoardProps {
  level: number;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
}

const Board: React.FC<BoardProps> = ({ level, onScoreUpdate, onLevelComplete }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const generateCards = (): void => {
      const cardPairs: number = level + 1;
      const symbols: string[] = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯','🐟'];
      const selectedSymbols: string[] = symbols.slice(0, cardPairs);
      
      const newCards: CardType[] = [...selectedSymbols, ...selectedSymbols]
        .sort(() => Math.random() - 0.5)
        .map((content, index) => ({
          id: index,
          content,
          isMatched: false
        }));
      
      setCards(newCards);
    };
    generateCards();
  }, [level]);

  useEffect(() => {
    if (matchedPairs.length-1 === level) {
      
      console.log(level%2==0? (level*2)+1:'este es el level: ' + level)
      onLevelComplete();
    }
  }, [matchedPairs, onLevelComplete, level]);

  const handleCardClick = (card: CardType): void => {
    if (flippedCards.length === 1) {
      setDisabled(true);
      const newFlippedCards = [...flippedCards, card];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards[0].content === card.content) {
        setMatchedPairs([...matchedPairs, card.content]);
        setFlippedCards([]);
        onScoreUpdate(10);
      } else {
        document.querySelector('.board')?.classList.add("pointer-events-none")
        setTimeout(() => {
          setFlippedCards([]);
          onScoreUpdate(-5);
          document.querySelector('.board')?.classList.remove("pointer-events-none")
        }, 1000);
      }
      setDisabled(false);
    } else {
      setFlippedCards([card]);
    }
  };

  // const gridStyle = ():{ gridTemplateColumns: string; }=>{
  //   if (cards.length){
  //     return {
  //       gridTemplateColumns:`repeat(4,1fr`
  //     }
  //   }else{
  //     return {gridTemplateColumns:`repeat(4,1fr`}
  //   }
  // }

  return (
    <div className=' max-w-3xl m-auto '>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleCardClick}
            flipped={
              flippedCards.includes(card) ||
              matchedPairs.includes(card.content)
            }
            disabled={disabled}
            level={level}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;