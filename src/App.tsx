import React, { useState } from 'react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import type { GameState } from './types';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1
  });

  const handleScoreUpdate = (points: number): void => {
    setGameState(prevState => ({
      ...prevState,
      score: prevState.score + points
    }));
  };

  const handleLevelComplete = (): void => {
    setGameState(prevState => ({
      ...prevState,
      level: prevState.level + 1
    }));
  };

  return (
    <div className="App">
      <h1 className=' font-bold text-5xl'>Memory Game</h1>
      <ScoreBoard score={gameState.score} level={gameState.level} />
      <Board 
        level={gameState.level} 
        onScoreUpdate={handleScoreUpdate}
        onLevelComplete={handleLevelComplete}
      />
    </div>
  );
};

export default App;
