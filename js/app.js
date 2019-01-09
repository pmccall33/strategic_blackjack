console.log('Howdy- Blackjack');

// Create Card class 						<<<=============== Card Class =============

class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
		// this.value = value;
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
			this.value = this.rank;

		}
	}

	drawCard() {
		console.log(this)
		// card <img> elment
		const $cardImage = $('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${this.image}`});
		console.log($cardImage);
		// $('#player-two-cards .card-two').append($cardImage);
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

		// Create 'deck' from arrays of suits and ranks
		for (let suit in suits) {
	     	for (let card in cards) {
		      	//new Card
		        const newCard = new Card(cards[card], suits[suit]);
		        newCard.getValue();
		        this.deck.push(newCard);
		        // this.deck.push(`${cards[card]} - ${suits[suit]}`);		      
	      }
	    }

	    //set card image
	    let j = 0;
	    for (let i = 0; i < this.deck.length; i++) {
	    	this.deck[i].image = `assets/PNG-cards-1.3/${images[j]}`;
	    	j++;
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

	dealCard () {
		// console.log(this.deck.pop());
		const card = this.deck.pop();
		return card;
	}

	// drawCard(card) {
	// 	let $cardImage = $('<img>', {id: "`${this.rank}-${this.suit}", class: "card", src: "this.deck[card].image"});
	// 			$("#card-one-image").html($cardImage);
	// }
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
	constructor() {
		this.currentHand = [];
		this.currentTally = 0;
		this.playerHasAce = false;
		this.playerBlackjack = false;
		this.playerStatus = null;
		this.playerIsPlaying = true;
		this.playerAction = null;
		// this.chipStack = chipStack;
	}

	receiveCard(card) {
		this.currentHand.push(card);
		
		// console.log(this.currentHand, ' - player recieveCard');
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
			console.log('Player has - BLACKJACK!');
			this.playerStatus = 'blackjack';
			this.playerIsPlaying = false;
			// console.log(this.playerStatus, ' - check for blackjack currentPlayerStatus');
		}
		// console.log(this.playerBlackjack, '- check for blackjack');
	}

	// checkForBust() {
	// 	if (this.currentTally > 21) {
	// 		this.playerStatus = 'busted';
	// 	}
	// }

	getPlayerAction() {
		if (this.playerAction === 'hit') {

		}
	}

	playerStatus() {
		this.checkForAce();
		// this.checkForBlackjack();
		// this.tallyHand();


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
	deck: null,
	players: [],
	numOfPlayers: 2,
	dealerHand: [],
	playerBlackjack: false,
	currentPlayerStatus: null,

	printDeck() {
		console.log(this.deck)
	},

	startGame() {
		this.gameOn = true;
		
		
		// Create players and store in an array
		for (let i = 1; i <= this.numOfPlayers; i++) {
			let player = new Player();
			this.players.push(player);
		};
		// console.log(this.players);

		// Create and shuffle Deck
		this.deck = new Deck();
		console.log(this.deck);
		this.deck.shuffleCards();
		// console.log(this.deck);
		
		//
		// this.deck.drawCard(this.deck.dealCard());
		// const newCard = this.deck.dealCard();
		// console.log(newCard.image)
		// newCard.drawCard();

		// Inititial deal
		this.startDeal();

		//get player status and play
		this.playerStatus();

		// Deal playing round to players (hit or stay)
		this.dealPlayerAction();
		console.log(this.players);
	},

	startDeal () {
		// for all players
			// deal 2 cards to each player
			// using Deck.dealCard and Player.receiveCard in a loop
			// add card img element to card div
		for (let i = 0; i < this.players.length; i++) {
			// 
			let card1 = (this.deck.dealCard());
			
			// Add card element to the card div
			$(`#player-${i + 1}-cards .card-one`).append($('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${card1.image}`}));
			
			this.players[i].receiveCard(card1);
			let card2 = (this.deck.dealCard());
			$(`#player-${i + 1}-cards .card-two`).append($('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${card2.image}`}));
			this.players[i].receiveCard(card2);
		}
		let $cardImage = $('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${this.image}`});
		console.log(this.players); 
	},	

	playerStatus() {
		// console.log(this.players);

		// Get player status
		for (let i = 0; i < this.players.length; i++) {
			// if (this.players[i].playerStatus = 'blackjack') {
			// 	this.playerStatus = 
			this.players[i].tallyHand();
			this.players[i].checkForBlackjack();
			this.players[i].checkForAce();
		}
		console.log(this.players);
	},

	
	hit(player) {
		// player dealt a card
		const card = this.deck.dealCard();
		this.players[player].receiveCard(card);
		// add card img element to card div
		$(`#player-${player + 1}-cards .card-two`).append($('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${card.image}`}));

		console.log('card dealt');
		
	},

	stay() {
		this.players[i].playerIsPlaying = false;
		console.log('stay was clicked');
	},

	dealPlayerAction() {
		// console.log(this.players, ' - begin dealPlayerMove');
			
			for (let i = 0; i < this.players.length; i++) {
				if (this.players[i].playerIsPlaying) {
					if (this.players[i].playerAction === 'hit') {
						// this.deck.dealCard();
						// this.hit(this.players[i]);
						// this.players[i].receiveCard(this.deck.dealCard());
						this.players[i].tallyHand(); 
						// this.players[i].playerStatus();
						// console.log(' - hit was called');
						this.players[i].playerAction = null;
					}	else if (this.players[i].playerAction === 'stay') {
							// this.playerStatus();
							this.players[i].playerIsPlaying = false;
							console.log(' - stay was called');
					}
				}
			}

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


	
// Event Listeners ==========================

const $hitBtn = $('#hit-btn');
const $stayBtn = $('#stay-btn');
const $betBtn = $('#bet-btn');


$('#hit-btn-one').on('click', () => {
	console.log('hit-one was clicked');
	// deal another card
	const player = 0;
	// game.dealPlayerAction();
	game.hit(player);	
});
// 
$('#stay-btn-one').on('click', () => {
	console.log('stay-one was clicked');
	// stand pat with current hand
	const player = 0;
	game.stay(player);	
});

$('#hit-btn-two').on('click', () => {
	console.log('hit-one was clicked');
	// deal another card
	const player = 1;
	// game.dealPlayerAction();
	game.hit(player);
});

$('#stay-btn-two').on('click', () => {
	console.log('stay-one was clicked');
	// stand pat with current hand
	const player = 1;
	game.stay(player);	
});

// $('#bet-btn').on('click', () => {
// 	console.log('bet was clicked');
// 	// deal another card
// 	game.tom1.hit();	
// });














