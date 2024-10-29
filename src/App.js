import React, { useEffect, useState } from "react";
import Card from "./Card";

function App() {
	const [cards, setCards] = useState([]);
	const baseUrl = "https://deckofcardsapi.com/api/deck";

	useEffect(() => {
		const fetchCards = async () => {
			// Shuffle deck
			const cardDeckUrl = `${baseUrl}/new/shuffle/?deck_count=1`;
			const deckResponse = await fetch(cardDeckUrl);
			const deckData = await deckResponse.json();
			const deckId = deckData.deck_id;

			// Draw two cards
			const cardDrawUrl = `${baseUrl}/${deckId}/draw/?count=2`;
			const cardResponse = await fetch(cardDrawUrl);
			const cardData = await cardResponse.json();
			const cardsDrawn = cardData.cards;

			console.log("cards: ", cardsDrawn);
			setCards(cardsDrawn);
		};

		fetchCards();
	}, []);

	return (
		<div className="App">
			<header className="Blackjack">
				<h1>Basic Blackjack</h1>

				<div>
					{cards.map((card) => (
						<Card key={card.code} card={card} />
					))}
				</div>
			</header>
		</div>
	);
}

export default App;
