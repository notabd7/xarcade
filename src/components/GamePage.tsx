import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { GameModule, EmscriptenModule } from '../games/GameInterface';

declare global {
  interface Window {
    Module: EmscriptenModule & GameModule;
  }
}

const GamePage = () => {
  const { gameId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadGame = async () => {
      const script = document.createElement('script');
      script.src = `/games/${gameId}.js`;
      script.async = true;
      
      script.onload = () => {
        const moduleConfig: Partial<EmscriptenModule> = {
          canvas: canvasRef.current!,
          onRuntimeInitialized: () => {
            // Initialize game once WASM is loaded
            window.Module._init_game();
            // Start game loop
            gameLoop();
          }
        };
        
        window.Module = moduleConfig as EmscriptenModule & GameModule;
      };

      document.body.appendChild(script);
    };

    const gameLoop = () => {
      if (window.Module) {
        window.Module._update_game();
        window.Module._draw_game();
        requestAnimationFrame(gameLoop);
      }
    };

    loadGame();

    return () => {
      // Cleanup
      const script = document.querySelector(`script[src="/games/${gameId}.js"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [gameId]);

  return (
    <div className="bg-black p-6 rounded-lg">
      <h2 className="text-2xl mb-6">Game: {gameId}</h2>
      <canvas 
        ref={canvasRef}
        className="w-full aspect-video bg-purple-800"
      />
    </div>
  );
};

export default GamePage;