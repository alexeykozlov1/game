import { Player } from './Player';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  enemies: Enemy[];
  playerBullets: Bullet[];
  enemyBullets: Bullet[];
  keys: { [key: string]: boolean };
  score: number;
  gameOver: boolean;
  enemyDirection: number;
  enemyMoveTimer: number;
  enemyShootTimer: number;
  lastTime: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2d context');
    }
    this.ctx = context;
    
    this.player = new Player(canvas.width / 2 - 40, canvas.height - 60);
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.keys = {};
    this.score = 0;
    this.gameOver = false;
    this.enemyDirection = 1;
    this.enemyMoveTimer = 0;
    this.enemyShootTimer = 0;
    this.lastTime = 0;

    this.initEnemies();
    this.setupEventListeners();
  }

  initEnemies(): void {
    this.enemies = [];
    const rows = 5;
    const cols = 10;
    const spacing = 60;
    const startX = 50;
    const startY = 50;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.enemies.push(
          new Enemy(
            startX + col * spacing,
            startY + row * spacing,
            row
          )
        );
      }
    }
  }

  setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      if (e.key === ' ') {
        e.preventDefault();
        this.shootPlayerBullet();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  shootPlayerBullet(): void {
    if (this.playerBullets.length < 3) {
      this.playerBullets.push(
        new Bullet(this.player.getCenterX() - 1.5, this.player.y, true)
      );
    }
  }

  shootEnemyBullet(): void {
    const aliveEnemies = this.enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return;

    const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    this.enemyBullets.push(
      new Bullet(randomEnemy.getCenterX() - 1.5, randomEnemy.y + randomEnemy.height, false)
    );
  }

  update(deltaTime: number): void {
    if (this.gameOver) return;

    // Player movement
    if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
      this.player.moveLeft();
    }
    if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
      this.player.moveRight(this.canvas.width);
    }

    // Update bullets
    this.playerBullets.forEach(bullet => bullet.update());
    this.enemyBullets.forEach(bullet => bullet.update());

    // Remove off-screen bullets
    this.playerBullets = this.playerBullets.filter(
      bullet => !bullet.isOffScreen(this.canvas.height)
    );
    this.enemyBullets = this.enemyBullets.filter(
      bullet => !bullet.isOffScreen(this.canvas.height)
    );

    // Enemy movement
    this.enemyMoveTimer += deltaTime;
    if (this.enemyMoveTimer > 500) {
      this.enemyMoveTimer = 0;
      let shouldMoveDown = false;
      
      const aliveEnemies = this.enemies.filter(e => e.alive);
      for (const enemy of aliveEnemies) {
        if (
          (this.enemyDirection > 0 && enemy.x + enemy.width >= this.canvas.width - 10) ||
          (this.enemyDirection < 0 && enemy.x <= 10)
        ) {
          shouldMoveDown = true;
          break;
        }
      }

      if (shouldMoveDown) {
        this.enemyDirection *= -1;
        aliveEnemies.forEach(enemy => enemy.move(0, true));
      } else {
        aliveEnemies.forEach(enemy => enemy.move(this.enemyDirection * 5));
      }
    }

    // Enemy shooting
    this.enemyShootTimer += deltaTime;
    if (this.enemyShootTimer > 1000 && this.enemyBullets.length < 5) {
      this.enemyShootTimer = 0;
      this.shootEnemyBullet();
    }

    // Collision detection: player bullets vs enemies
    this.playerBullets.forEach((bullet, bulletIndex) => {
      this.enemies.forEach((enemy, enemyIndex) => {
        if (
          enemy.alive &&
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          enemy.alive = false;
          this.playerBullets.splice(bulletIndex, 1);
          this.score += enemy.points;
        }
      });
    });

    // Collision detection: enemy bullets vs player
    this.enemyBullets.forEach((bullet, bulletIndex) => {
      if (
        bullet.x < this.player.x + this.player.width &&
        bullet.x + bullet.width > this.player.x &&
        bullet.y < this.player.y + this.player.height &&
        bullet.y + bullet.height > this.player.y
      ) {
        this.gameOver = true;
      }
    });

    // Check if enemies reached player
    const aliveEnemies = this.enemies.filter(e => e.alive);
    for (const enemy of aliveEnemies) {
      if (enemy.y + enemy.height >= this.player.y) {
        this.gameOver = true;
        break;
      }
    }

    // Check win condition
    if (aliveEnemies.length === 0) {
      this.initEnemies();
      this.score += 100;
    }
  }

  draw(): void {
    // Draw oceanic background
    this.drawOceanBackground();

    if (this.gameOver) {
      // Semi-transparent overlay
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 3;
      this.ctx.strokeText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
      
      this.ctx.font = '24px Arial';
      this.ctx.strokeText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
      this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
      
      this.ctx.strokeText('Press R to restart', this.canvas.width / 2, this.canvas.height / 2 + 100);
      this.ctx.fillText('Press R to restart', this.canvas.width / 2, this.canvas.height / 2 + 100);
      return;
    }

    // Draw player
    this.player.draw(this.ctx);

    // Draw enemies
    this.enemies.forEach(enemy => enemy.draw(this.ctx));

    // Draw bullets
    this.playerBullets.forEach(bullet => bullet.draw(this.ctx));
    this.enemyBullets.forEach(bullet => bullet.draw(this.ctx));

    // Draw score with better styling
    this.ctx.save();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(`Score: ${this.score}`, 15, 35);
    this.ctx.fillText(`Score: ${this.score}`, 15, 35);
    this.ctx.restore();
  }

  private drawOceanBackground(): void {
    // Deep ocean gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.3, '#003366');
    gradient.addColorStop(0.6, '#004488');
    gradient.addColorStop(1, '#001a33');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Animated bubbles
    const time = performance.now() * 0.001;
    for (let i = 0; i < 20; i++) {
      const x = (i * 47 + time * 10) % this.canvas.width;
      const y = (i * 73 + time * 20) % this.canvas.height;
      const size = 2 + Math.sin(time + i) * 1;
      
      this.ctx.save();
      this.ctx.globalAlpha = 0.3;
      this.ctx.fillStyle = '#87ceeb';
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Light rays from top
    this.ctx.save();
    this.ctx.globalAlpha = 0.1;
    for (let i = 0; i < 5; i++) {
      const x = (i * this.canvas.width / 4) + Math.sin(time + i) * 20;
      const gradient = this.ctx.createLinearGradient(x, 0, x, this.canvas.height);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x - 30, 0, 60, this.canvas.height);
    }
    this.ctx.restore();
  }

  restart(): void {
    this.player = new Player(this.canvas.width / 2 - 40, this.canvas.height - 60);
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.score = 0;
    this.gameOver = false;
    this.enemyDirection = 1;
    this.enemyMoveTimer = 0;
    this.enemyShootTimer = 0;
    this.initEnemies();
  }

  gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  start(): void {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
}

