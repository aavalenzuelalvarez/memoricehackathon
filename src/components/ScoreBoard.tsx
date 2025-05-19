import React from 'react';
import '../styles/ScoreBoard.css';

interface ScoreBoardProps {
  score: number;
  level: number;
  highScore:number;
  handleRestartClick:() => void
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, highScore, handleRestartClick }) => {
  return (
    level>10?<p></p>:
    <div className="flex justify-center flex-col m-auto max-w-3xl glass-card">
      <div className="">Level: {level}</div>
      <div className="justify-around flex flex-row"><p className='font-bold'>Score: {score}</p> <p className='font-bold'>High Score: {highScore}</p></div>
      {level>1?<button className='border
      w-[200px]
      m-auto 
      bg-cyan-200 
      hover:cursor-pointer
      hover:shadow-md
      hover:w-[250px]
      shadow-cyan-200
      transition-all
      z-10
      glass-button
      ' onClick={()=>handleRestartClick()}>RESTART!</button>:<p></p>}
      
    </div>
  );
};

export default ScoreBoard;