export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  points: number;
  alive: boolean;
  row: number;
  animationFrame: number;

  constructor(x: number, y: number, row: number) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 35;
    this.alive = true;
    this.row = row;
    this.animationFrame = Math.random() * Math.PI * 2;
    
    // Different points based on row (top rows worth more)
    if (row === 0) {
      this.points = 30;
    } else if (row === 1 || row === 2) {
      this.points = 20;
    } else {
      this.points = 10;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.alive) return;
    
    this.animationFrame += 0.05;
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    
    ctx.save();
    
    // Killer whale body (black and white)
    // Main body (black, torpedo shape)
    const bodyGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    bodyGradient.addColorStop(0, '#1a1a1a');
    bodyGradient.addColorStop(0.5, '#000000');
    bodyGradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = bodyGradient;
    
    // Body shape (more aggressive, streamlined)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // White belly patch
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + this.height * 0.15, this.width * 0.4, this.height * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // White eye patch
    ctx.beginPath();
    ctx.ellipse(centerX - this.width * 0.15, centerY - this.height * 0.1, this.width * 0.15, this.height * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye (red, menacing)
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.15, centerY - this.height * 0.1, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Dorsal fin (tall, aggressive)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.2, centerY - this.height * 0.3);
    ctx.lineTo(centerX + this.width * 0.35, centerY - this.height * 0.6);
    ctx.lineTo(centerX + this.width * 0.25, centerY - this.height * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Tail fin (animated, aggressive)
    const tailOffset = Math.sin(this.animationFrame) * 2;
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.4, centerY);
    ctx.quadraticCurveTo(
      centerX + this.width * 0.6 + tailOffset, 
      centerY - this.height * 0.4,
      centerX + this.width * 0.5, 
      centerY - this.height * 0.3
    );
    ctx.quadraticCurveTo(
      centerX + this.width * 0.6 + tailOffset, 
      centerY + this.height * 0.4,
      centerX + this.width * 0.4, 
      centerY + this.height * 0.2
    );
    ctx.closePath();
    ctx.fill();
    
    // Pectoral fins (sharp, aggressive)
    ctx.beginPath();
    ctx.moveTo(centerX - this.width * 0.1, centerY + this.height * 0.15);
    ctx.lineTo(centerX - this.width * 0.25, centerY + this.height * 0.4);
    ctx.lineTo(centerX - this.width * 0.15, centerY + this.height * 0.3);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.1, centerY + this.height * 0.15);
    ctx.lineTo(centerX + this.width * 0.25, centerY + this.height * 0.4);
    ctx.lineTo(centerX + this.width * 0.15, centerY + this.height * 0.3);
    ctx.closePath();
    ctx.fill();
    
    // Glow effect (red, menacing)
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff3333';
    ctx.strokeStyle = '#ff3333';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, this.width / 2 + 1, this.height / 2 + 1, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }

  move(direction: number, down: boolean = false): void {
    if (down) {
      this.y += 20;
    } else {
      this.x += direction;
    }
  }

  getCenterX(): number {
    return this.x + this.width / 2;
  }

  getCenterY(): number {
    return this.y + this.height / 2;
  }
}

