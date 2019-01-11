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

	getHTML() {
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
		this.possibleValuesArray = null
		// this.aceCounter = 0;
		// this.chipStack = chipStack;
	}

	receiveCard(card) {
		this.currentHand.push(card);	
	}
	
	checkForBlackjack() {

	}

	countAces () {
        let aceCounter = 0;
        this.currentHand.forEach(function(card) {
          if (card.rank === 'A') {
            aceCounter++;
          }
        // console.log(aceCounter, '- ace counter');
        });
        return aceCounter;
	}

	checkForBust() {
		// get players currentTally
		this.currentTally = 0;
		for (let i = 0; i < this.currentHand.length; i++) {
          this.currentTally += this.currentHand[i].value;
        }
		
		// create possible values array 
		this.possibleValuesArray = [this.currentTally];

        // update currentTally possiblity for number of aces
		const numAces = this.countAces();

		let bust = true;

		// Check for bust and return for the case no aces	
		if (numAces === 0) {
			// console.log(possibleValuesArray, '<-- no ace possibleValuesArray');
			if (this.possibleValuesArray[0] > 21) {
				// console.log(possibleValuesArray[0], ' - BUST')	
				return bust;
			}
		}
	
		// for each ace check and push value into possibleValues
		for (let i = 0; i < numAces; i++) {
          	this.currentTally -= 10;
        	this.possibleValuesArray.push(this.currentTally);
        	// console.log(possibleValuesArray, ' <--- possibleValuesArray');

      	}
      	// console.log(this.possibleValuesArray, ' -- checkForBust possibles');
        // iterate over possibleValuesArray to check for !bust value
        this.possibleValuesArray.forEach(function(value) {
        	
	        // Check possibleValues for bust
        	if (value <= 21) {
        		// console.log(bust, ' - NO bust');
        		bust = false;
        		// return false;
        	} 
        });
        // console.log(this.currentTally, ' ---bust');
        // console.log(this.possibleValuesArray, ' -- end checkForBust possibles');
        return bust;

    }

	handValue() {										/// ------------------------TODO
		
		// get players possible tally array
		this.currentTally = 0;
		for (let i = 0; i < this.currentHand.length; i++) {
          this.currentTally += this.currentHand[i].value;
          // console.log(this.currentTally, '<--- handValue current tally');
        }	
		
        // create possible values array 
		this.possibleValuesArray = [this.currentTally];
		// console.log(this.possibleValuesArray, ' <--- handValue possibleValuesArray')
        // update currentTally possiblity for number of aces
		const numAces = this.countAces();

		// for each ace check and push value into possibleValues
		for (let i = 0; i < numAces; i++) {
          	this.currentTally -= 10;
        	this.possibleValuesArray.push(this.currentTally);
        	// console.log(this.possibleValuesArray,' <--for ace loop possibleValuesArray')
        }

        console.log(this.possibleValuesArray, '<--stay return value');
        return this.possibleValuesArray;		
	}
};

