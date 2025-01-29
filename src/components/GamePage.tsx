import { useParams } from 'react-router-dom';
import PacMan from './PacMan';  // Import your PacMan component

const GamePage = () => {
  const { gameId } = useParams();
  
  console.log('GamePage rendered with gameId:', gameId); // Debug log

  const renderGame = () => {
    console.log('renderGame called, gameId is:', gameId); // Debug log
    
    switch(gameId) {
      case 'pacman':
        return <PacMan />;
      default:
        return <div className="text-center text-red-500">Game not found</div>;
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg neon-border">
      <h2 className="text-2xl mb-6 neon-text">Game: {gameId}</h2>
      {renderGame()}
    </div>
  );
};

export default GamePage;