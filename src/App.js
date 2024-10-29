import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

function App() {
	const [cards, setCards] = useState([]);
	const [score, setScore] = useState(0);
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

			setCards(cardsDrawn);
			calculateScore(cardsDrawn);
		};

		fetchCards();
	}, []);

	const calculateScore = (cards) => {
		let totalScore = 0;
		let tenPointCards = ["KING", "QUEEN", "JACK", "10"];

		cards.forEach((card) => {
			if (card.value === "ACE") {
				totalScore += 11;
			} else if (tenPointCards.includes(card.value)) {
				totalScore += 10;
			} else {
				totalScore += parseInt(card.value);
			}
		});

		setScore(totalScore);
	};

	return (
		<div className="App">
			<header className="Blackjack">
				<h1>Basic Blackjack</h1>

				<div className="card-container">
					{cards.map((card) => (
						<Card key={card.code} card={card} />
					))}
				</div>
				<h2>Score: {score}</h2>
				{score === 21 && <h3>BLACKJACK!!!</h3>}
			</header>
		</div>
	);
}

export default App;
