import Card from "./Card"

function CardGrid({ cards, handleClick }) {
  return (
    <div className="grid grid-cols-3 justify-items-center gap-4 rounded-2xl bg-gray-300 p-5 sm:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CardGrid