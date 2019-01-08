console.log('Howdy- Blackjack');

// Create Card class 						<<<=============== Card Class =============

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

// Create Deck Class 							<<<================ Deck Class ========
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

// Create PLayer Class 					<<<================== Player Class =============

class Player {
	// status - current hand, chip stack
	constructor(currentHand) {
		this.currentHand = currentHand;
		this.currentTally = 0;
		this.playerHasAce = false;
		this.playerBlackjack = false;
		this.currentPlayerStatus = null;
		this.playerIsPlaying = true;
		this.playerMove = 'stay';
		// this.chipStack = chipstack;
	}

	recieveHand() {
		// this.currentHand = this.playerOneHand;
		// console.log(this.currentHand, ' - player recieveHand');
	}
	
	tallyHand() {
		// Get the numerical value of cards in player's hand
		// console.log(this.currentHand[0].value);
		this.currentTally = 0;
		for (let i = 0; i < this.currentHand.length; i++) {
			this.currentTally += this.currentHand[i].value;
		}
		// console.log(this.currentTally, ' - player tallyHand');
	}

	checkForAce() {
		// Check players hand for an Ace
		// console.log(this.currentHand[0].rank);
			for (let i = 0; i < this.currentHand.length; i++) {
				if (this.currentHand[i].rank === 'A') {
					this.playerHasAce = true;
				}
			}
			// console.log(this.playerHasAce, ' - player has and ace');
	}

	checkForBlackjack() {
		// Check after initial deal for a blackjack
		// console.log(this.currentTally, ' - checkForBlackjack -');
		if (this.currentTally === 21) {
			this.playerBlackjack = true;
			console.log('Player has a BLACKJACK!');
			this.currentPlayerStatus = 'blackjack';
			console.log(this.currentPlayerStatus, ' - check for blackjack currentPlayerStatus');
		}
		// console.log(this.playerBlackjack, '- check for blackjack');
	}

	// checkForBust() {
	// 	if (this.currentTally > 21) {
	// 		this.playerStatus = 'busted';
	// 	}
	// }

	getPlayerMove() {
		if (this.playerMove === 'hit') {

		}
	}

	playerStatus() {
		// Check hand for status
		if (this.playerBlackjack) {
			this.currentPlayerStatus = 'blackjack';
		} else if (this.tallyHand > 21) {
			this.currentPlayerStatus = 'busted';
		} else {
			this.currentPlayerStatus = 'playing';
		}
		console.log(this.currentPlayerStatus);
	// }

		// switch (this.playerStatus) {
		// 	case blackjack:
		// 		console.log('- BLACKJACK! - You win!');
		// 		break;
		// 	case busted:
		// 		console.log('- Busted out, dude.');
		// 		break;
		//	case playing:
		// 		console.log('- hit or stay?')
		// }
	
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
// Create Game Object 						<<<=================== Game Object ==========

const game = {
	gameOn: false,
	playerOneIsPlaying: false,
	playerTwoIsPlaying: false,
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
	playerBlackjack: false,
	currentPlayerStatus: null,

	printDeck() {
		console.log(this.deck)
	},

	startGame() {
		this.gameOn = true;
		this.playerOneIsPlaying = true;
		this.playerTwoIsPlaying = true;

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
		// console.log(newDeck.deck);
		this.deck = newDeck.deck;
		
		// Inititial deal
		this.startDeal();

		//get player status and play
		this.playerStatus();

		// Deal playing round to players (hit or stay)
		this.currentPlayer = playerOne;
		this.dealPlayerMove();
		this.dealPlayerMove();
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
				this.currentPlayerStatus = 'playing';
				this.dealCard();
				this.dealCard();
				this.currentPlayer.recieveHand();
				this.currentPlayer.tallyHand();
				this.currentPlayer.checkForAce();
				this.currentPlayer.checkForBlackjack();
				this.playerStatus();
				this.togglePlayer();
			} 
			
			console.log(this.playerOneHand, ' - player one hand');
			console.log(this.playerTwoHand, ' - player two hand');
	},
	
	// checkForBlackjack() {
	// 	console.log(this.tallyHand);
	// 	if (this.tallyHand === 21) {
	// 		this.playerBlackjack = true;
	// 		this.
	// 	}
	// },

	// checkForAce() {
	// 	// Check players hand for an Ace
	// 	// console.log(this.currentHand[0].rank);
	// 		for (let i = 0; i < this.currentHand.length; i++) {
	// 			if (this.currentHand[i].rank === 'A') {
	// 				this.playerHasAce = true;
	// 			}
	// 		}
	// 		// console.log(this.playerHasAce, ' - player has and ace');
	// },	

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
		if (this.currentTally > 21) {
			this.currentPlayerStatus = 'busted';
		}
	},

	playerStatus() {
		// console.log(this.currentPlayer);
		// console.log(this.csurrentPlayerStatus, 'playerStatus was called');
		// this.currentPlayerStatus = 'busted';
		if (this.currentPlayer.playerBlackjack) {
			this.currentPlayerStatus = 'blackjack';
		} else if (this.currentPlayer.currentTally > 21) {
			this.currentPlayerStatus = 'busted';
		} else {
			this.currentPlayerStatus = 'playing';
		}


		switch (this.currentPlayerStatus) {
			case 'blackjack':
				console.log('- BLACKJACK! - You win!');
				this.currentPlayer.playerIsPlaying = false;
				break;
			case 'busted':
				console.log('- Busted out.');
				this.currentPlayer.playerIsPlaying = false;
				break;
			case 'playing':
				console.log('- hit or stay?');
				break;
		}
	},

	dealPlayerMove() {
		// console.log(this.currentPlayer, ' - begin dealPlayerMove');
		for (let i = 0; i < 3; i++) {
			if (this.currentPlayer.playerIsPlaying) {
				if (this.currentPlayer.playerMove === 'hit') {
					this.dealCard();
					this.currentPlayer.tallyHand(); 
					this.playerStatus();
					// console.log(this.currentHand, ' - hit was called');
				}	else if (this.currentPlayer.playerMove === 'stay') {
					this.playerStatus();
					this.currentPlayer.playerIsPlaying = false;
					console.log(this.currentHand, ' - stay was called');
				}
			}
		}
		this.togglePlayer();
		// console.log(this.currentPlayer, ' - end dealPlayerMove');
	}


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


	

















