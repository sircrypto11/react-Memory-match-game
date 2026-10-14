
import { useState } from "react"

function RockPaper() {
  const [playerChoice, setPlayerChoice] = useState("")
  const [computerChoice, setComputerChoice] = useState("")
  const [result, setResult] = useState("Choose your move!")
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)

  function playGame(choice) {
    const choices = ["Rock", "Paper", "Scissors"]
    const computer = choices[Math.floor(Math.random() * 3)]

    setPlayerChoice(choice)
    setComputerChoice(computer)

    if (choice === computer) {
      setResult("It's a draw!")
    } else if (
      (choice === "Rock" && computer === "Scissors") ||
      (choice === "Paper" && computer === "Rock") ||
      (choice === "Scissors" && computer === "Paper")
    ) {
      setResult("You win! 🎉")
      setPlayerScore((score) => score + 1)
    } else {
      setResult("Computer wins! 🤖")
      setComputerScore((score) => score + 1)
    }
  }

  function resetGame() {
    setPlayerChoice("")
    setComputerChoice("")
    setResult("Choose your move!")
    setPlayerScore(0)
    setComputerScore(0)
  }

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-12 text-center">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          Rock Paper Scissors
        </h1>

        <p className="mb-6 text-gray-600">
          Challenge the computer!
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-green-100 p-4">
            <p className="text-gray-700">Your Score</p>
            <p className="text-3xl font-bold text-green-700">
              {playerScore}
            </p>
          </div>

          <div className="rounded-xl bg-gray-200 p-4">
            <p className="text-gray-700">Computer Score</p>
            <p className="text-3xl font-bold text-gray-800">
              {computerScore}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-gray-50 p-5">
          <p className="mb-3 text-xl font-semibold text-gray-800">
            {result}
          </p>

          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <p>You: {playerChoice || "—"}</p>
            <p>Computer: {computerChoice || "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => playGame("Rock")}
            className="rounded-xl bg-green-600 p-3 font-semibold text-white hover:bg-green-700"
          >
            <span className="block text-3xl">✊</span>
            Rock
          </button>

          <button
            onClick={() => playGame("Paper")}
            className="rounded-xl bg-green-600 p-3 font-semibold text-white hover:bg-green-700"
          >
            <span className="block text-3xl">✋</span>
            Paper
          </button>

          <button
            onClick={() => playGame("Scissors")}
            className="rounded-xl bg-green-600 p-3 font-semibold text-white hover:bg-green-700"
          >
            <span className="block text-3xl">✌️</span>
            Scissors
          </button>
        </div>

        <button
          onClick={resetGame}
          className="mt-6 w-full rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-900"
        >
          Reset Game
        </button>
      </div>
    </section>
  )
}

export default RockPaper
