import { Card } from './Card.js';

/*  <<<=====================================================>>> 
							Deck Class 	
	<<<=====================================================>>> */

class Deck {	
	
	constructor() {
		this.deck = [];
		this.numOfDecks = 1;
		this.shoe = [];


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
	    this.deck[52] = `assets/PNG-cards-1.3/52`;
	    this.deck[53] = `assets/PNG-cards-1.3/53`; // alternate reverse img
	    this.deck[54] = `assets/PNG-cards-1.3/54`; // alternate reverse img
	}

	shuffleCards () {
		// create new array of randomized cards from deck
		
		let randomIndex = Math.floor(Math.random() * this.deck.length);
		
		// console.log(this.deck);
		const shuffledDeck = [];
		let x = 0;
		for (let i = 0; i < (this.deck.length * 100); i++) {
			shuffledDeck.push(this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0]);
		}
		this.deck = shuffledDeck;
	}

	dealCard () {
		// console.log(this.deck.pop());
		const card = this.deck.pop();
		return card;
	}

};

export { Deck };