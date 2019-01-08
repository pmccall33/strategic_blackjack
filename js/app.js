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
	getValue() {
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

class Deck {	
	
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
		
		let randomIndex = Math.floor(Math.random() * this.deck.length);
		
		// console.log(this.deck);
		const shuffledDeck = [];
		let x = 0;
		for (let i = 0; i < (this.deck.length * 100); i++) {
			// let testVar = this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
			// console.log(++x, testVar);
			// console.log(this.deck);
			shuffledDeck.push(this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0]);
		}
		this.deck = shuffledDeck;
		// console.log(this.deck);
	}


};

// const newDeck = new DeckOfCards();
// console.log(newDeck.deck);
// console.log(newDeck.deck.length);
// console.log(newDeck.deck[0], newDeck.deck[13], newDeck.deck[26], newDeck.deck[39]);
// newDeck.shuffleCards();
// console.log(newDeck)
// console.log(newDeck.deck[5][0]);
// console.log("here it is", newDeck.getNumValue(newDeck.deck[5]));
// console.log(newDeck.deck[0]);

// Create PLayer Class 

class Player {
	// status - current hand, chip stack
	constructor(currentHand) {
		this.currentHand = currentHand;
		this.currentTally = 0;
		// this.chipStack = chipstack;
	}

	recieveHand() {
		// this.currentHand = this.playerOneHand;
		console.log(this.currentHand, ' - player recieveHand');
	}
	
	tallyHand() {
		// Get the numerical value of cards in player's hand
		// console.log(this.currentHand[0].value);
		this.currentTally = 0;
		for (let i = 0; i < this.currentHand.length; i++) {
			this.currentTally += this.currentHand[i].value;
		}
		console.log(this.currentTally, ' - player tallyHand');
	}

	checkForAce() {
		console.log(this.currentHand[0].rank);
		if ((this.playerOneHand('A - hearts')) ||
			(this.playerOneHand.includes('A - spades')) ||
			(this.playerOneHand.includes('A - diamonds')) ||
			(this.playerOneHand.includes('A - clubs'))) {
				this.playerHasAce = true;
			} else {
				this.playerHasAce = false;
			}
			console.log(this.playerHasAce);
			return this.playerHasAce;
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
	numOfPlayers: 2,
	currentPlayer: null,
	playerOne: null,
	playerTwo: null,
	dealerHand: [],
	dealerHandTotal: 0,
	playerOneHand: [],
	playerOneHandTotal: 0,
	playerTwoHand: [],
	playerTwoHandTotal: 0,
	currentHand: [],
	playerHasAce: false,

	printDeck() {
		console.log(this.deck)
	},

	startGame() {
		this.gameOn = true;
		// this.playerOneTurn = true;
		// this.playerTwoTurn = false;
		
		//Create players and set current player
		const playerOne = new Player(this.playerOneHand);
		const playerTwo = new Player(this.playerTwoHand);
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;
		this.currentPlayer = this.playerOne;

		// Create and shuffle Deck
		const newDeck = new Deck();
		this.deck = newDeck;

		// console.log(newDeck.shuffledDeck);
		this.deck.shuffleCards();
		console.log(newDeck.deck);
		this.deck = newDeck.deck;
		
		// Inititial deal
		this.startDeal();

	},

	togglePlayer() {
		if (this.playerOne) {
			this.currentPlayer = this.playerTwo;
		} else {
			this.currentPlayer = this.playerOne;
		}
		// console.log(this.currentPlayer);
	},

	startDeal () {
			//deal 2 cards to player
			for (let i = 0; i < this.numOfPlayers; i++) {
				this.dealCard();
				this.dealCard();
				this.currentPlayer.recieveHand();
				this.currentPlayer.tallyHand();
				this.togglePlayer();
			} 
			
			console.log(this.playerOneHand, ' - player one hand');
			console.log(this.playerTwoHand, ' - player two hand');
	},
	
	checkForBlackjack() {

	},

	dealCard() {
		//add a card to playerHand from shuffledDeck
		// console.log(this.deck);
		if (this.currentPlayer === this.playerOne) {
			this.playerOneHand.push(this.deck.pop());
			// console.log('dealt to player one');
		} 

		if (this.currentPlayer === this.playerTwo) {
			this.playerTwoHand.push(this.deck.pop());
			// console.log('dealt to player two');
		}

		// console.log(this.playerOneHand);
		// console.log(this.shuffledDeck);
	},

	checkForBust() {

	},

	playerStatus() {

	},


}
game.startGame();
// game.togglePlayer();


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


	

















