import React from "react";

const Card = () => {
	const card = {
		image: "https://deckofcardsapi.com/static/img/9H.png",
		value: "9",
		suit: "Hearts",
	};

	return (
		<div>
			<img src={card.image} alt={`${card.value} of ${card.suit}`} />
		</div>
	);
};

export default Card;
