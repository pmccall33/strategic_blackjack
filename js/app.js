console.log('Howdy- Blackjack');



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

// Create Card class

class Card {
	constructor(rank, suit, value) {
		this.rank = rank;
		this.suit = suit;
		this.value = value;
		// this.image = image;
	}
	getValue(card) {
		if (this.rank === 'K' ||
			this.rank === 'Q' ||
			this.rank === 'J') {
			this.value = 10;
		} else if (this.rank === 'A') {
			this.value = 11;
		} else {
			this. value = this.rank;

		}
	}
}

class DeckOfCards {	
	
	constructor() {
		this.deck = [];

		// Suits - Hearts, Spades, Diamonds, Clubs
		const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
		// Cards - A - K  - Array
		const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
		// Card values
		const values = [11, 2 ,3 , 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

		for (let suit in suits) {
	      for (let card in cards) {
	      	//new Card
	        const newCard = new Card(cards[card], suits[suit]);
	        newCard.getValue();
	        this.deck.push(newCard);
	        // this.deck.push(`${cards[card]} - ${suits[suit]}`);		      
	      }
	    }
	}

	shuffleCards () {
		// create new array of randomized cards from deck
		
		const tempDeck = this.deck;
		let randomIndex = Math.floor(Math.random() * newDeck.deck.length);
		
		// fisher-yates
		// TODO: why it takes many iterations
		for (let i = 0; i < (newDeck.deck.length * 100); i++) {
			this.deck.push(newDeck.deck.splice(Math.floor(Math.random() * newDeck.deck.length), 1)[0]);
		}
		console.log(this.deck);
	}		
};

const newDeck = new DeckOfCards();
// console.log(newDeck.deck);
newDeck.shuffleCards();
// console.log(newDeck)
// console.log(newDeck.deck[5][0]);
// console.log("here it is", newDeck.getNumValue(newDeck.deck[5]));
// console.log(newDeck.deck[0]);

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

// const randomIndex = function(arr) {
// 	let rndmIdx = Math.floor(Math.random() * arr.length);
//  	return rndmIdx;
// }
// Create Game Object 

const game = {
	gameOn: false,
	deck: null,
	shuffledDeck: [],
	numOfPlayers: 2,
	dealerHand: [],
	dealerHandTotal: 0,
	playerOneHand: [],
	playerOneHandTotal: 0,
	playerTwoHand: [],
	playerTwoHandTotal: 0,
	currentPlayer: null,
	playerOne: null,
	playerTwo: null,
	playerHasAce: false,


	// shuffleCards () {
	// 	// create new array of randomized cards from deck array
	// 	let randomIndex = Math.floor(Math.random() * newDeck.deck.length);
	// 	// console.log(randomIndex);
	// 	// console.log(newDeck.deck);
		

	// 	// fisher-yates
	// 	// TODO: why it takes many iterations
	// 	for (let i = 0; i < (newDeck.deck.length * 100); i++) {
	// 		this.shuffledDeck.push(newDeck.deck.splice(Math.floor(Math.random() * newDeck.deck.length), 1)[0]);
	// 	}
	// 	console.log(this.shuffledDeck);
	// },

	togglePlayer() {
		if (playerOne) {
			this.currentPlayer = playerTwo;
		} else {
			this.currentPlayer = playerOne;
		}
		console.log(currentPlayer);
	},

	startDeal () {
			//deal 2 cards to player
			this.dealCard();
			this.dealCard();
			console.log(this.playerOneHand);
			return this.playerOneHand;

	},

	checkForAce() {
		console.log(this.playerOneHand[0].rank);
		if ((this.playerOneHand.includes('A - hearts')) ||
			(this.playerOneHand.includes('A - spades')) ||
			(this.playerOneHand.includes('A - diamonds')) ||
			(this.playerOneHand.includes('A - clubs'))) {
				this.playerHasAce = true;
			} else {
				this.playerHasAce = false;
			}
			console.log(this.playerHasAce);
			return this.playerHasAce;
	},
	
	checkForBlackjack() {

	},

	dealCard() {
		//add a card to playerHand from shuffleDeck
		this.playerOneHand.push(this.shuffledDeck.pop());
		// console.log(this.playerOneHand);
		// console.log(this.shuffledDeck);
	},

	checkForBust() {

	},

	playerStatus() {

	},


}

// game.shuffleCards();
// game.dealCard();
// game.startDeal();
// game.checkForAce();
// console.log(game.playerOneHand.includes('A - hearts'));
// console.log(game.playerOneHand.includes('A - spades'));
// console.log(game.playerOneHand.includes('A - diamonds'));
// console.log(game.playerOneHand.includes('A - clubs'));
// console.log(true);
// console.log(newDeck.deck[0]);


	

















