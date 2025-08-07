# 🐍 Snake Game

A classic Snake game built with HTML5 Canvas, CSS3, and vanilla JavaScript. Play directly in your browser!

## 🎮 [Play Now!](https://yourusername.github.io/snake-game)

![Snake Game Screenshot](https://via.placeholder.com/600x400/667eea/ffffff?text=Snake+Game+Screenshot)

## ✨ Features

- **Classic Gameplay**: Control the snake to eat food and grow longer
- **Progressive Difficulty**: Game speed increases as your score grows
- **High Score Tracking**: Your best score is saved locally in your browser
- **Responsive Design**: Works on desktop and mobile devices
- **Mobile Controls**: Touch-friendly buttons for mobile gameplay
- **Smooth Animations**: Beautiful gradients and visual effects
- **Collision Detection**: Smart collision system for walls and self-collision

## 🎯 How to Play

1. Click "Start Game" to begin
2. Use **Arrow Keys** or **WASD** to control the snake
3. Eat the red food circles to grow and increase your score
4. Avoid hitting the walls or yourself
5. Try to beat your high score!

### Controls
- **Desktop**: Arrow keys or WASD
- **Mobile**: Touch the directional buttons
- **Space/Enter**: Start game or restart after game over

## 🚀 Getting Started

### Play Online
The game is hosted on GitHub Pages: [yourusername.github.io/snake-game](https://yourusername.github.io/snake-game)

### Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/snake-game.git
   cd snake-game
   ```

2. Open `index.html` in your web browser, or serve it with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
snake-game/
├── index.html          # Main HTML file
├── style.css           # Game styling and responsive design
├── script.js           # Game logic and functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5 Canvas** - For rendering the game graphics
- **CSS3** - For styling and responsive design
- **Vanilla JavaScript** - For game logic and interactivity
- **LocalStorage API** - For saving high scores

## 🎨 Game Features

### Visual Elements
- Gradient backgrounds and smooth color transitions
- Snake head with eyes for better visual feedback
- Glowing food effects with shine highlights
- Screen shake effect on game over
- Responsive design that works on all screen sizes

### Gameplay Mechanics
- Snake grows when eating food
- Progressive speed increase (gets faster as score increases)
- Collision detection for walls and snake body
- Food spawns randomly but never on the snake
- High score persistence across browser sessions

## 🚀 Hosting on GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload the files** (index.html, style.css, script.js, README.md)
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save
4. **Access your game** at `https://yourusername.github.io/repository-name`

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Game Screenshots

*Add screenshots of your game here once hosted*

## 🔧 Customization

You can easily customize the game by modifying:

- **Colors**: Change the color scheme in `style.css`
- **Game Speed**: Modify the `getGameSpeed()` function in `script.js`
- **Grid Size**: Adjust `gridSize` and canvas dimensions
- **Scoring**: Change point values in the score update logic

## 📱 Mobile Support

The game includes touch controls for mobile devices and is fully responsive. The mobile controls automatically appear on smaller screens.

---

Made with ❤️ and JavaScript

**Happy Gaming!** 🐍🎮
