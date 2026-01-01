import { Game } from './Game';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  // Set canvas size
  canvas.width = 800;
  canvas.height = 600;

  const game = new Game(canvas);
  game.start();

  // Restart on R key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
      if (game.gameOver) {
        game.restart();
      }
    }
  });
});
