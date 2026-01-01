export class Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  isPlayerBullet: boolean;

  constructor(x: number, y: number, isPlayerBullet: boolean = true) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 10;
    this.speed = isPlayerBullet ? -7 : 3;
    this.color = isPlayerBullet ? '#00ff00' : '#ff0000';
    this.isPlayerBullet = isPlayerBullet;
  }

  update(): void {
    this.y += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    if (this.isPlayerBullet) {
      // Player bullet - water bubble/stream
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(0.5, '#4682b4');
      gradient.addColorStop(1, '#1e90ff');
      ctx.fillStyle = gradient;
      
      // Glow effect
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#87ceeb';
      
      ctx.beginPath();
      ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Enemy bullet - dark/red energy
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
      gradient.addColorStop(0, '#8b0000');
      gradient.addColorStop(0.5, '#ff0000');
      gradient.addColorStop(1, '#8b0000');
      ctx.fillStyle = gradient;
      
      // Glow effect
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff0000';
      
      ctx.beginPath();
      ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  isOffScreen(canvasHeight: number): boolean {
    return this.y < 0 || this.y > canvasHeight;
  }
}

