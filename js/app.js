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
		// card <img> elment
		const $cardImage = $('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${this.image}`});
		return $cardImage
	}
}



// Create Deck Class 							<<<================ Deck Class ========
class Deck {	
	
	constructor() {
		this.deck = [];

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
	    this.deck[53] = `assets/PNG-cards-1.3/53`;
	    this.deck[54] = `assets/PNG-cards-1.3/54`;
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


// Create PLayer Class 					<<<================== Player Class =============

class Player {
	// status - current hand, chip stack
	constructor() {
		this.currentHand 		 = [];
		this.currentTally 		 = 0;
		this.playerHasAce 	 	 = false;
		this.playerBlackjack 	 = false;
		this.playerStatus 		 = null;
		this.playerIsPlaying 	 = true;
		this.playerAction 		 = null;
		this.possibleValuesArray = null
		this.playerOneChipStack  = 100;
		this.playerTwoChipStack  = 100;
		this.playerBet			 = 0;
	}


	receiveCard(card) {
		this.currentHand.push(card);	
	}
	

	countAces () {
        let aceCounter = 0;
        this.currentHand.forEach(function(card) {
          if (card.rank === 'A') {
            aceCounter++;
            this.playerHasAce = true;
          }
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
					
				return bust;
			}
		}
	
		// for each ace check and push value into possibleValues
		for (let i = 0; i < numAces; i++) {
          	this.currentTally -= 10;
        	this.possibleValuesArray.push(this.currentTally);

      	}

        // iterate over possibleValuesArray to check for !bust value
        this.possibleValuesArray.forEach(function(value) {
        	
	        // Check possibleValues for bust
        	if (value <= 21) {
        		bust = false;
        		// return false;
        	} 
        });
      
        return bust;

    }

	handValue() {														//<------ Ace Logic
		
		// get players possible current hand tally
		this.currentTally = 0;
		for (let i = 0; i < this.currentHand.length; i++) {
          this.currentTally += this.currentHand[i].value;
        }	
		
        // create possible values array 
		this.possibleValuesArray = [this.currentTally];

		//number of aces in the hand
		const numAces = this.countAces();

		// for each ace check and push value into possibleValues
		for (let i = 0; i < numAces; i++) {
          	this.currentTally -= 10;
        	this.possibleValuesArray.push(this.currentTally);
        }

        // iterate over posssibleValuesArray to return the highest valid score
        let highestValue = 0;
        for (let i= 0; i < this.possibleValuesArray.length; i++) {
        	if (this.possibleValuesArray[i] <= 21 &&
        		this.possibleValuesArray[i] > highestValue) {
        		highestValue = this.possibleValuesArray[i];
        	}
        }
        return highestValue;	
	}
};

const game = {
	deck: null,
	numOfPlayers: 2,
	players: [],
	currentPlayerIndex: 0,
	player: null,
	dealerHand: [],
	message: '',

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

		message = 'Let\'s Play';

		// Jquery insert chip graphic and other?			
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

		this.dealerInitialDeal();
	},	

	checkForBlackjack() {
		if ((this.currentHand.length == 2) && (this.currentTally == 21))
			this.playerBlackjack = true;
			this.playerChipstack += this.playerBet;
			$(`Player ${player + 1} has Blackjack!!! Hooray!`)
	},
	
	hit(player) {
		// Allow only if its players turn
		if (player === this.currentPlayerIndex) {		
			if (this.players[player].currentHand.length < 5) {
				// player dealt a card
				const card = this.deck.dealCard();
				this.players[player].receiveCard(card);
				
				// add card img element to card div
				$(`#player-${player + 1}-hit-cards .card`).append(card.getHTML());

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
			this.players[player].handValue();
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

	dealerInitialDeal() {											
		// Add card element to the dealer card div
		const card1 = (this.deck.dealCard());
		$('#dealer-cards #card-one').append(card1.getHTML());
		this.dealer.receiveCard(card1);
		// $('#dealer-cards #card-reverse').append(this.deck[52].getHTML());
		// this.dealer.receiveCard(this.deck.	    this.deck[52] = `assets/PNG-cards-1.3/52`)
	},

	dealerHand() {												
		this.dealer.handValue();
	},

	endRound() {
		//declare variable for dealers total
		const dealerTotal = this.dealer.handValue();

		// get player final scores
		for (let i = 0; i < this.players.length; i++) {
			 let playerTotal = this.players[i].handValue();
			// console.log(playerTotal, '<-- endRound player hand - for');

			// Compare values to dealer final tally
			if (playerTotal > dealerTotal) {
				//player wins
				alert(`Player ${i + 1} Wins! Huzzahs and Hosannahs!`);
			} else if (playerTotal < dealerTotal) {
				//player loses
				alert(`Player ${[i + 1]} Loses! Harrumph and Shucks-gollygeeze-darn-it-to-heck.`);
			} else if (playerTotal === dealerTotal) {
				//It's a push
				alert(`It's a push, Player${[i + 1]}.`);
			}
		}
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

		   	for (let i = 0; i < 3; i++) { 
		    	if (this.dealer.currentTally < 17 && this.dealer.currentTally  != 21) {
			    	// dealer hits
			    	card = (this.deck.dealCard());
			    	$('#dealer-cards #card-two').append(card.getHTML());
					this.dealer.receiveCard(card);

					//update dealer current tally
					this.dealer.currentntTally += card.value

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
	    this.endRound();											
	 },

}

game.startGame();
// game.nextPlayer();
// console.log(game.currentPlayerIndex);
// console.log(game.players[0].currentHand[0].value)
// console.log(game.players[0].countAces());
// console.log(game.players[0].checkForBust();
// console.log(game.players[0].possibleValuesArray);
	
// Event Listeners ==========================

const $hitBtn  = $('#hit-btn');
const $stayBtn = $('#stay-btn');
const $betBtn  = $('#bet-btn');
const $dealBtn = $('#deal-btn')

$('#deal-btn-one').on('click', () => {
  console.log('deal btn was clicked');
  game.startDeal();
});

$('#hit-btn-one').on('click', () => {
	console.log('hit-one was clicked');
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

$('#bet-btn-one').on('click', () => {
	console.log('bet was clicked');
});

$('#bet-btn-two').on('click', () => {
	console.log('bet two was clicked');
});

$('#dealer-hit').on('click', () => {
	// console.log('hit-one was clicked');
	// deal another card
	const player = dealer;
	game.hit(player);
});












