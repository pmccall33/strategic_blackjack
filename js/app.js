console.log('Howdy- Blackjack');

// Create Card class 						<<<=============== Card Class =============

class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
		// this.value will be set later
		// this.image will be set later
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
	// getHTML --
	drawCard() {
		// console.log(this)
		// card <img> elment
		const $cardImage = $('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${this.image}`});
		return $cardImage
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

		// Create 'deck' from arrays of suits and ranks
		for (let suit in suits) {
	     	for (let card in cards) {
		      	//new Card
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
		// console.log(this.deck);
	}

	dealCard () {
		// console.log(this.deck.pop());
		const card = this.deck.pop();
		return card;
	}

};


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
	}
	
	checkForBlackjack() {

	}

	checkForBust() {

	}

	handValue() {

	}

}


const game = {
	deck: null,
	numOfPlayers: 2,
	players: [],
	currentPlayerIndex: null,
	dealerHand: [],

	startGame() {
		this.gameOn = true;
		
		// Create players and store in an array
		for (let i = 1; i <= this.numOfPlayers; i++) {
			let player = new Player();
			this.players.push(player);
		};
		

		// Create and shuffle Deck
		this.deck = new Deck();
		console.log(this.deck);
		this.deck.shuffleCards();
		
		// Initial deal
		this.startDeal();

				

	},

	startDeal () {
		// deal 2 cards to each player
		for (let i = 0; i < this.players.length; i++) {
			let card1 = (this.deck.dealCard());
			// Add card element to the card div
			$(`#player-${i + 1}-cards .card-one`).append(card1.drawCard());
			this.players[i].receiveCard(card1);

			let card2 = (this.deck.dealCard());
			$(`#player-${i + 1}-cards .card-two`).append(card2.drawCard());
			this.players[i].receiveCard(card2);
		}

		// set player 0 turn
	},	


	
	hit(player) {
		// player dealt a card
		const card = this.deck.dealCard();
		this.players[player].receiveCard(card);
		// add card img element to card div
		$(`#player-${player + 1}-cards .card-two`).append($('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${card.image}`}));
		
	},

	stay(player) {
		
		console.log('stay was clicked');
	},

	nextPlayer() {
	    // this.currentPlayerIndex = 0;
	    if (this.currentPlayerIndex < (this.numOfPlayers - 1)) {
	      this.currentPlayerIndex += 1;
	    } else {
	      this.dealerPlayer()
	    }
	}
}

game.startGame();
// game.nextPlayer();
// console.log(game.currentPlayerIndex);

	
// Event Listeners ==========================

const $hitBtn = $('#hit-btn');
const $stayBtn = $('#stay-btn');
const $betBtn = $('#bet-btn');


$('#hit-btn-one').on('click', () => {
	console.log('hit-one was clicked');
	// deal another card
	const player = 0;
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
// });














