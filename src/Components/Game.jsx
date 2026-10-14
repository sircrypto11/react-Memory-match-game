
import { useState, useEffect } from "react"
import CardGrid from "./CardGrid"
import GameInfo from "./GameInfo"

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍊"]

function createCards() {
  const cards = [...symbols, ...symbols]

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards.map((symbol, index) => ({
    id: index,
    symbol: symbol,
    isFlipped: false,
    isMatched: false,
  }))
}

function Game() {
  const [cards, setCards] = useState(createCards)
  const [selectedCards, setSelectedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const [bestTime, setBestTime] = useState(() => {
    const savedBestTime = localStorage.getItem("bestTime")
    return savedBestTime !== null ? Number(savedBestTime) : null
  })

  const [newBest, setNewBest] = useState(false)

  // Timer
  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setTime((previousTime) => previousTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted])

  function handleClick(card) {
    if (
      card.isFlipped ||
      card.isMatched ||
      selectedCards.length === 2 ||
      gameWon
    ) {
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    const updatedCards = cards.map((item) =>
      item.id === card.id
        ? { ...item, isFlipped: true }
        : item
    )

    setCards(updatedCards)

    const newSelectedCards = [...selectedCards, card]
    setSelectedCards(newSelectedCards)

    if (newSelectedCards.length === 2) {
      setMoves((previousMoves) => previousMoves + 1)

      const firstCard = newSelectedCards[0]
      const secondCard = newSelectedCards[1]

      if (firstCard.symbol === secondCard.symbol) {
        const updatedMatchedCards = updatedCards.map((item) =>
          item.id === firstCard.id || item.id === secondCard.id
            ? { ...item, isFlipped: true, isMatched: true }
            : item
        )

        setCards(updatedMatchedCards)
        setScore((previousScore) => previousScore + 10)
        setSelectedCards([])

        const allMatched = updatedMatchedCards.every(
          (item) => item.isMatched
        )

        if (allMatched) {
          setGameStarted(false)
          setGameWon(true)

          if (bestTime === null || time < bestTime) {
            localStorage.setItem("bestTime", String(time))
            setBestTime(time)
            setNewBest(true)
          }
        }
      } else {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((item) =>
              item.id === firstCard.id || item.id === secondCard.id
                ? { ...item, isFlipped: false }
                : item
            )
          )

          setSelectedCards([])
        }, 1000)
      }
    }
  }

  function restartGame() {
    setCards(createCards())
    setSelectedCards([])
    setMoves(0)
    setScore(0)
    setTime(0)
    setGameStarted(false)
    setGameWon(false)
    setNewBest(false)
  }

  return (
    <section className="min-h-screen bg-gray-200 px-4 py-10">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-2 text-4xl font-bold text-green-700">
          Memory Match
        </h1>

        <p className="mb-6 text-gray-600">
          Find all the matching pairs!
        </p>

        <GameInfo
          moves={moves}
          score={score}
          time={time}
          bestTime={bestTime}
          restartGame={restartGame}
        />

        <CardGrid
          cards={cards}
          handleClick={handleClick}
        />

        {gameWon && (
          <div className="mt-8 rounded-xl bg-green-600 p-6 text-white shadow-lg">
            <h2 className="text-3xl font-bold">
              🎉 You Win!
            </h2>

            <p className="mt-2">
              You matched all the cards!
            </p>

            <div className="mt-4 space-y-1">
              <p>Final Score: {score}</p>
              <p>Moves: {moves}</p>
              <p>Time: {time}s</p>
            </div>

            {newBest && (
              <p className="mt-3 font-bold">
                🏆 New Best Time!
              </p>
            )}

            <button
              onClick={restartGame}
              className="mt-5 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-green-700 hover:bg-gray-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Game
