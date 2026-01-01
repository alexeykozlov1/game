export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  animationFrame: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.speed = 5;
    this.color = '#ffffff';
    this.animationFrame = 0;
  }

  moveLeft(): void {
    this.x = Math.max(0, this.x - this.speed);
  }

  moveRight(canvasWidth: number): void {
    this.x = Math.min(canvasWidth - this.width, this.x + this.speed);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.animationFrame += 0.1;
    
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    
    // Draw beluga whale body (white, rounded)
    ctx.save();
    
    // Body gradient
    const bodyGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    bodyGradient.addColorStop(0, '#ffffff');
    bodyGradient.addColorStop(0.5, '#e8f4f8');
    bodyGradient.addColorStop(1, '#d0e8f0');
    ctx.fillStyle = bodyGradient;
    
    // Main body (oval shape)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Beluga head (rounded, slightly larger)
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.15, centerY, this.height * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.2, centerY - this.height * 0.1, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.15, centerY + this.height * 0.1, 8, 0, Math.PI);
    ctx.stroke();
    
    // Tail fin (animated)
    const tailOffset = Math.sin(this.animationFrame) * 3;
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.4, centerY);
    ctx.quadraticCurveTo(
      centerX + this.width * 0.6 + tailOffset, 
      centerY - this.height * 0.3,
      centerX + this.width * 0.5, 
      centerY - this.height * 0.2
    );
    ctx.quadraticCurveTo(
      centerX + this.width * 0.6 + tailOffset, 
      centerY,
      centerX + this.width * 0.4, 
      centerY
    );
    ctx.fill();
    
    // Pectoral fins
    ctx.beginPath();
    ctx.ellipse(centerX - this.width * 0.1, centerY + this.height * 0.2, 8, 15, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + this.width * 0.1, centerY + this.height * 0.2, 8, 15, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#87ceeb';
    ctx.strokeStyle = '#87ceeb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, this.width / 2 + 2, this.height / 2 + 2, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }

  getCenterX(): number {
    return this.x + this.width / 2;
  }
}

