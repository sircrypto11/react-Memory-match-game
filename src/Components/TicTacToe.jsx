
import { useState } from "react"

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""))
  const [currentPlayer, setCurrentPlayer] = useState("X")

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function checkWinner(squares) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }

    return null
  }

  const winner = checkWinner(board)
  const draw = !winner && board.every((square) => square !== "")

  function handleClick(index) {
    if (board[index] || winner || draw) {
      return
    }

    const updatedBoard = [...board]
    updatedBoard[index] = currentPlayer

    setBoard(updatedBoard)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  function restartGame() {
    setBoard(Array(9).fill(""))
    setCurrentPlayer("X")
  }

  return (
    <section className="min-h-screen bg-gray-200 px-4 py-12">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-2 text-4xl font-bold text-green-700">
          Tic-Tac-Toe
        </h1>

        <p className="mb-6 text-gray-600">
          Get three in a row to win!
        </p>

        <div className="mb-6 rounded-xl bg-white p-4 shadow">
          {winner ? (
            <p className="text-xl font-bold text-green-700">
              🎉 Player {winner} wins!
            </p>
          ) : draw ? (
            <p className="text-xl font-bold text-gray-700">
              It's a draw!
            </p>
          ) : (
            <p className="text-xl font-semibold text-gray-700">
              Current Player:{" "}
              <span className="text-green-700">
                {currentPlayer}
              </span>
            </p>
          )}
        </div>

        <div className="mx-auto grid max-w-sm grid-cols-3 gap-3">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={Boolean(square) || Boolean(winner) || draw}
              className={`aspect-square rounded-xl text-5xl font-bold shadow-md transition ${
                square === "X"
                  ? "bg-green-600 text-white"
                  : square === "O"
                    ? "bg-gray-600 text-white"
                    : "bg-white text-green-700 hover:bg-green-100"
              }`}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="mt-8 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white shadow hover:bg-green-700"
        >
          Restart Game
        </button>
      </div>
    </section>
  )
}

export default TicTacToe
