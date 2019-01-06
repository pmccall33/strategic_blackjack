console.log('Howdy- Blackjack');


// swift
	// struct Deck {
	//     var cards: [Card]
	    
	//     init() {
	//         // create cards, assign to a temporary array, then assign to cards var
	//         var tempCardsArray = [Card]()
	//         for suit in Suit.allSuits() {
	//             for number in Number.allNumbers() {
	//                 let card = Card(suit: suit, number: number)
	//                 tempCardsArray.append(card)
	//             }
	//         }
	//         cards = tempCardsArray
	//     }




		
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
	
	constructor() {
		// this.card = card;
		// this.suit = suit;
		this.cardValue = cardValue;
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
		get numValue() {
			if 
		}
	}



	// Shuffle cards
};

const newDeck = new DeckOfCards();

console.log(newDeck.deck);
console.log(newDeck.deck[0], newDeck.deck[13], newDeck.deck[26], newDeck.deck[39]);


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

// const game = {
// 	gameOn = false,
// 	deck = null,
// 	numOfPlayers = 0,
// 	dealerHandTotal = 0,
// 	playerHandTotal = 0,
// 	currentPlayer = null,



// 	startDeal () {

// 	},

// 	checkForAce() {
		
// 	},
	
// 	checkForBlackjack() {

// 	},

// 	dealCard() {

// 	},

// 	checkForBust() {

// 	},

// 	playerStatus() {

// 	},


// }

























