import Card from './Card';
import '../styles/ScoreBoard.css';
import type { Card as CardType } from '../types';
import { useEffect } from 'react';

interface BoardProps {
  level:number
  cards: CardType[]
  disabled: boolean
  handleCardClick: (card: CardType) => void
  flippedCards: CardType[]
  matchedPairs: string[]
}

const Board: React.FC<BoardProps> = ({ cards, level, handleCardClick, disabled, flippedCards, matchedPairs }) => {

  useEffect(()=>{
    const backgroundGlass = document.querySelector('.glassBoard') as HTMLElement
    if(level%2==0){
      backgroundGlass.style.height=`${130+((level*110)/2)}px`
    }
    if(level%2==1){
      backgroundGlass.style.height=`${130+(((level-1)*110)/2)}px`
    }
    console.log(backgroundGlass.style.height)
  },[level])

  return (
    <div className=' max-w-2xl m-auto md:max-w-3xl'>
      <div className="board z-10 relative">
        {cards.map((card) => (
          level <= 10 ? (
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
        ):null))}
        {level<=10?
        <div className='glass-card md:w-3xl w-[90dvw] -z-1 absolute glassBoard'></div>:
        <div className='md:w-3xl w-[90dvw] -z-1 absolute glassBoard'></div>
        }
        
      </div>
    </div>
  );
};

export default Board;