function Card({ card, handleClick }) {
  return (
    <button
      onClick={() => handleClick(card)}
      className={`h-24 w-24 rounded-xl text-3xl font-bold shadow-md ${
        card.isMatched
          ? "bg-green-700 text-white"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      {card.isFlipped || card.isMatched ? card.symbol : "?"}
    </button>
  )
}

export default Card