function GameInfo({
  moves,
  score,
  time,
  bestTime,
  restartGame,
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4">

      {/* Moves */}
      <div className="rounded-lg bg-gray-100 px-5 py-3 shadow">
        <p className="text-sm text-gray-500">
          Moves
        </p>

        <p className="text-xl font-bold text-gray-700">
          {moves}
        </p>
      </div>

      {/* Score */}
      <div className="rounded-lg bg-gray-100 px-5 py-3 shadow">
        <p className="text-sm text-gray-500">
          Score
        </p>

        <p className="text-xl font-bold text-green-700">
          {score}
        </p>
      </div>

      {/* Time */}
      <div className="rounded-lg bg-gray-100 px-5 py-3 shadow">
        <p className="text-sm text-gray-500">
          Time
        </p>

        <p className="text-xl font-bold text-gray-700">
          {time}s
        </p>
      </div>

      {/* Best Time */}
      <div className="rounded-lg bg-gray-100 px-5 py-3 shadow">
        <p className="text-sm text-gray-500">
          Best Time
        </p>

        <p className="text-xl font-bold text-green-700">
          {bestTime !== null
            ? `${bestTime}s`
            : "--"}
        </p>
      </div>

      {/* Restart */}
      <button
        onClick={restartGame}
        className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow hover:bg-green-700"
      >
        Restart
      </button>

    </div>
  )
}

export default GameInfo