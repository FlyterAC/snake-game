// Snake Game JavaScript
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.gameOverScreen = document.getElementById('gameOver');
        this.startScreen = document.getElementById('startScreen');
        this.finalScoreElement = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
        this.startBtn = document.getElementById('startBtn');
        this.mobileControls = document.getElementById('mobileControls');
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        this.gameStarted = false;
        
        // Load high score from localStorage
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        this.updateHighScoreDisplay();
        
        this.setupEventListeners();
        this.generateFood();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning && !this.gameStarted) return;
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (this.dy !== 1) {
                        this.dx = 0;
                        this.dy = -1;
                    }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (this.dy !== -1) {
                        this.dx = 0;
                        this.dy = 1;
                    }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (this.dx !== 1) {
                        this.dx = -1;
                        this.dy = 0;
                    }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (this.dx !== -1) {
                        this.dx = 1;
                        this.dy = 0;
                    }
                    break;
                case ' ':
                case 'Enter':
                    if (!this.gameStarted) {
                        this.startGame();
                    } else if (!this.gameRunning) {
                        this.restartGame();
                    }
                    e.preventDefault();
                    break;
            }
        });
        
        // Mobile controls
        const mobileButtons = document.querySelectorAll('.mobile-btn');
        mobileButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.gameRunning && !this.gameStarted) return;
                
                const direction = btn.dataset.direction;
                switch (direction) {
                    case 'up':
                        if (this.dy !== 1) {
                            this.dx = 0;
                            this.dy = -1;
                        }
                        break;
                    case 'down':
                        if (this.dy !== -1) {
                            this.dx = 0;
                            this.dy = 1;
                        }
                        break;
                    case 'left':
                        if (this.dx !== 1) {
                            this.dx = -1;
                            this.dy = 0;
                        }
                        break;
                    case 'right':
                        if (this.dx !== -1) {
                            this.dx = 1;
                            this.dy = 0;
                        }
                        break;
                }
            });
        });
        
        // Button event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }
    
    startGame() {
        this.gameStarted = true;
        this.gameRunning = true;
        this.startScreen.classList.add('hidden');
        this.dx = 1;
        this.dy = 0;
        this.gameLoop();
    }
    
    restartGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 1;
        this.dy = 0;
        this.score = 0;
        this.updateScore();
        this.generateFood();
        this.gameOverScreen.classList.add('hidden');
        this.gameRunning = true;
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        setTimeout(() => {
            this.clearCanvas();
            this.moveSnake();
            this.drawFood();
            this.drawSnake();
            
            if (this.checkCollision()) {
                this.gameOver();
                return;
            }
            
            if (this.checkFoodCollision()) {
                this.score += 10;
                this.updateScore();
                this.generateFood();
            } else {
                this.snake.pop();
            }
            
            this.gameLoop();
        }, this.getGameSpeed());
    }
    
    getGameSpeed() {
        // Speed increases as score grows
        const baseSpeed = 150;
        const speedIncrease = Math.floor(this.score / 50) * 10;
        return Math.max(80, baseSpeed - speedIncrease);
    }
    
    clearCanvas() {
        this.ctx.fillStyle = '#1a202c';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    moveSnake() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        this.snake.unshift(head);
    }
    
    drawSnake() {
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Draw head with gradient
                const gradient = this.ctx.createRadialGradient(
                    segment.x * this.gridSize + this.gridSize / 2,
                    segment.y * this.gridSize + this.gridSize / 2,
                    0,
                    segment.x * this.gridSize + this.gridSize / 2,
                    segment.y * this.gridSize + this.gridSize / 2,
                    this.gridSize / 2
                );
                gradient.addColorStop(0, '#68d391');
                gradient.addColorStop(1, '#38a169');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
                
                // Draw eyes
                this.ctx.fillStyle = '#1a202c';
                const eyeSize = 3;
                const eyeOffset = 4;
                this.ctx.fillRect(segment.x * this.gridSize + eyeOffset, segment.y * this.gridSize + eyeOffset, eyeSize, eyeSize);
                this.ctx.fillRect(segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize, segment.y * this.gridSize + eyeOffset, eyeSize, eyeSize);
            } else {
                // Draw body with gradient
                const gradient = this.ctx.createRadialGradient(
                    segment.x * this.gridSize + this.gridSize / 2,
                    segment.y * this.gridSize + this.gridSize / 2,
                    0,
                    segment.x * this.gridSize + this.gridSize / 2,
                    segment.y * this.gridSize + this.gridSize / 2,
                    this.gridSize / 2
                );
                gradient.addColorStop(0, '#48bb78');
                gradient.addColorStop(1, '#2f855a');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            }
        });
    }
    
    drawFood() {
        // Draw food with glow effect
        const gradient = this.ctx.createRadialGradient(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            0,
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2
        );
        gradient.addColorStop(0, '#fc8181');
        gradient.addColorStop(1, '#e53e3e');
        this.ctx.fillStyle = gradient;
        
        // Draw circular food
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 1,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        
        // Add shine effect
        this.ctx.fillStyle = '#fed7d7';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 3,
            this.food.y * this.gridSize + this.gridSize / 3,
            this.gridSize / 6,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }
    
    generateFood() {
        let foodPosition;
        do {
            foodPosition = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));
        
        this.food = foodPosition;
    }
    
    checkCollision() {
        const head = this.snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    checkFoodCollision() {
        const head = this.snake[0];
        return head.x === this.food.x && head.y === this.food.y;
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.updateHighScoreDisplay();
            localStorage.setItem('snakeHighScore', this.highScore.toString());
        }
    }
    
    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.gameOverScreen.classList.remove('hidden');
        
        // Add screen shake effect
        this.canvas.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.canvas.style.animation = '';
        }, 500);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});

// Prevent scrolling with arrow keys
window.addEventListener('keydown', (e) => {
    if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
