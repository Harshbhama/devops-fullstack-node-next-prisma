import React from "react";

interface Card {
  int: number;
  name: string;
  email: string
}

const CardComonenet: React.FC<{card: Card}> = ({card}) => {
  return(
    <div>
      <p>ID - {card.int}</p>
      <p>name - {card.name}</p>
      <p>email - {card.email}</p>
    </div>
  )
}
export default CardComonenet;