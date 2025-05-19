import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import './App.css';
import Modal from './components/Modal';
import {useMemory} from './hooks/useMemory'

const App: React.FC = () => {
  const {gameState, cards, disabled, handleCardClick, flippedCards, matchedPairs, handleRestartClick} = useMemory()
  

  return (
    <div className="App">
      <div className="background">
        <div className="pattern"></div>
        <div className="gradient-overlay"></div>
        <div className="light-effect light1"></div>
        <div className="light-effect light2"></div>
    </div>
    
      {gameState.level>10&&(
        <Modal
          score={gameState.score}
          highScore={gameState.highScore}
          handleRestartClick={handleRestartClick}
        />
      )}
      <h1 className=' font-bold text-5xl glass-card max-w-3xl m-auto'>Memory Game</h1>
      <ScoreBoard 
        score={gameState.score}
        level={gameState.level} 
        highScore={gameState.highScore}
        handleRestartClick={handleRestartClick}/>
      <Board 
        level = {gameState.level}
        cards = {cards}
        disabled = {disabled}
        handleCardClick = {handleCardClick}
        flippedCards = {flippedCards}
        matchedPairs = {matchedPairs}
      />
    </div>
  );
};

export default App;
