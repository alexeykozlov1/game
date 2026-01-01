// Snow Maiden vs Squirrels - Bundled version
class Bullet {
  constructor(x, y, isPlayerBullet = true) {
    this.x = x;
    this.y = y;
    // Enemy bullets (nuts) are twice as big
    this.width = isPlayerBullet ? 8 : 16;
    this.height = isPlayerBullet ? 8 : 16;
    this.speed = isPlayerBullet ? -7 : 3;
    this.color = isPlayerBullet ? '#00ff00' : '#ff0000';
    this.isPlayerBullet = isPlayerBullet;
    this.rotation = 0;
    this.rotationSpeed = isPlayerBullet ? 0.2 : 0.1;
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;
  }

  draw(ctx) {
    ctx.save();
    if (this.isPlayerBullet) {
      // Snowflake - beautiful, detailed snowflake
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.rotation);
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      
      // Draw snowflake pattern (6-pointed star)
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        
        // Main arm
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -this.width / 2);
        ctx.stroke();
        
        // Side branches
        ctx.beginPath();
        ctx.moveTo(-this.width * 0.15, -this.width * 0.25);
        ctx.lineTo(this.width * 0.15, -this.width * 0.25);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-this.width * 0.1, -this.width * 0.4);
        ctx.lineTo(this.width * 0.1, -this.width * 0.4);
        ctx.stroke();
        
        // Center circle
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      
      ctx.shadowBlur = 0;
    } else {
      // Enemy bullet - realistic acorn/walnut
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.rotation * 0.3);
      
      // Acorn cap (top part - darker brown)
      const capGradient = ctx.createLinearGradient(0, -this.height * 0.5, 0, -this.height * 0.2);
      capGradient.addColorStop(0, '#5d4037');
      capGradient.addColorStop(0.5, '#6d4c41');
      capGradient.addColorStop(1, '#8b4513');
      ctx.fillStyle = capGradient;
      
      // Draw acorn cap (rounded top)
      ctx.beginPath();
      ctx.arc(0, -this.height * 0.35, this.width * 0.35, Math.PI, 0, false);
      ctx.lineTo(this.width * 0.35, -this.height * 0.1);
      ctx.lineTo(-this.width * 0.35, -this.height * 0.1);
      ctx.closePath();
      ctx.fill();
      
      // Cap texture lines
      ctx.strokeStyle = '#3d2817';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-this.width * 0.3, -this.height * 0.25);
      ctx.lineTo(this.width * 0.3, -this.height * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-this.width * 0.25, -this.height * 0.3);
      ctx.lineTo(this.width * 0.25, -this.height * 0.3);
      ctx.stroke();
      
      // Nut body - brown gradient (main part)
      const nutGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width * 0.5);
      nutGradient.addColorStop(0, '#d2691e');
      nutGradient.addColorStop(0.3, '#8b4513');
      nutGradient.addColorStop(0.7, '#654321');
      nutGradient.addColorStop(1, '#3d2817');
      ctx.fillStyle = nutGradient;
      
      // Draw nut body (rounded bottom, slightly oval)
      ctx.beginPath();
      ctx.ellipse(0, this.height * 0.1, this.width * 0.45, this.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Nut highlight (shiny spot)
      ctx.fillStyle = 'rgba(210, 105, 30, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-this.width * 0.15, -this.height * 0.1, this.width * 0.2, this.height * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Nut texture - vertical lines (like walnut shell)
      ctx.strokeStyle = '#5d4037';
      ctx.lineWidth = 1.5;
      // Left texture line
      ctx.beginPath();
      ctx.moveTo(-this.width * 0.25, -this.height * 0.1);
      ctx.quadraticCurveTo(-this.width * 0.3, this.height * 0.1, -this.width * 0.2, this.height * 0.3);
      ctx.stroke();
      // Right texture line
      ctx.beginPath();
      ctx.moveTo(this.width * 0.25, -this.height * 0.1);
      ctx.quadraticCurveTo(this.width * 0.3, this.height * 0.1, this.width * 0.2, this.height * 0.3);
      ctx.stroke();
      // Center texture line
      ctx.beginPath();
      ctx.moveTo(0, -this.height * 0.15);
      ctx.quadraticCurveTo(0, this.height * 0.1, 0, this.height * 0.35);
      ctx.stroke();
      
      // Bottom tip (darker)
      ctx.fillStyle = '#3d2817';
      ctx.beginPath();
      ctx.arc(0, this.height * 0.4, this.width * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
    ctx.restore();
  }

  isOffScreen(canvasHeight) {
    return this.y < 0 || this.y > canvasHeight;
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 70;
    this.speed = 5;
    this.color = '#ffffff';
    this.animationFrame = 0;
    this.walkCycle = 0;
    this.isThrowing = false;
    this.throwFrame = 0;
    this.facingDirection = 1; // 1 for right, -1 for left
    
    // Load image of extracted girl (background removed)
    this.image = new Image();
    this.imageLoaded = false;
    this.imageError = false;
    
    // Load the extracted snow girl image (background removed)
    const imageFiles = [
      'girl-extracted.png', // PRIMARY: Extracted snow girl with transparent background
      'girl.png', // Fallback alternative name
      'snowgirl.png' // Fallback alternative name
    ];
    let imageIndex = 0;
    
    const tryLoadImage = () => {
      if (imageIndex < imageFiles.length) {
        this.image.onload = () => {
          this.imageLoaded = true;
          this.imageError = false;
          // Auto-adjust size based on image dimensions to maintain aspect ratio
          if (this.image.width && this.image.height) {
            const aspectRatio = this.image.width / this.image.height;
            // Keep height at 70, adjust width proportionally
            this.width = this.height * aspectRatio;
          }
          console.log('Player image loaded:', imageFiles[imageIndex]);
        };
        this.image.onerror = () => {
          imageIndex++;
          if (imageIndex >= imageFiles.length) {
            this.imageError = true;
            console.error('Failed to load any player image');
          } else {
            tryLoadImage();
          }
        };
        this.image.src = imageFiles[imageIndex];
      } else {
        this.imageError = true;
      }
    };
    
    tryLoadImage();
  }

  moveLeft() {
    this.x = Math.max(0, this.x - this.speed);
    this.facingDirection = -1;
    this.walkCycle += 0.3;
  }

  moveRight(canvasWidth) {
    this.x = Math.min(canvasWidth - this.width, this.x + this.speed);
    this.facingDirection = 1;
    this.walkCycle += 0.3;
  }

  startThrowing() {
    this.isThrowing = true;
    this.throwFrame = 0;
  }

  draw(ctx) {
    this.animationFrame += 0.15;
    if (this.isThrowing) {
      this.throwFrame += 0.2;
      if (this.throwFrame > 1) {
        this.isThrowing = false;
        this.throwFrame = 0;
      }
    }
    
    ctx.save();
    
    // Walking animation - subtle bobbing
    const walkBob = Math.sin(this.walkCycle) * 2;
    const drawY = this.y + walkBob;
    
    // Draw the extracted girl image if loaded (with transparent background)
    if (this.imageLoaded && this.image.complete && this.image.naturalWidth > 0) {
      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Soft glow effect around the image
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#87ceeb';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw the extracted image (PNG with transparency will show through)
      // The image should have transparent background already removed
      ctx.drawImage(this.image, this.x, drawY, this.width, this.height);
      
      ctx.shadowBlur = 0;
      
      // Add blur effect to top-left and top-right corners using gradient masks
      const cornerSize = Math.min(this.width, this.height) * 0.35; // 35% of smaller dimension
      const blurIntensity = 0.5; // Blur intensity (0-1)
      
      // Create clipping regions for corners and apply blur effect
      // Top-left corner
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.x, drawY);
      ctx.lineTo(this.x + cornerSize, drawY);
      ctx.lineTo(this.x, drawY + cornerSize);
      ctx.closePath();
      ctx.clip();
      
      // Create radial gradient for top-left corner blur
      const topLeftGradient = ctx.createRadialGradient(
        this.x, drawY,
        0,
        this.x, drawY,
        cornerSize
      );
      topLeftGradient.addColorStop(0, `rgba(0, 0, 0, ${blurIntensity})`);
      topLeftGradient.addColorStop(0.4, `rgba(0, 0, 0, ${blurIntensity * 0.6})`);
      topLeftGradient.addColorStop(0.7, `rgba(0, 0, 0, ${blurIntensity * 0.3})`);
      topLeftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = topLeftGradient;
      ctx.fillRect(this.x, drawY, cornerSize, cornerSize);
      ctx.restore();
      
      // Top-right corner
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.x + this.width, drawY);
      ctx.lineTo(this.x + this.width - cornerSize, drawY);
      ctx.lineTo(this.x + this.width, drawY + cornerSize);
      ctx.closePath();
      ctx.clip();
      
      // Create radial gradient for top-right corner blur
      const topRightGradient = ctx.createRadialGradient(
        this.x + this.width, drawY,
        0,
        this.x + this.width, drawY,
        cornerSize
      );
      topRightGradient.addColorStop(0, `rgba(0, 0, 0, ${blurIntensity})`);
      topRightGradient.addColorStop(0.4, `rgba(0, 0, 0, ${blurIntensity * 0.6})`);
      topRightGradient.addColorStop(0.7, `rgba(0, 0, 0, ${blurIntensity * 0.3})`);
      topRightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = topRightGradient;
      ctx.fillRect(this.x + this.width - cornerSize, drawY, cornerSize, cornerSize);
      ctx.restore();
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    } else if (this.imageError) {
      // Error state: image not found
      ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
      ctx.fillRect(this.x, drawY, this.width, this.height);
      ctx.strokeStyle = '#87ceeb';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, drawY, this.width, this.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Image not found', this.x + this.width / 2, drawY + this.height / 2 - 15);
      ctx.font = '12px Arial';
      ctx.fillText('1. Extract girl from background', this.x + this.width / 2, drawY + this.height / 2);
      ctx.fillText('2. Save as PNG (transparent)', this.x + this.width / 2, drawY + this.height / 2 + 15);
      ctx.fillText('3. Name it: girl.png', this.x + this.width / 2, drawY + this.height / 2 + 30);
      ctx.fillText('4. Place in project folder', this.x + this.width / 2, drawY + this.height / 2 + 45);
    } else {
      // Loading state
      ctx.fillStyle = 'rgba(135, 206, 235, 0.2)';
      ctx.fillRect(this.x, drawY, this.width, this.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Loading image...', this.x + this.width / 2, drawY + this.height / 2);
    }
    
    ctx.restore();
  }

  getCenterX() {
    return this.x + this.width / 2;
  }
  
  getHandPosition() {
    // Return position for snowflake origin - from upper part of image (where hands would be)
    const centerX = this.x + this.width / 2;
    const walkBob = Math.sin(this.walkCycle) * 2;
    const throwArmLift = this.isThrowing ? Math.sin(this.throwFrame * Math.PI) * 20 : 0;
    
    // Position snowflakes from upper body area of the image
    return {
      x: centerX + (this.facingDirection > 0 ? 10 : -10),
      y: this.y + walkBob + this.height * 0.3 - throwArmLift
    };
  }
}

