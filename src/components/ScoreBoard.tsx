import React from 'react';
import '../styles/ScoreBoard.css';

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level }) => {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
      <div className="level">Level: {level}</div>
    </div>
  );
};

export default ScoreBoard;