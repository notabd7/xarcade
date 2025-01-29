import { useEffect, useRef } from 'react';

interface PacmanModule {
  canvas: HTMLCanvasElement;
}

declare global {
  interface Window {
    createPacmanGame: (config: Partial<PacmanModule>) => Promise<PacmanModule>;
  }
}

const PacMan = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const initGame = async () => {
        try {
          console.log('Starting to load Pacman game...');
          
          // Load the game script
          const script = document.createElement('script');
          script.src = '/games/pacman.js';
          script.async = true;
          
          const loadPromise = new Promise((resolve, reject) => {
            script.onload = () => {
              console.log('Script loaded successfully');
              resolve(null);
            };
            script.onerror = (e) => {
              console.error('Script failed to load:', e);
              reject(e);
            };
          });
  
          document.body.appendChild(script);
          await loadPromise;
  
          console.log('createPacmanGame available?', !!window.createPacmanGame);
          console.log('Canvas available?', !!canvasRef.current);
  
          // Initialize the game
          if (window.createPacmanGame && canvasRef.current) {
            console.log('Initializing game module...');
            const module = await window.createPacmanGame({
              canvas: canvasRef.current
            });
            console.log('Game module initialized:', module);
          } else {
            console.error('Missing required dependencies:', {
              createPacmanGame: !!window.createPacmanGame,
              canvas: !!canvasRef.current
            });
          }
        } catch (error) {
          console.error('Error in game initialization:', error);
        }
      };
  
      initGame();
  
      return () => {
        console.log('Cleaning up game...');
        const script = document.querySelector('script[src="/games/pacman.js"]');
        if (script) {
          document.body.removeChild(script);
        }
      };
    }, []);
  
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <canvas 
          ref={canvasRef}
          className="max-w-full max-h-full aspect-video"
          onContextMenu={(e) => e.preventDefault()}
          // Add specific dimensions
          width={800}
          height={600}
        />
      </div>
    );
  };
export default PacMan;