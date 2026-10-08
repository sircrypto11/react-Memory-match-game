import { useState, useEffect } from "react"
import CardGrid from "./Components/CardGrid"
import GameInfo from "./Components/GameInfo"

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍊"]

function createCards() {
  const cards = [...symbols, ...symbols]

  // Shuffle cards
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

function App() {
  const [cards, setCards] = useState(createCards)
  const [selectedCards, setSelectedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Get best time from localStorage
  const [bestTime, setBestTime] = useState(() => {
    const savedBestTime = localStorage.getItem("bestTime")

    if (savedBestTime) {
      return Number(savedBestTime)
    }

    return null
  })

  // Timer
  useEffect(() => {
    if (!gameStarted) {
      return
    }

    const timer = setInterval(() => {
      setTime((previousTime) => previousTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted])

  function handleClick(card) {
    // Do nothing if card is already flipped or matched
    if (card.isFlipped || card.isMatched) {
      return
    }

    // Do not allow more than two cards
    if (selectedCards.length === 2) {
      return
    }

    // Start timer
    if (!gameStarted) {
      setGameStarted(true)
    }

    // Flip card
    const updatedCards = cards.map((item) =>
      item.id === card.id
        ? {
            ...item,
            isFlipped: true,
          }
        : item
    )

    setCards(updatedCards)

    const newSelectedCards = [...selectedCards, card]

    setSelectedCards(newSelectedCards)

    // Check two cards
    if (newSelectedCards.length === 2) {
      setMoves((previousMoves) => previousMoves + 1)

      const firstCard = newSelectedCards[0]
      const secondCard = newSelectedCards[1]

      // Cards match
      if (firstCard.symbol === secondCard.symbol) {
        const updatedMatchedCards = updatedCards.map((item) =>
          item.id === firstCard.id || item.id === secondCard.id
            ? {
                ...item,
                isFlipped: true,
                isMatched: true,
              }
            : item
        )

        setCards(updatedMatchedCards)

        setScore((previousScore) => previousScore + 10)

        setSelectedCards([])

        // Check if all cards are matched
        const allMatched = updatedMatchedCards.every(
          (item) => item.isMatched
        )

        if (allMatched) {
          setGameStarted(false)

          // Save best time
          if (bestTime === null || time < bestTime) {
            localStorage.setItem("bestTime", time)
            setBestTime(time)
          }
        }
      } else {
        // Cards do not match
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((item) =>
              item.id === firstCard.id ||
              item.id === secondCard.id
                ? {
                    ...item,
                    isFlipped: false,
                  }
                : item
            )
          )

          setSelectedCards([])
        }, 1000)
      }
    }
  }

  function restartGame() {
    // Create new shuffled cards
    setCards(createCards())

    // Reset game
    setSelectedCards([])
    setMoves(0)
    setScore(0)
    setTime(0)
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-10">

      <div className="mx-auto max-w-xl text-center">

        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold text-green-700">
          Memory Match
        </h1>

        <p className="mb-6 text-gray-600">
          Find all the matching pairs!
        </p>

        {/* Game Information */}
        <GameInfo
          moves={moves}
          score={score}
          time={time}
          bestTime={bestTime}
          restartGame={restartGame}
        />

        {/* Cards */}
        <CardGrid
          cards={cards}
          handleClick={handleClick}
        />

        {/* Winning Message */}
        {score === 60 && (
          <div className="mt-8 rounded-xl bg-green-600 p-6 text-white shadow-lg">

            <h2 className="text-3xl font-bold">
              🎉 You Win!
            </h2>

            <p className="mt-2">
              You matched all the cards!
            </p>

            <div className="mt-4 space-y-1">
              <p>
                Final Score: {score}
              </p>

              <p>
                Moves: {moves}
              </p>

              <p>
                Time: {time}s
              </p>
            </div>

            {/* New Best Time */}
            {time === bestTime && (
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
    </div>
  )
}

export default App