class Enemy {
  constructor(x, y, row) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 35;
    this.alive = true;
    this.row = row;
    this.animationFrame = Math.random() * Math.PI * 2;
    this.isThrowing = false;
    this.throwFrame = 0;
    
    // Different points based on row (top rows worth more)
    if (row === 0) {
      this.points = 30;
    } else if (row === 1 || row === 2) {
      this.points = 20;
    } else {
      this.points = 10;
    }
  }

  startThrowing() {
    this.isThrowing = true;
    this.throwFrame = 0;
  }

  draw(ctx) {
    if (!this.alive) return;
    
    this.animationFrame += 0.05;
    
    // Update throwing animation
    if (this.isThrowing) {
      this.throwFrame += 0.15;
      if (this.throwFrame > 1) {
        this.isThrowing = false;
        this.throwFrame = 0;
      }
    }
    
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    
    ctx.save();
    
    // Red squirrel colors matching the image - reddish-brown body, lighter belly, vibrant tail
    const bodyColor = '#8b4513'; // Reddish-brown
    const bellyColor = '#f5deb3'; // Creamy white/beige
    const tailColor = '#cd5c5c'; // Vibrant reddish-orange
    const tailTipColor = '#ffffff'; // White tip
    
    // Throwing animation - arm lift
    const throwArmLift = this.isThrowing ? Math.sin(this.throwFrame * Math.PI) * 15 : 0;
    const throwArmAngle = this.isThrowing ? Math.sin(this.throwFrame * Math.PI) * 0.5 : 0;
    
    // Squirrel body - main oval shape (reddish-brown)
    const bodyGradient = ctx.createRadialGradient(
      centerX - this.width * 0.1, centerY - this.height * 0.1,
      0,
      centerX, centerY,
      this.width / 2
    );
    bodyGradient.addColorStop(0, bodyColor);
    bodyGradient.addColorStop(0.5, '#654321');
    bodyGradient.addColorStop(1, '#5d4037');
    ctx.fillStyle = bodyGradient;
    
    // Body shape (oval)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, this.width * 0.45, this.height * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Belly (creamy white/beige - lighter color)
    const bellyGradient = ctx.createLinearGradient(
      centerX, centerY + this.height * 0.05,
      centerX, centerY + this.height * 0.35
    );
    bellyGradient.addColorStop(0, bellyColor);
    bellyGradient.addColorStop(0.7, '#f0e68c');
    bellyGradient.addColorStop(1, bodyColor);
    ctx.fillStyle = bellyGradient;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + this.height * 0.15, this.width * 0.4, this.height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (slightly larger circle, reddish-brown)
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY - this.height * 0.1, this.width * 0.25, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears (pointed, reddish-brown with lighter tufts)
    ctx.fillStyle = bodyColor;
    // Left ear
    ctx.beginPath();
    ctx.moveTo(centerX - this.width * 0.15, centerY - this.height * 0.2);
    ctx.lineTo(centerX - this.width * 0.25, centerY - this.height * 0.35);
    ctx.lineTo(centerX - this.width * 0.1, centerY - this.height * 0.25);
    ctx.closePath();
    ctx.fill();
    // Right ear
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.15, centerY - this.height * 0.2);
    ctx.lineTo(centerX + this.width * 0.25, centerY - this.height * 0.35);
    ctx.lineTo(centerX + this.width * 0.1, centerY - this.height * 0.25);
    ctx.closePath();
    ctx.fill();
    
    // Eyes (large, round, black with white highlights)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.12, centerY - this.height * 0.08, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + this.width * 0.12, centerY - this.height * 0.08, 3, 0, Math.PI * 2);
    ctx.fill();
    // Eye highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.11, centerY - this.height * 0.09, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + this.width * 0.13, centerY - this.height * 0.09, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose (small, dark)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY + this.height * 0.02, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Fluffy bushy tail (vibrant reddish-orange, very prominent, curved upward)
    const tailOffset = Math.sin(this.animationFrame) * 3;
    const tailGradient = ctx.createLinearGradient(
      centerX + this.width * 0.35, centerY - this.height * 0.2,
      centerX + this.width * 0.7, centerY - this.height * 0.5
    );
    tailGradient.addColorStop(0, tailColor);
    tailGradient.addColorStop(0.8, '#ff6347');
    tailGradient.addColorStop(1, tailTipColor);
    ctx.fillStyle = tailGradient;
    
    // Draw bushy tail (larger, more prominent)
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.3, centerY - this.height * 0.1);
    ctx.quadraticCurveTo(
      centerX + this.width * 0.7 + tailOffset, 
      centerY - this.height * 0.5,
      centerX + this.width * 0.55, 
      centerY - this.height * 0.4
    );
    ctx.quadraticCurveTo(
      centerX + this.width * 0.75 + tailOffset, 
      centerY - this.height * 0.6,
      centerX + this.width * 0.5, 
      centerY - this.height * 0.3
    );
    ctx.quadraticCurveTo(
      centerX + this.width * 0.65 + tailOffset, 
      centerY - this.height * 0.1,
      centerX + this.width * 0.4, 
      centerY
    );
    ctx.closePath();
    ctx.fill();
    
    // Tail tip (white)
    ctx.fillStyle = tailTipColor;
    ctx.beginPath();
    ctx.arc(centerX + this.width * 0.6 + tailOffset, centerY - this.height * 0.5, this.width * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Front paws/hands (for throwing animation)
    ctx.fillStyle = '#000000';
    // Left paw (throwing arm - animated)
    ctx.save();
    ctx.translate(centerX - this.width * 0.15, centerY + this.height * 0.1);
    ctx.rotate(throwArmAngle);
    ctx.beginPath();
    ctx.ellipse(0, throwArmLift, this.width * 0.08, this.height * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Right paw (resting)
    ctx.beginPath();
    ctx.ellipse(centerX + this.width * 0.15, centerY + this.height * 0.15, this.width * 0.08, this.height * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Back paws
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.2, centerY + this.height * 0.25, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + this.width * 0.1, centerY + this.height * 0.25, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  move(direction, down = false) {
    if (down) {
      this.y += 20;
    } else {
      this.x += direction;
    }
  }

  getCenterX() {
    return this.x + this.width / 2;
  }

  getCenterY() {
    return this.y + this.height / 2;
  }
}

class Snowball {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 12;
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 8;
    
    // Calculate direction to target
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.velocityX = (dx / distance) * this.speed;
    this.velocityY = (dy / distance) * this.speed;
    
    this.hit = false;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  checkCollision(enemy) {
    if (!enemy.alive || this.hit) return false;
    return (
      this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y
    );
  }

  isOffScreen(canvasWidth, canvasHeight) {
    return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;
  }

  draw(ctx) {
    ctx.save();
    
    // Snowball - white with gradient
    const gradient = ctx.createRadialGradient(
      this.x + this.width / 2, this.y + this.height / 2,
      0,
      this.x + this.width / 2, this.y + this.height / 2,
      this.width / 2
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.7, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x + this.width * 0.3, this.y + this.height * 0.3, this.width * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class Snowman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 35; // Smaller than snow girl (50)
    this.height = 50; // Smaller than snow girl (70)
    this.animationFrame = 0;
    this.lifeTime = 0;
    this.maxLifeTime = 5000; // 5 seconds on screen to allow time for throwing
    this.targets = []; // List of 5 closest squirrels to target
    this.currentTargetIndex = 0;
    this.throwTimer = 0;
    this.throwInterval = 300; // Throw a snowball every 300ms
    this.snowballs = [];
  }

  update(deltaTime) {
    this.animationFrame += 0.1;
    this.lifeTime += deltaTime;
    this.throwTimer += deltaTime;
    
    // Throw snowballs one by one
    if (this.targets.length > 0 && 
        this.currentTargetIndex < this.targets.length && 
        this.throwTimer >= this.throwInterval) {
      this.throwSnowball();
      this.throwTimer = 0;
      this.currentTargetIndex++;
    }
    
    // Update snowballs
    this.snowballs.forEach(snowball => snowball.update());
  }

  setTargets(enemies) {
    if (this.targets.length > 0) return; // Already set
    
    const aliveEnemies = enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return;

    // Calculate distance to each squirrel
    const snowmanCenterX = this.x + this.width / 2;
    const snowmanCenterY = this.y + this.height / 2;
    
    const enemiesWithDistance = aliveEnemies.map(enemy => {
      const enemyCenterX = enemy.x + enemy.width / 2;
      const enemyCenterY = enemy.y + enemy.height / 2;
      const distance = Math.sqrt(
        Math.pow(enemyCenterX - snowmanCenterX, 2) + 
        Math.pow(enemyCenterY - snowmanCenterY, 2)
      );
      return { enemy, distance, centerX: enemyCenterX, centerY: enemyCenterY };
    });

    // Sort by distance (closest first)
    enemiesWithDistance.sort((a, b) => a.distance - b.distance);

    // Get the 5 closest (or all if less than 5)
    const targetCount = Math.min(5, enemiesWithDistance.length);
    this.targets = enemiesWithDistance.slice(0, targetCount);
  }

  throwSnowball() {
    if (this.currentTargetIndex >= this.targets.length) return;
    
    const target = this.targets[this.currentTargetIndex];
    const startX = this.x + this.width / 2;
    const startY = this.y + this.height * 0.3; // From upper part of snowman
    
    this.snowballs.push(new Snowball(startX, startY, target.centerX, target.centerY));
  }

  isExpired() {
    return this.lifeTime >= this.maxLifeTime && this.snowballs.length === 0;
  }

  draw(ctx) {
    ctx.save();
    
    const centerX = this.x + this.width / 2;
    const bottomY = this.y + this.height;
    
    // Animated pulsing effect
    const pulse = Math.sin(this.animationFrame) * 2;
    
    // Bottom snowball (largest) - scaled down
    const bottomGradient = ctx.createRadialGradient(
      centerX, bottomY - this.height * 0.3,
      0,
      centerX, bottomY - this.height * 0.3,
      this.width * 0.4
    );
    bottomGradient.addColorStop(0, '#ffffff');
    bottomGradient.addColorStop(0.7, '#f0f0f0');
    bottomGradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = bottomGradient;
    ctx.beginPath();
    ctx.arc(centerX, bottomY - this.height * 0.3, this.width * 0.35 + pulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Middle snowball - scaled down
    const middleGradient = ctx.createRadialGradient(
      centerX, bottomY - this.height * 0.65,
      0,
      centerX, bottomY - this.height * 0.65,
      this.width * 0.3
    );
    middleGradient.addColorStop(0, '#ffffff');
    middleGradient.addColorStop(0.7, '#f0f0f0');
    middleGradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = middleGradient;
    ctx.beginPath();
    ctx.arc(centerX, bottomY - this.height * 0.65, this.width * 0.25 + pulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Top snowball (head) - scaled down
    const headGradient = ctx.createRadialGradient(
      centerX, bottomY - this.height * 0.9,
      0,
      centerX, bottomY - this.height * 0.9,
      this.width * 0.25
    );
    headGradient.addColorStop(0, '#ffffff');
    headGradient.addColorStop(0.7, '#f0f0f0');
    headGradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(centerX, bottomY - this.height * 0.9, this.width * 0.2 + pulse * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes - smaller
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - this.width * 0.08, bottomY - this.height * 0.92, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + this.width * 0.08, bottomY - this.height * 0.92, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose (carrot - orange) - smaller
    ctx.fillStyle = '#ff9800';
    ctx.beginPath();
    ctx.moveTo(centerX, bottomY - this.height * 0.88);
    ctx.lineTo(centerX + this.width * 0.1, bottomY - this.height * 0.85);
    ctx.lineTo(centerX, bottomY - this.height * 0.84);
    ctx.closePath();
    ctx.fill();
    
    // Mouth (coal buttons) - smaller
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.05 + i * this.width * 0.05, bottomY - this.height * 0.86, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Buttons on middle snowball - smaller
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, bottomY - this.height * 0.7 + i * this.height * 0.08, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Arms (branches) - smaller
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 3;
    // Left arm
    ctx.beginPath();
    ctx.moveTo(centerX - this.width * 0.25, bottomY - this.height * 0.65);
    ctx.lineTo(centerX - this.width * 0.4, bottomY - this.height * 0.5);
    ctx.stroke();
    // Right arm
    ctx.beginPath();
    ctx.moveTo(centerX + this.width * 0.25, bottomY - this.height * 0.65);
    ctx.lineTo(centerX + this.width * 0.4, bottomY - this.height * 0.5);
    ctx.stroke();
    
    // Hat (optional - top hat) - smaller
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX - this.width * 0.18, bottomY - this.height, this.width * 0.36, this.height * 0.08);
    ctx.fillRect(centerX - this.width * 0.13, bottomY - this.height * 0.95, this.width * 0.26, this.height * 0.04);
    
    // Draw snowballs
    this.snowballs.forEach(snowball => snowball.draw(ctx));
    
    ctx.restore();
  }
}

class Bird {
  constructor(x, y, direction, type = 'red') {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 28;
    this.direction = direction; // 1 for right, -1 for left
    this.speed = 4;
    this.animationFrame = 0;
    this.wingFlapSpeed = 0.4;
    this.type = type; // 'red' for cardinal, 'green' for green bird
  }

  update() {
    this.x += this.speed * this.direction;
    this.animationFrame += this.wingFlapSpeed;
  }

  isOffScreen(canvasWidth) {
    if (this.direction > 0) {
      return this.x > canvasWidth;
    } else {
      return this.x + this.width < 0;
    }
  }

  // Check collision with enemy (squirrel)
  checkCollision(enemy) {
    if (!enemy.alive) return false;
    return (
      this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y
    );
  }

  draw(ctx) {
    ctx.save();
    
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    
    // Flip bird horizontally based on direction (bird faces left by default, flip when going right)
    if (this.direction > 0) {
      ctx.scale(-1, 1);
      ctx.translate(-this.x * 2 - this.width, 0);
    }
    
    // Wing animation (flapping)
    const wingAngle = Math.sin(this.animationFrame) * 0.5;
    
    if (this.type === 'red') {
      // RED CARDINAL BIRD
      // Cardinal body - bright red
      const bodyGradient = ctx.createRadialGradient(
        centerX, centerY,
        0,
        centerX, centerY,
        this.width / 2
      );
      bodyGradient.addColorStop(0, '#ff1744'); // Bright red
      bodyGradient.addColorStop(0.4, '#d32f2f');
      bodyGradient.addColorStop(0.8, '#b71c1c');
      bodyGradient.addColorStop(1, '#8b0000');
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, this.width * 0.4, this.height * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Cardinal head - distinctive crest and red head
      // Crest (pointed top)
      ctx.fillStyle = '#c62828';
      ctx.beginPath();
      ctx.moveTo(centerX - this.width * 0.15, centerY - this.height * 0.3);
      ctx.lineTo(centerX - this.width * 0.1, centerY - this.height * 0.45);
      ctx.lineTo(centerX - this.width * 0.05, centerY - this.height * 0.35);
      ctx.lineTo(centerX, centerY - this.height * 0.4);
      ctx.lineTo(centerX - this.width * 0.05, centerY - this.height * 0.3);
      ctx.closePath();
      ctx.fill();
      
      // Head (round, red)
      const headGradient = ctx.createRadialGradient(
        centerX - this.width * 0.1, centerY - this.height * 0.15,
        0,
        centerX - this.width * 0.1, centerY - this.height * 0.15,
        this.width * 0.3
      );
      headGradient.addColorStop(0, '#ff5252');
      headGradient.addColorStop(0.5, '#d32f2f');
      headGradient.addColorStop(1, '#b71c1c');
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.1, centerY - this.height * 0.15, this.width * 0.28, 0, Math.PI * 2);
      ctx.fill();
      
      // Black mask around eyes (cardinal characteristic)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.12, centerY - this.height * 0.12, this.width * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye (white with black pupil)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.12, centerY - this.height * 0.12, this.width * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.11, centerY - this.height * 0.13, this.width * 0.05, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak (orange-red, cone-shaped, cardinal style)
      ctx.fillStyle = '#ff6f00';
      ctx.beginPath();
      ctx.moveTo(centerX - this.width * 0.3, centerY - this.height * 0.08);
      ctx.lineTo(centerX - this.width * 0.4, centerY - this.height * 0.12);
      ctx.lineTo(centerX - this.width * 0.4, centerY - this.height * 0.04);
      ctx.closePath();
      ctx.fill();
      
      // Wings (red, darker, animated flapping)
      ctx.fillStyle = '#b71c1c';
      ctx.save();
      ctx.translate(centerX + this.width * 0.15, centerY);
      ctx.rotate(wingAngle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.width * 0.35, this.height * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wing highlight
      ctx.fillStyle = '#d32f2f';
      ctx.beginPath();
      ctx.ellipse(0, -this.height * 0.1, this.width * 0.2, this.height * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Back wing (underneath)
      ctx.save();
      ctx.translate(centerX + this.width * 0.1, centerY + this.height * 0.05);
      ctx.rotate(-wingAngle * 0.7);
      ctx.fillStyle = '#8b0000';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.width * 0.28, this.height * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Back/tail (red, darker)
      ctx.fillStyle = '#8b0000';
      ctx.beginPath();
      ctx.ellipse(centerX + this.width * 0.2, centerY, this.width * 0.3, this.height * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Tail feathers (darker red)
      ctx.fillStyle = '#5a0000';
      ctx.beginPath();
      ctx.moveTo(centerX + this.width * 0.35, centerY);
      ctx.lineTo(centerX + this.width * 0.5, centerY - this.height * 0.15);
      ctx.lineTo(centerX + this.width * 0.5, centerY + this.height * 0.15);
      ctx.closePath();
      ctx.fill();
    } else {
      // GREEN BIRD
      // Green body
      const bodyGradient = ctx.createRadialGradient(
        centerX, centerY,
        0,
        centerX, centerY,
        this.width / 2
      );
      bodyGradient.addColorStop(0, '#4caf50'); // Bright green
      bodyGradient.addColorStop(0.4, '#388e3c');
      bodyGradient.addColorStop(0.8, '#2e7d32');
      bodyGradient.addColorStop(1, '#1b5e20');
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, this.width * 0.4, this.height * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Head (round, green)
      const headGradient = ctx.createRadialGradient(
        centerX - this.width * 0.1, centerY - this.height * 0.15,
        0,
        centerX - this.width * 0.1, centerY - this.height * 0.15,
        this.width * 0.3
      );
      headGradient.addColorStop(0, '#66bb6a');
      headGradient.addColorStop(0.5, '#4caf50');
      headGradient.addColorStop(1, '#388e3c');
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.1, centerY - this.height * 0.15, this.width * 0.28, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye (white with black pupil)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.12, centerY - this.height * 0.12, this.width * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX - this.width * 0.11, centerY - this.height * 0.13, this.width * 0.05, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak (yellow/orange)
      ctx.fillStyle = '#ffa726';
      ctx.beginPath();
      ctx.moveTo(centerX - this.width * 0.3, centerY - this.height * 0.08);
      ctx.lineTo(centerX - this.width * 0.4, centerY - this.height * 0.12);
      ctx.lineTo(centerX - this.width * 0.4, centerY - this.height * 0.04);
      ctx.closePath();
      ctx.fill();
      
      // Wings (green, darker, animated flapping)
      ctx.fillStyle = '#2e7d32';
      ctx.save();
      ctx.translate(centerX + this.width * 0.15, centerY);
      ctx.rotate(wingAngle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.width * 0.35, this.height * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wing highlight
      ctx.fillStyle = '#4caf50';
      ctx.beginPath();
      ctx.ellipse(0, -this.height * 0.1, this.width * 0.2, this.height * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Back wing (underneath)
      ctx.save();
      ctx.translate(centerX + this.width * 0.1, centerY + this.height * 0.05);
      ctx.rotate(-wingAngle * 0.7);
      ctx.fillStyle = '#1b5e20';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.width * 0.28, this.height * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Back/tail (green, darker)
      ctx.fillStyle = '#1b5e20';
      ctx.beginPath();
      ctx.ellipse(centerX + this.width * 0.2, centerY, this.width * 0.3, this.height * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Tail feathers (darker green)
      ctx.fillStyle = '#0d4f1a';
      ctx.beginPath();
      ctx.moveTo(centerX + this.width * 0.35, centerY);
      ctx.lineTo(centerX + this.width * 0.5, centerY - this.height * 0.15);
      ctx.lineTo(centerX + this.width * 0.5, centerY + this.height * 0.15);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2d context');
    }
    this.ctx = context;
    
    // Load background image
    this.backgroundImage = new Image();
    this.backgroundImageLoaded = false;
    this.backgroundImageError = false;
    
    // Load background image
    this.backgroundImage.onload = () => {
      this.backgroundImageLoaded = true;
      this.backgroundImageError = false;
      console.log('Background image loaded successfully');
    };
    this.backgroundImage.onerror = () => {
      this.backgroundImageError = true;
      console.error('Failed to load background.png');
    };
    this.backgroundImage.src = 'background.png';
    
    this.player = new Player(canvas.width / 2 - 25, canvas.height - 80);
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.redBird = null;
    this.greenBird = null;
    this.snowman = null;
    this.keys = {};
    this.score = 0;
    this.gameOver = false;
    this.enemyDirection = 1;
    this.enemyMoveTimer = 0;
    this.enemyShootTimer = 0;
    this.redBirdTimer = 0;
    this.greenBirdTimer = 0;
    this.snowmanTimer = 0;
    this.redBirdSpawnInterval = 10000; // 10 seconds in milliseconds
    this.greenBirdSpawnInterval = 15000; // 15 seconds in milliseconds
    this.snowmanSpawnInterval = 30000; // 30 seconds in milliseconds
    this.lastTime = 0;

    this.initEnemies();
    this.setupEventListeners();
  }

  initEnemies() {
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

  setupEventListeners() {
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

  shootPlayerBullet() {
    if (this.playerBullets.length < 3) {
      // Start throwing animation
      this.player.startThrowing();
      
      // Get hand position for snowflake origin
      const handPos = this.player.getHandPosition();
      
      // Create snowflake from hand position
      this.playerBullets.push(
        new Bullet(handPos.x - 4, handPos.y - 4, true)
      );
    }
  }

  shootEnemyBullet() {
    const aliveEnemies = this.enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return;

    const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    
    // Start throwing animation
    randomEnemy.startThrowing();
    
    // Get hand position for nut origin (from throwing paw)
    const centerX = randomEnemy.x + randomEnemy.width / 2;
    const centerY = randomEnemy.y + randomEnemy.height / 2;
    const throwArmLift = Math.sin(0.5 * Math.PI) * 15; // Initial throw position
    const handX = centerX - randomEnemy.width * 0.15;
    const handY = centerY + randomEnemy.height * 0.1 + throwArmLift;
    
    this.enemyBullets.push(
      new Bullet(handX - 2, handY - 2, false)
    );
  }

  update(deltaTime) {
    if (this.gameOver) return;

    // Red bird spawning and movement (destroys squirrels, doesn't move them back)
    this.redBirdTimer += deltaTime;
    if (this.redBirdTimer >= this.redBirdSpawnInterval && !this.redBird && !this.greenBird) {
      // Only spawn red bird if green bird is not flying
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startY = 80 + Math.random() * 100; // Random height
      const startX = direction > 0 ? -50 : this.canvas.width + 50;
      this.redBird = new Bird(startX, startY, direction, 'red');
      this.redBirdTimer = 0;
    }
    
    // Update red bird
    if (this.redBird) {
      this.redBird.update();
      
      // Check collision with squirrels
      this.enemies.forEach((enemy, enemyIndex) => {
        if (enemy.alive && this.redBird.checkCollision(enemy)) {
          // Red bird destroys the squirrel
          enemy.alive = false;
          // Add points to score for snow girl's effort
          this.score += enemy.points;
        }
      });
      
      // Check if red bird completed flight (NO movement of squirrels)
      if (this.redBird.isOffScreen(this.canvas.width)) {
        this.redBird = null;
      }
    }
    
    // Green bird spawning and movement (moves squirrels back)
    this.greenBirdTimer += deltaTime;
    if (this.greenBirdTimer >= this.greenBirdSpawnInterval && !this.greenBird && !this.redBird) {
      // Only spawn green bird if red bird is not flying
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startY = 80 + Math.random() * 100; // Random height
      const startX = direction > 0 ? -50 : this.canvas.width + 50;
      this.greenBird = new Bird(startX, startY, direction, 'green');
      this.greenBirdTimer = 0;
    }
    
    // Update green bird
    if (this.greenBird) {
      this.greenBird.update();
      
      // Check if green bird completed flight (move squirrels back and up)
      if (this.greenBird.isOffScreen(this.canvas.width)) {
        // Move squirrels back (opposite of current direction) and up (toward top)
        const aliveEnemies = this.enemies.filter(e => e.alive);
        aliveEnemies.forEach(enemy => {
          // Move back (opposite of current direction)
          enemy.x -= this.enemyDirection * 20;
          // Move up (toward top of screen - decrease y)
          enemy.y -= 15;
        });
        
        this.greenBird = null;
      }
    }

    // Snowman spawning and action
    this.snowmanTimer += deltaTime;
    if (this.snowmanTimer >= this.snowmanSpawnInterval && !this.snowman) {
      // Spawn snowman at the bottom center
      const snowmanX = this.canvas.width / 2 - 17.5; // Center minus half width (35/2)
      const snowmanY = this.canvas.height - 100; // Near bottom
      this.snowman = new Snowman(snowmanX, snowmanY);
      // Set targets for snowman
      this.snowman.setTargets(this.enemies);
      this.snowmanTimer = 0;
    }
    
    // Update snowman
    if (this.snowman) {
      this.snowman.update(deltaTime);
      
      // Check snowball collisions with squirrels
      this.snowman.snowballs = this.snowman.snowballs.filter(snowball => {
        // Check collision with each enemy
        for (const enemy of this.enemies) {
          if (enemy.alive && snowball.checkCollision(enemy)) {
            // Snowball hit squirrel
            enemy.alive = false;
            snowball.hit = true;
            // Add points to score
            this.score += enemy.points;
            return false; // Remove this snowball
          }
        }
        
        // Remove snowball if it went off screen
        if (snowball.isOffScreen(this.canvas.width, this.canvas.height)) {
          return false; // Remove this snowball
        }
        
        return true; // Keep this snowball
      });
      
      // Remove snowman after it expires and all snowballs are gone
      if (this.snowman.isExpired()) {
        this.snowman = null;
      }
    }

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

  drawOceanBackground() {
    // Draw static background image
    if (this.backgroundImageLoaded && this.backgroundImage.complete && this.backgroundImage.naturalWidth > 0) {
      // Enable image smoothing for better quality
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
      
      // Draw the background image to fill the entire canvas
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    } else if (this.backgroundImageError) {
      // Error state: image failed to load
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Background image not found', this.canvas.width / 2, this.canvas.height / 2 - 20);
      this.ctx.font = '12px Arial';
      this.ctx.fillText('File: Screenshot 2026-01-01 at 3.44.43 AM.png', this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.fillText('Please ensure the file is in the project folder', this.canvas.width / 2, this.canvas.height / 2 + 20);
    } else {
      // Loading state
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Loading background...', this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  drawChristmasTree(x, y, size, hasLights = false) {
    this.ctx.save();
    
    // Tree trunk (small, dark brown)
    this.ctx.fillStyle = '#654321';
    this.ctx.fillRect(x - size * 0.08, y, size * 0.16, size * 0.12);
    
    // Tree layers (dark green, snow-dusted)
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      const layerSize = size * (1 - i * 0.25);
      const layerY = y - i * size * 0.25;
      
      // Dark green base
      this.ctx.fillStyle = '#0d4f1a';
      this.ctx.beginPath();
      this.ctx.moveTo(x, layerY);
      this.ctx.lineTo(x - layerSize * 0.5, layerY - layerSize * 0.6);
      this.ctx.lineTo(x + layerSize * 0.5, layerY - layerSize * 0.6);
      this.ctx.closePath();
      this.ctx.fill();
      
      // Snow-dusted effect on branches (white patches)
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.moveTo(x, layerY - layerSize * 0.1);
      this.ctx.lineTo(x - layerSize * 0.35, layerY - layerSize * 0.45);
      this.ctx.lineTo(x + layerSize * 0.35, layerY - layerSize * 0.45);
      this.ctx.closePath();
      this.ctx.fill();
      
      // Additional snow patches
      this.ctx.beginPath();
      this.ctx.arc(x - layerSize * 0.2, layerY - layerSize * 0.3, 4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(x + layerSize * 0.2, layerY - layerSize * 0.35, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // String lights (fairy lights) if specified
    if (hasLights) {
      this.ctx.fillStyle = '#ffeb3b';
      for (let i = 0; i < 4; i++) {
        const lightY = y - size * 0.3 - i * size * 0.15;
        const lightX = x - size * 0.2 + i * size * 0.1;
        this.ctx.beginPath();
        this.ctx.arc(lightX, lightY, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    
    this.ctx.restore();
  }

  drawGingerbreadHouse(x, y, width, height, isMain = false) {
    this.ctx.save();
    
    // Gingerbread house base (light brown)
    this.ctx.fillStyle = '#d4a574';
    this.ctx.fillRect(x, y, width, height);
    
    // White icing outline around house
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(x, y, width, height);
    
    // Roof (steep A-frame with white icing)
    this.ctx.fillStyle = '#d4a574';
    this.ctx.beginPath();
    this.ctx.moveTo(x - width * 0.1, y);
    this.ctx.lineTo(x + width / 2, y - height * 0.5);
    this.ctx.lineTo(x + width + width * 0.1, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    // White icing on roof edges (thick)
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(x - width * 0.1, y);
    this.ctx.lineTo(x + width / 2, y - height * 0.5);
    this.ctx.lineTo(x + width + width * 0.1, y);
    this.ctx.stroke();
    
    // Snow on roof (white icing effect)
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width / 2, y - height * 0.45);
    this.ctx.lineTo(x + width, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Windows with white icing frames and warm glow
    const windowCount = isMain ? 3 : 2;
    for (let i = 0; i < windowCount; i++) {
      const winX = x + width * 0.15 + i * width * 0.3;
      const winY = y + height * 0.25;
      const winW = width * 0.2;
      const winH = height * 0.25;
      
      // Warm glow from window
      const glowGradient = this.ctx.createRadialGradient(
        winX + winW / 2, winY + winH / 2,
        0,
        winX + winW / 2, winY + winH / 2,
        winW
      );
      glowGradient.addColorStop(0, 'rgba(255, 255, 200, 0.6)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      this.ctx.fillStyle = glowGradient;
      this.ctx.fillRect(winX - 5, winY - 5, winW + 10, winH + 10);
      
      // Window (warm yellow light)
      this.ctx.fillStyle = '#ffeb3b';
      this.ctx.fillRect(winX, winY, winW, winH);
      
      // White icing window frame
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(winX, winY, winW, winH);
      
      // Cross-pane details
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(winX + winW / 2, winY);
      this.ctx.lineTo(winX + winW / 2, winY + winH);
      this.ctx.moveTo(winX, winY + winH / 2);
      this.ctx.lineTo(winX + winW, winY + winH / 2);
      this.ctx.stroke();
    }
    
    // Front door with white icing frame
    const doorX = x + width * 0.55;
    const doorY = y + height * 0.4;
    const doorW = width * 0.2;
    const doorH = height * 0.5;
    
    this.ctx.fillStyle = '#8b4513';
    this.ctx.fillRect(doorX, doorY, doorW, doorH);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(doorX, doorY, doorW, doorH);
    
    // Decorative white icing patterns (snowflakes/swirls)
    this.ctx.fillStyle = '#ffffff';
    // Small dots/patterns on walls
    for (let i = 0; i < 6; i++) {
      const dotX = x + width * 0.1 + (i % 3) * width * 0.3;
      const dotY = y + height * 0.1 + Math.floor(i / 3) * height * 0.3;
      this.ctx.beginPath();
      this.ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Side extension for main house
    if (isMain) {
      const extX = x + width * 0.7;
      const extY = y + height * 0.2;
      const extW = width * 0.4;
      const extH = height * 0.6;
      
      this.ctx.fillStyle = '#d4a574';
      this.ctx.fillRect(extX, extY, extW, extH);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(extX, extY, extW, extH);
      
      // Roof for extension
      this.ctx.fillStyle = '#d4a574';
      this.ctx.beginPath();
      this.ctx.moveTo(extX - extW * 0.1, extY);
      this.ctx.lineTo(extX + extW / 2, extY - extH * 0.4);
      this.ctx.lineTo(extX + extW + extW * 0.1, extY);
      this.ctx.closePath();
      this.ctx.fill();
      
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(extX - extW * 0.1, extY);
      this.ctx.lineTo(extX + extW / 2, extY - extH * 0.4);
      this.ctx.lineTo(extX + extW + extW * 0.1, extY);
      this.ctx.stroke();
      
      // Snow on extension roof
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.moveTo(extX, extY);
      this.ctx.lineTo(extX + extW / 2, extY - extH * 0.35);
      this.ctx.lineTo(extX + extW, extY);
      this.ctx.closePath();
      this.ctx.fill();
      
      // Window on extension
      const extWinX = extX + extW * 0.2;
      const extWinY = extY + extH * 0.2;
      const extWinW = extW * 0.25;
      const extWinH = extH * 0.2;
      
      // Glow
      const extGlowGradient = this.ctx.createRadialGradient(
        extWinX + extWinW / 2, extWinY + extWinH / 2,
        0,
        extWinX + extWinW / 2, extWinY + extWinH / 2,
        extWinW
      );
      extGlowGradient.addColorStop(0, 'rgba(255, 255, 200, 0.6)');
      extGlowGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      this.ctx.fillStyle = extGlowGradient;
      this.ctx.fillRect(extWinX - 3, extWinY - 3, extWinW + 6, extWinH + 6);
      
      this.ctx.fillStyle = '#ffeb3b';
      this.ctx.fillRect(extWinX, extWinY, extWinW, extWinH);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(extWinX, extWinY, extWinW, extWinH);
    }
    
    this.ctx.restore();
  }

  draw() {
    // Draw winter village background
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

    // Draw birds
    if (this.redBird) {
      this.redBird.draw(this.ctx);
    }
    if (this.greenBird) {
      this.greenBird.draw(this.ctx);
    }

    // Draw snowman
    if (this.snowman) {
      this.snowman.draw(this.ctx);
    }

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

  restart() {
    this.player = new Player(this.canvas.width / 2 - 25, this.canvas.height - 80);
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.redBird = null;
    this.greenBird = null;
    this.snowman = null;
    this.redBirdTimer = 0;
    this.greenBirdTimer = 0;
    this.snowmanTimer = 0;
    this.score = 0;
    this.gameOver = false;
    this.enemyDirection = 1;
    this.enemyMoveTimer = 0;
    this.enemyShootTimer = 0;
    this.initEnemies();
  }

  gameLoop(currentTime) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  start() {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
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


