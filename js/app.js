console.log('Howdy- Blackjack');


// create object deck
// const deck = [
// 	{
// 	card: 'A - hearts',
// 	cardNumValue: 11, 
// 	cardImage: null,	
// 	}
// ]
		
	// let deck = {}

	// // Suits - Hearts, Spades, Diamonds, Clubs
	// const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
	
	// // Cards - A - K  - Array?


		

		// for (let i = 0; i < cards.length; i++) {
		// 	cards.forEach(function(value, index) {
		// 		deck[value] = suits[index];
		// 	});
		// }
		// console.log(deck);

// Create Deck - Class  - array of objects?

class DeckOfCards {	
	
	constructor(card) {
		this.card = card;
		// this.suit = suit;
		this.cardNumValue = 0;
		this.deck = [];
	
		// Suits - Hearts, Spades, Diamonds, Clubs
		const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
		// Cards - A - K  - Array?
		const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

		for (let suit in suits) {
	      for (let card in cards) {
	        this.deck.push(`${cards[card]} - ${suits[suit]}`);
	      }
	    }

	}	
	

	// Get Cards numeric value

		getNumValue(card) {
			 // this.cardNumValue = 0;
			 for (let i = 0; i < this.deck.length; i++) {
			 	if (this.deck[i][0] === 'J' ||
			 		this.deck[i][0] === 'Q' ||
			 		this.deck[i][0] === 'K' ||
			 		this.deck[i][0] === '1') {
			 			this.cardNumValue = 10;
			 		// console.log(this.cardValue);
			 	} else if (this.deck[i][0] === 'A') {
			 		this.cardNumValue = 11;
			 	} else {
			 		this.cardNumValue = this.deck[i][0];
			 	}
			 	// console.log(this.cardNumValue);
			 }
			 return this.cardNumValue;
		}
	



	// Shuffle cards
};

const newDeck = new DeckOfCards();

console.log(newDeck.deck);
console.log(newDeck.deck[0], newDeck.deck[13], newDeck.deck[26], newDeck.deck[39]);
console.log(newDeck.deck[1][0]);
console.log(newDeck.getNumValue(newDeck.deck[1]));


// Create PLayer Class 

class Player {
	// status - current hand, chip stack
	constructor(currentHand, chipStack) {
		this.currentHand = currentHand;
		this.chipStack = chipstack;
	}

	recieveHand() {

	}
	
	tallyHand() {

	}

	decideStatus() {

	}

	showHand() {

	}
}

class Dealer extends Player {
	constructor(currentHand) {
		this.currentHand = currentHand;
	}

	dealerStatus() {

	}

}


// Create Game Object 

const game = {
	gameOn: false,
	deck: null,
	numOfPlayers: 0,
	dealerHandTotal: 0,
	playerHandTotal: 0,
	currentPlayer: null,



	startDeal () {

	},

	checkForAce() {
		
	},
	
	checkForBlackjack() {

	},

	dealCard() {

	},

	checkForBust() {

	},

	playerStatus() {

	},


}

























