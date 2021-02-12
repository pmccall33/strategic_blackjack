import { Card } from './Card.mjs';
// import { images } from '../../card-images.mjs';

/*  <<<================================================================>>>
								Deck Class
	<<<================================================================>>> */

class Deck {

	constructor() {
		this.deck = [];
		this.numOfDecks = 1;
		this.shoe = [];
		this.cardReverseArr = [];


		const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
		const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

		// Create 'deck' from arrays of suits and ranks
		for (let suit in suits) {
	     	for (let card in cards) {
		        const newCard = new Card(cards[card], suits[suit]);
		        newCard.getValue();
		        this.deck.push(newCard);
	      }
	    }

	    //set card image
	    let j = 0;
	    for (let i = 0; i < this.deck.length; i++) {
	    	this.deck[i].image = `assets/PNG-cards-1.3/${images[j]}`;
	    	j++;
	    }

	    //set reverse card images
	    this.cardReverseArr = ['assets/PNG-cards-1.3/52', 'assets/PNG-cards-1.3/53', 'assets/PNG-cards-1.3/54'];
	}

	shuffleCards () {
		// create new array of randomized cards from deck

		let randomIndex = Math.floor(Math.random() * this.deck.length);
;
		const shuffledDeck = [];
		let x = 0;
		for (let i = 0; i < (this.deck.length * 100); i++) {
			shuffledDeck.push(this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0]);
		}
		this.deck = shuffledDeck;
	}

	dealCard () {
		const card = this.deck.pop();
		return card;
	}

};

export { Deck };
