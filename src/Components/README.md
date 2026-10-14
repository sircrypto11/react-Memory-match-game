# Memory Match: An Interactive Card Matching Game

## 1. Project Overview

Memory Match is an interactive memory card game developed using React. The game challenges players to find matching pairs of cards by flipping two cards at a time. It provides a fun way to improve memory, concentration, and observation skills.

The application tracks the player's score, number of moves, and playing time. It also saves the player's best completion time using the browser's localStorage.

## 2. Problem Statement

Many digital games focus mainly on entertainment without providing simple ways to challenge memory and concentration. This project aims to develop an interactive memory game that allows users to test their memory while tracking their progress.

## 3. Project Objective

To develop an interactive memory card game using React that allows users to match identical cards while tracking their score, moves, and playing time.

## 4. Project Features

1. Card matching: Players flip two cards at a time to find matching pairs.
2. Card shuffling: Cards are randomly arranged at the beginning of each game.
3. Score tracking: Players earn points for correctly matched pairs.
4. Move counter: Tracks the number of attempts made.
5. Timer: Tracks the time taken to complete the game.
6. Best time: Saves the best completion time using localStorage.
7. Restart functionality: Allows players to start a new game.
8. Winning message: Displays a message when all pairs are matched.
9. Responsive design: Uses Tailwind CSS to style the interface for different screen sizes.

## 5. Technologies Used

1. React: Builds the user interface and manages game state.
2. JavaScript: Implements game logic and event handling.
3. Tailwind CSS: Styles the application.
4. HTML: Provides the page structure.
5. Vite: Runs the development server and builds the application.
6. localStorage: Saves the best completion time in the browser.

## 6. Project Structure

1. `App.jsx`: Imports and displays the main game component.
2. `main.jsx`: Renders the React application.
3. `index.css`: Imports Tailwind CSS.
4. `Game.jsx`: Manages game state, card selection, scoring, moves, and timer.
5. `Card.jsx`: Displays an individual card.
6. `CardGrid.jsx`: Displays the collection of cards.
7. `GameInfo.jsx`: Displays the score, moves, time, best time, and restart button.
8. `WinMessage.jsx`: Displays the winning message and final results.
9. `gameData.js`: Stores card symbols and creates and shuffles cards.

## 7. How to Run the Project

1. Install Node.js on your computer.
2. Open the project folder in your code editor.
3. Open the terminal in the project directory.
4. Run `npm install` to install the dependencies.
5. Run `npm run dev` to start the development server.
6. Open the local URL displayed in the terminal in your browser.

## 8. Expected Outcome

The completed application allows users to play a memory matching game, improve their concentration, track their performance, and attempt to beat their previous best completion time.

## 9. Conclusion

Memory Match demonstrates the practical application of React components, state management, event handling, conditional rendering, JavaScript functions, and Tailwind CSS in developing an interactive web application.