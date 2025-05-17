import React, { useEffect } from 'react';
import type { Card as CardType} from '../types';
import '../styles/Card.css';

interface CardProps {
  card: CardType;
  handleClick: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
  level:number;
}



const Card: React.FC<CardProps> = ({ card, handleClick, flipped, disabled, level }) => {
  useEffect(()=>{
    const allChildren = document.querySelectorAll('.board > *')
    allChildren.forEach(child =>{
      if(child instanceof HTMLElement){
        child.style.gridColumn = ''
      }
    })
    const cardChild = document.querySelector(`.board > :nth-child(${(level*2)+1})`) as HTMLElement
    if(level%2==0 && cardChild){
      cardChild.style.gridColumn='2/3'
    }
  },[level])

  return (
    <div
      className={`card ${flipped ? 'flipped pointer-events-none' : ''}`}
      onClick={() => !disabled && handleClick(card)}
    >
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">{card.content}</div>
      </div>
    </div>
  );
};

export default Card;