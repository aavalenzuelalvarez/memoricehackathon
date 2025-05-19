import { useEffect, useState } from "react";
import type { GameState, Card as CardType } from "../types";

export const useMemory= ()=>{
  const initialStatus = () =>{
    const localStorageLevel = localStorage.getItem('memoriceLevel')
    const localStorageScore = localStorage.getItem('memoriceScore')
    const localStorageHighScore = localStorage.getItem('memoriceHighScore')
    return localStorageLevel&&localStorageScore&&localStorageHighScore?
    {score:JSON.parse(localStorageScore),
      level:JSON.parse(localStorageLevel), 
      highScore:JSON.parse(localStorageHighScore)
    }:
    {score:0,level:1,highScore:0}
  }
  const [gameState, setGameState] = useState<GameState>(initialStatus);

  const handleScoreUpdate = (points: number): void => {
    setGameState(prevState => ({
      ...prevState,
      score: prevState.score + points
    }));
    localStorage.setItem('memoriceScore',JSON.stringify(gameState.score+points))
    if(gameState.score+points>gameState.highScore){
      setGameState(prevState =>({...prevState,highScore:gameState.score+points}))
      localStorage.setItem('memoriceHighScore',JSON.stringify(gameState.score+points))
    }
  };

  const handleLevelComplete = (): void => {
    setGameState(prevState => ({
      ...prevState,
      level: prevState.level + 1
    }));
    localStorage.setItem('memoriceLevel',JSON.stringify(gameState.level+1))
  };

  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const generateCards = (): void => {
      const cardPairs: number = gameState.level + 1;
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
  }, [gameState.level]);

  //Validates if you win the game based on pairs matched and level
  useEffect(() => {
    if (matchedPairs.length-1 === gameState.level) {
      
      console.log('Pasaste el nivel: ' + gameState.level)
      setTimeout(()=>{
        setMatchedPairs([])
        document.querySelector('.board')?.classList.add("pointer-events-none")
      },1000)
      
      setTimeout(()=>{
        handleLevelComplete();
        document.querySelector('.board')?.classList.remove("pointer-events-none")
      },2000)
    }
  }, [matchedPairs, gameState.level]);

  const handleRestartClick = ()=>{
    localStorage.setItem('memoriceScore',JSON.stringify(0))
    localStorage.setItem('memoriceLevel',JSON.stringify(1))
    setGameState(prevState=>({...prevState,score:0,level:1}))
  }

  const handleCardClick = (card: CardType): void => {
    if (flippedCards.length === 1) {
      setDisabled(true);
      const newFlippedCards = [...flippedCards, card];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards[0].content === card.content) {
        setMatchedPairs([...matchedPairs, card.content]);
        setFlippedCards([]);
        handleScoreUpdate(10);
      } else {
        document.querySelector('.board')?.classList.add("pointer-events-none")
        setTimeout(() => {
          setFlippedCards([]);
          handleScoreUpdate(-5);
          document.querySelector('.board')?.classList.remove("pointer-events-none")
        }, 1000);
      }
      setDisabled(false);
    } else {
      setFlippedCards([card]);
    }
  };

  return{gameState, cards, disabled, handleCardClick, flippedCards, matchedPairs, handleRestartClick}
}