const game = {
	deck: null,
	numOfPlayers: 2,
	players: [],
	currentPlayerIndex: 0,
	player: null,
	dealerHand: [],

	startGame() {
		this.gameOn = true;

		// instantiate dealer
		this.dealer = new Player();
		
		// Create players and store in an array
		for (let i = 1; i <= this.numOfPlayers; i++) {
			let player = new Player();
			this.players.push(player);
		};
		

		// Create and shuffle Deck
		this.deck = new Deck();
		this.deck.shuffleCards();
		
		// Initial deal
		this.startDeal();			
	},

	startDeal () {
		// deal 2 cards to each player
		for (let i = 0; i < this.players.length; i++) {
			let card1 = (this.deck.dealCard());
			// Add card element to the card div
			$(`#player-${i + 1}-cards .card-one`).append(card1.getHTML());
			this.players[i].receiveCard(card1);

			let card2 = (this.deck.dealCard());
			$(`#player-${i + 1}-cards .card-two`).append(card2.getHTML());
			this.players[i].receiveCard(card2);
		}

		//deal to dealer
		// const card1 = (this.deck.dealCard());

		this.dealerHand();
	},	
	
	hit(player) {
		// Allow only if its players turn
		// console.log(this.players[player].currentHand);
		if (player === this.currentPlayerIndex) {		
			if (this.players[player].currentHand.length < 5) {
				// player dealt a card
				const card = this.deck.dealCard();
				this.players[player].receiveCard(card);
				
				// add card img element to card div
				$(`#player-${player + 1}-cards .card-two`).append(card.getHTML());

				// check player currentHand for bust
				this.players[player].checkForBust();
				
				// if bust === true alert player and call nextPlayer
				if (this.players[player].checkForBust()) {
					alert(`Sorry Player ${player +1}, You busted.`);
					this.nextPlayer();
				}
			}
		}
	},

	stay(player) {
		if (player === this.currentPlayerIndex)	{
			this.players[player].checkForBust();
			// console.log(this.players[player].possibleValuesArray, '- stay ppossible'); // <-- this
			// console.log(this.players[player].currentTally, '-current tally on stay');
			this.players[player].handValue();
			// console.log(this.player.handValue(), '-handValue');
			// this.players[player].handValue();
			this.nextPlayer();
		}		
	},

	nextPlayer() {
	    // this.currentPlayerIndex = 2;
	    if (this.currentPlayerIndex < (this.numOfPlayers - 1)) {
	      this.currentPlayerIndex += 1;
	    } else {
	      this.dealerPlay()
	    }
	},

	dealerHand() {
		// dealer initial deal
		
		// Add card element to the dealer card div
		const card1 = (this.deck.dealCard());
		$('#dealer-cards #card-one').append(card1.getHTML());
		this.dealer.receiveCard(card1);
	},

	dealerPlay() {
	    // show hole card add to dealer hand
	    const card2 = (this.deck.dealCard());
		$('#dealer-cards #card-two').append(card2.getHTML());
		this.dealer.receiveCard(card2);
	    this.dealer.checkForBust();
		
		// get dealers currentTally
		this.dealer.currentTally = 0;
		for (let i = 0; i < this.dealer.currentHand.length; i++) {
          this.dealer.currentTally += this.dealer.currentHand[i].value;
        }
	    // console.log(this.dealer.currentTally, 'dealers initial deal tally');

		   	for (let i = 0; i < 3; i++) { 
		    	if (this.dealer.currentTally < 17) {
			    	// dealer hits
			    	card = (this.deck.dealCard());
			    	$('#dealer-cards #card-two').append(card.getHTML());
					this.dealer.receiveCard(card);

					//update dealer current tally
					this.dealer.currentntTally += card.value
					
					// console.log('dealer hit');
					// console.log(this.dealer.currentTally, 'dealer hit tally');
			    	
			    	if (this.dealer.currentTally > 21) {
			    		alert('Dealer Busts');
			    		// return;
			    	}

				    this.dealer.checkForBust();
		    	}
		   	}

	    if (this.dealer.checkForBust()) {
	    	alert('Dealer busts')
	    }
	    console.log('end round reached');
	    // end round()
	    console.log(this.dealer.currentTally, 'end round tally');
	    const dealerFinalTally = this.dealer.currentTally;
	 },

}

game.startGame();
// game.nextPlayer();
// console.log(game.currentPlayerIndex);
// console.log(game.players[0].currentHand[0].value)
// console.log(game.players[0].countAces());
// console.log(game.players[0].checkForBust();
console.log(game.players[0].possibleValuesArray);
	
// Event Listeners ==========================

const $hitBtn = $('#hit-btn');
const $stayBtn = $('#stay-btn');
const $betBtn = $('#bet-btn');


$('#hit-btn-one').on('click', () => {
	// console.log('hit-one was clicked');
	// deal another card
	const player = 0;
	game.hit(player);	
});
// 
$('#stay-btn-one').on('click', () => {
	// console.log('stay-one was clicked');
	// stand pat with current hand
	const player = 0;
	game.stay(player);	
});

$('#hit-btn-two').on('click', () => {
	// console.log('hit-one was clicked');
	// deal another card
	const player = 1;
	game.hit(player);
});

$('#stay-btn-two').on('click', () => {
	// console.log('stay-one was clicked');
	// stand pat with current hand
	const player = 1;
	game.stay(player);	
});

// $('#bet-btn').on('click', () => {
// 	console.log('bet was clicked');
// });

$('#dealer-hit').on('click', () => {
	// console.log('hit-one was clicked');
	// deal another card
	const player = dealer;
	game.hit(player);
});












