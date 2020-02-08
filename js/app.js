console.log('Howdy- Blackjack');

/* 	<<<=======================================================>>> 
							Card Class 
	<<<=======================================================>>> */

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



/*  <<<=====================================================>>> 
							Deck Class 	
	<<<=====================================================>>> */

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


/* 	<<<=====================================================>>> 
						Player Class
	<<<=====================================================>>>   */

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
		this.playerChipStack  	 = 100;
		this.playerBet			 = 0;
		this.playerBetPlaced	 = false;
	}

	receiveCard(card) {
		this.currentHand.push(card);	
	}
	
	countAces () {
        let aceCounter = 0;
        this.currentHand.forEach(function(card) {
          if (card.rank === 'A') {
            aceCounter++;
          }
        });
        if (aceCounter > 0) {
        	this.playerHasAce = true;
        }     
        return aceCounter;
	}

	// checkForBlackjack(player) {
	// 	if ((this.currentHand.length == 2) && (this.currentTally == 21)) {
	// 		this.players[player].playerBlackjack = true;
	// 		this.players[player].playerChipstack += this.players[player].playerBet;
	// 		this.message = $(`Player ${player + 1} has Blackjack!!! Hooray!`);
	// 		console.log('blackJack!!!!!! <--------');
	// 		this.nextPlayer();
	// }
	
	checkForBust(player) {
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
        	if (value <= 21) {
        		bust = false;
        	} 
        });
      
        return bust;
    }

	handValue(player) {							//<------ Ace Logic here
		
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
        this.currentTally = highestValue;
        return highestValue;	
	}
};

/*  <<<======================================================>>>
							Strategy Class
	<<<======================================================>>> */

class Strategy {
	constructor() {
		this.playerHand = [],
		this.playerHandValue = 0,
		this.dealerUpCardValue = 0,
		this.recommendPlay = ''
	}

	// Basic Strategy Chart to get recommended play upon initial deal
	getBasicStrategicPlay(player, dealer) {
		console.log(player, '--player in getStrategy');
		console.log(dealer, '--dealer in getStrategy');
		this.playerHand = player.currentHand;
		this.playerHandValue = player.currentTally;
		this.dealerUpCardValue = dealer.currentHand[0];
		console.log(this.playerHandValue, '-- playerHandValue');
		
		// Compare player hand to dealer up card for 'correct' play

		/* Player has a pair, compare to dealer up card for split/double strategy*/
		if (this.playerHand[0].rank === this.playerHand[1].rank) {
			console.log(this.playerHand[0].value, 'playerHand.value in pair');
			switch (this.playerHand[0].value) {   // switch 1
				case 8:
				case 11:
					this.recommendPlay = 'Double & Split';
					break;
				case 5:
				case 10:
					this.recommendPlay = 'Don\'t Split';
					break;
				case 9:
					if (this.dealerUpCardValue === 7 || 10 || 11) {
						this.recommendPlay = 'Don\'t Split';
					} else if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 8 || 9) {
						this.recommendPlay = 'Double & Split';
					};
					break;
				case 2:
				case 3:
				case 4:
					if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 7) {
						this.recommendPlay = 'Double & Split';
					} else if (this.dealerUpCardValue === 8, 9, 10, 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				case 6:
					if (this.dealerUpCardValue === 2, 3, 4, 5, 6) {
						this.recommendPlay = 'Double & Split';
					} else if (this.dealerUpCardValue === 7, 8, 9, 10, 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				case 4:
					if ((this.dealerUpCardValue === 5) || (this.dealerUpCardValue === 6)) {
						this.recommendPlay = 'Double & Split';
					} else if (this.dealerUpCardValue === 2, 3, 4, 7, 8, 9, 10, 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				default:
					console.log('Error getting strategy in switch 1');

			};  // edn switch
			console.log(this.recommendPlay, 'recommendPlay with a pair')
			return this.recommendPlay;
		};  // end if stmnt for pairs.

		// Player has one ace. (soft totals).
		if (player.playerHasAce) {
			console.log(player.playerHasAce, 'playerHasAce in soft totals');
			switch (this.playerHandValue) {     // switch 2
				case 20:
					this.recommendPlay = 'Stay';
					break;
				case 19:
					if (this.dealerUpCardValue === 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Stay';
					};
					break;
				case 18:
					if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else if (this.dealerUpCardValue === 7 || 8) {
						this.recommendPlay = 'Stay';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				case 17:
					if (this.dealerUpCardValue === 2 || 7 || 8 || 9 || 10 || 11) {
						this.recommendPlay = 'Hit';
					} else {
						this.recommendPlay = 'Double Down';
					};
					break;
				case 15:
				case 16:
					if (this.dealerUpCardValue === 4 || 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				case 13:
				case 14:
					if (this.dealerUpCardValue === 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				default:
					console.log('Error getting strategy in switch 2');
			};  // end soft total switch
			console.log(this.recommendPlay, ' - for soft total');
			return this.recommendPlay;
		}; // End if for one ace/soft hands.

		// No pair/No ace in players hand. (Hard totals).
		if ((this.playerHand[0] !== this.playerHand[1]) && (!player.playerHasAce)) {
			if ((0 < this.playerHandValue) && (this.playerHandValue <= 8)) {
				this.recommendPlay = 'Hit';
			};

			if ((this.playerHandValue > 17) && (this.playerHandValue <=21)) {
				this.recommendPlay = 'Stay';
			};

			if ((this.dealerUpCardValue === 10) || (this.dealerUpCardValue === 11)) { 
				switch (this.playerHandValue) {  // switch 3
					case 17: 
						this.recommendPlay = 'Stay';
						break;
					case 8:
					case 9:
					case 12: 
					case 13: 
					case 14: 
					case 15: 
					case 16:
						this.recommendPlay = 'Hit';
						break;
					case 11:
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy in switch 3.')
				};
			} else if ((this.dealerUpCardValue === 7) || (this.dealerupValue === 8) || (this.dealerUpCardValue === 9)) {
				switch (this.playerHandValue) {  // switch 4
					case 17: 
						this.recommendPlay = 'Stay';
						break; 
					case 8:
					case 9:
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
						this.recommendPlay = 'Hit';
						break;
					case 10:
					case 11:
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy from switch 4');
				};
			} else if ((this.dealerUpCardValue === 4) || (this.dealerUpCardValue === 5) || (this.dealerUpCardValue === 6)) {
				switch (this.playerHandValue) {  // switch 5
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
					case 17: 
						this.recommendPlay = 'Stay'; 
						break;
					case 8:
						this.recommendPlay = 'Hit';
						break;
					case 9:
					case 10:
					case 11:
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy from switch 5');
				};				
			} else if (this.dealerUpCardValue === 3) {
				switch (this.playerHandValue) {   // switch 6
					case 13:
					case 14:
					case 15:
					case 16:
					case 17: 
						this.recommendPlay = 'Stay';
						break; 
					case 8:
					case 12:
						this.recommendPlay = 'Hit';
						break;
					case 9: 
					case 10: 
					case 11:
						this.recommendPlay = 'Double Down';
						break;
					default: 
						console.log('Error gtting strategy from switch 6');
				};
			} else if (this.dealerUpCardValue === 2) {
				switch (this.playerHandValue) {   // switch 7
					case 13:
					case 14:
					case 15:
					case 16:
					case 17: 
						this.recommendPlay = 'Stay'; 
						break;
					case 8:
					case 9:
					case 12:
						this.recommendPlay = 'Hit';
						break;
					case 10:
					case 11:
						this.recommendPlay = 'Double Down';	
						break;
					default:
						console.log('Error getting strategy from switch 7');
				};
			}; 
			console.log(this.recommendPlay,'recommendedPlay without pair/ace');
			return this.recommendPlay;	
		}; // end if hard totals/ no ace
		if (!this.recommendPlay) {
			console.log('Error getting strategy.')
		};
		return this.recommendPlay;
	}; // end getBasicStrategicPlay()

};

/*  <<<======================================================>>>
		 					Game Object 
	<<<=====================================================>>> */

const game = {
	deck: null,
	numOfPlayers: 2,
	players: [],
	currentPlayerIndex: 0,
	player: null,
	dealerHand: [],
	message: '',
	playerBetButtonClicked: false,

	
	clearMessage() {
		setTimeout ( function() {
			$(`.message`).hide('slide', 1500, callback);
			// $(`.message`).html('');
		}, 3000);

		function callback() {
      		setTimeout(function() {
        		$( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      		}, 1000 );
    	};
	},

	clearCardsBlackjack(player) {
		setTimeout ( function() {
			$(`#player-${player + 1}-cards .card-one`).hide('pulsate', 1500);
			$(`#player-${player + 1}-cards .card-two`).hide('bounce', 1500);
		}, 2000);
	},

	startGame() {
		this.gameOn = true;

		// Instantiate strategy
		this.strategy = new Strategy();

		// Instantiate dealer
		this.dealer = new Player();
		
		// Create players and store in an array
		for (let i = 1; i <= this.numOfPlayers; i++) {
			let player = new Player();
			this.players.push(player);
		};
		
		// Create and shuffle Deck
		this.deck = new Deck();
		this.deck.shuffleCards();

		// Welcome messages		
		this.message = 'Welcome to the table, have a seat...';
		$(`.message`).append(this.message).hide().fadeIn(1600);		
		
		this.clearMessage();

		// setTimeout ( function () {
		// 	$(`.message`).hide('slide', 2000);
		// 	this.clearMessage();	
		// }, 5000);

		setTimeout ( function () {
			$(`.message`).html('');
			this.message = 'Place your bets, Folks...';
			$(`.message`).append(this.message).fadeIn(1600);
		}, 5000);

		this.clearMessage();
		this.updateChipTotal();
	},

	updateChipTotal(player) {
		$(`.chip-total-player-1`).html('');
		$(`.chip-total-player-2`).html('');
		$(`.chip-total-player-1`).append(this.players[0].playerChipStack.toString());
		$(`.chip-total-player-2`).append(this.players[1].playerChipStack.toString());
	},

	nextPlayer() {
	    if (this.currentPlayerIndex < (this.numOfPlayers - 1)) {
	      this.currentPlayerIndex += 1;
	      this.checkForBlackjack(this.currentPlayerIndex);
	    } else {
	      this.dealerPlay()
	    }
	},

	placeYourBets(player) {							

		// Display playerChipStacks
		this.updateChipTotal(player);

		// Place bets here and don't deal cards until betting is done		
		this.players[player].playerBetPlaced = true;

		if (this.players[0].playerBetPlaced && this.players[1].playerBetPlaced) {
			this.startDeal();
		}

		// Jquery insert chip graphic and other?  // TODO ---------------<<<<<<
	},			
										
	checkForBlackjack(players, player) {
		// Get currentTally and handValue from checkForBust() and handValue()
		for (let player in players) {
			this.players[player].checkForBust(player);
			this.players[player].handValue(player);
			console.log(this.players[player], ' player at chekcforblackjack()');
		};

		// this.players[player].playerBlackjack = false;
		console.log( this.players[player].currentHand.length === 2 && this.players[player].currentTally === 21 )
		// Check for blackjack conditions and add winnings to chipstack
		if ((this.players[player].currentHand.length === 2) && (this.players[player].currentTally === 21)) {
			this.players[player].playerBlackjack = true;
			// this.players[player].playerChipStack += (this.players[player].playerBet * 1.5);
			
			// Messaging
			// this.clearMessage();
			setTimeout ( function() {
			}, 3100);
			$(`.message`).hide('slide', 1200);
			$(`.message`).append(`Blackjack Player + ${this.players[player] + 1} + '!! ' + 'Hooray!`).fadeIn(1200);
			setTimeout( function() {
			}, 6000);
			this.clearMessage();


			// Clear and update player chips
			this.clearCardsBlackjack();
			this.updateChipTotal();
			console.log('blackjack ------', this.players[player].playerChipStack);

			this.nextPlayer();
		} else {
			this.players[player].playerBlackjack = false;
		}
	},

	startDeal () {
		// Greeting
		$(`.message`).html('');
		this.clearMessage();

		this.message = 'Sweet! Let\'s Play!!';
		$(`.message`).append(this.message).hide().fadeIn(1600);
		setTimeout ( function() {
		}, 3000);
			$(`.message`).hide('shake', 600);			

		// Display players ChipStack
		this.updateChipTotal();

		// possible refactor for playerChipStack -----------
		// for (player in this.players) {
		// 	console.log(player, 'player in this.');
		// 	console.log(this.players[player].playerChipStack, 'player.playerChipStack -- for in')
		// $(`.chip-total-player-${player + 1}`).append(player.playerChipStack)
		// }

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
		this.checkForBlackjack(this.players, this.currentPlayerIndex);
	},	
	
	playerBet(player) {
		// Set betting status to true and increment by 5
		this.players[player].playerBetPlaced = true;
		this.players[player].playerBet = this.players[player].playerBet + 5;
		$(`#bet-player-${player + 1}`).append(this.players[player].playerBet.toString());

		// Subtract bet from chipstack
		this.players[player].playerChipStack = this.players[player].playerChipStack - 5;
		$(`.chip-total-player-${player + 1}`).append(this.players[player].playerChipStack.toString());
	},

	clrBet(player) {
		// Reset betting window and chipsatack
		this.players[player].playerChipStack = this.players[player].playerChipStack + this.players[player].playerBet;
		this.players[player].playerBet = 0;
		$(`#bet-player-one`).append(this.players[player].playerBet.toString());
		$(`.chip-total-player-${player + 1}`).append(this.players[player].playerChipStack.toString());
	},

	hit(player) {
		// $('.message').html('');
		this.clearMessage();

		// Do not allow if bet not placed or zero
		// Allow only if its players turn
		// console.log(player, this.currentPlayerIndex, this.players[player].playerBetPlaced, this.players[player].playerBet !== 0, this.players[player].currentHand.length);

		if (player === this.currentPlayerIndex && this.players[player].playerBetPlaced && this.players[player].playerBet !== 0 ) {		
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
					// Messaging upon player bust
					// this.clearMessage();
					$(`.message`).html('');
					$(`.message`).append(`Sorry ${player + 1}, you're busted.`).fadeIn(1000);
					setTimeout ( function() {
					}, 6000)
					
					this.clearMessage();

					this.nextPlayer();
				}
			}
		}
	},

	stay(player) {
		if (player === this.currentPlayerIndex)	{
			this.players[player].checkForBust();
			this.players[player].handValue();
			this.nextPlayer();
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

	dealerPlay() {
		// Get dealer's currentTally
		this.dealer.checkForBust();

		console.log(this.dealer, '<<<--- this.dealer')
		$(`.message`).html('');
		// setTimeout(function() {
		// $(`.message`).append('Dealer has... .');
		// }, 6000); 

	    // 'Flip' down card
	    $(`#dealer-card-reverse`).hide();

	    // show hole card add to dealer hand
	    const card2 = (this.deck.dealCard());
		$('#dealer-cards #dealer-card-two').append(card2.getHTML());
		this.dealer.receiveCard(card2);
	    this.dealer.checkForBust();
		
		// get dealers currentTally
		this.dealer.currentTally = 0;
		for (let i = 0; i < this.dealer.currentHand.length; i++) {
          this.dealer.currentTally += this.dealer.currentHand[i].value;
        }

		   	for (let i = 0; i < 3; i++) { 
		    	if (this.dealer.currentTally < 17 && this.dealer.currentTally != 21 && this.dealer.currentHand.length < 5) {
			    	// dealer hits
			    	card = (this.deck.dealCard());
			    	$('#dealer-cards #dealer-card-two').append(card.getHTML());
					this.dealer.receiveCard(card);

					//update dealer current tally
					this.dealer.currentTally += card.value

			    	if (this.dealer.currentTally > 21) {
			    		// $(`.message`).html('');
			    		// $(`.message`).append('Dealer Busts. Cool.');
			    		this.dealer.playerStatus = 'bust';
			    	}
				    this.dealer.checkForBust();
		    	}
		   	}
		// this.dealer.checkForBust();
		console.log(this.dealer + this.dealer.currentTally, ' this.dealer----this.dealer.currentTally ')   	
	    this.endRound();											
	},

	clearTable() {
		console.log('clearTable was called');
		console.log(this.players, 'this.players');
		// Clear players cards from the table
		for (let i = 1; i < this.players.length; i++) {
			$(`#player-${i}-cards .card-one`).html('');
			$(`#player-${i}-cards .cards-two`).html('');
			$(`#player-${i}-hit-cards .card`).html('');
		};

		// this.players.forEach(function(player) {			<<----- forEach refactor - TODO
		// 	$(`#player-${player + 1}-cards .card-one`).html();
		// 	$(`#player-${player + 1}-cards .cards-two`).html();
		// 	$(`#player-${player + 1}-hit-cards .card`).html();
		// });

		// Clear dealers cards
		$('#dealer-cards #dealer-card-one').html('');
		$('#dealer-cards #dealer-card-two').html('');

		// Clear bet boxes
		for (let i = 1; i < this.players.length; i++) {
			$(`#bet-player-${i}`).html('');
		};

		// CLear bet forEach refactor     --clear-bets TODO ------<<<<
		// this.players.forEach(function(player) {
		// 	$(`#bet-player-${player + 1}`).html();
		// });

		// Update players current chip totals
		this.updateChipTotal();
	},

	endRound() {
		const dealerTotal = this.dealer.currentTally;
		console.log(dealerTotal, '<--dealerTotal');

		// Get player final scores
		for (let i = 0; i < this.players.length; i++) {
			this.clearMessage();
			$(`.message`).html('').hide();
			// this.checkForBlackjack(i);

			let playerFinalTotal = this.players[i].handValue();
			console.log(this.players[i], `<--player ${this.players[i]}`);

			// Compare values to dealer final tally
			if (this.players[i].currentHand.length === 2 && this.players[i].currentTally === 21) {
				// Add and update player winnings
				this.players[i].playerChipStack += (this.players[i].playerBet * 2.5);
				console.log(this.players[i].playerChipStack, 'chipsatck blackjack ---');
				this.updateChipTotal();

				// Blackjack message display
				setTimeout( function() {
				}, 3200);
				setTimeout( function() {
				$(`.message`).append(`Player ${i + 1} BLACKJACK! Huzzahs and Hosannahs!`).fadeIn(1600);
				}, 3000);
				$(`.message`).hide('pulsate', 1200);
				// $(`.message`).html('');
				// this.clearMessage();

			} else if (playerFinalTotal > dealerTotal && playerFinalTotal < 22) {
				// If player wins/ update chipstack
				this.players[i].playerChipStack += (this.players[i].playerBet * 2);
				console.log(this.players[i].playerChipStack, 'new chipstack at win ---');
				this.updateChipTotal();
				
				// Win massage display
				// this.clearMessage();
				setTimeout( function() {
				}, 3200);
				setTimeout( function() {	
				$(`.message`).append(`Player ${i + 1} Wins! Huzzahs and Hosannahs!`).fadeIn(1600);
				}, 3000);
				$(`.message`).hide('pulsate', 1200);
				// $(`.message`).html('');
				// this.clearMessage();

			} else if (playerFinalTotal < dealerTotal && dealerTotal < 22) {				
				// If Player loses
				// setTimeout (function() {
				// this.players[i].playerChipStack = this.players[i].playerChipStack -
				// 	(this.players[i].playerBet);
				
				// PLayer loses message
				// this.clearMessage();
				setTimeout( function() {
				}, 3200);
				setTimeout( function() {					
				$(`.message`).append(`Player ${i + 1} loses! Harrumph and Shucks-gollygeeze-darn-it-to-heck.`).fadeIn(1600);
				}, 3000);
				setTimeout( function() {
				}, 2400);
				$(`.message`).hide('pulsate', 1200);
				// $(`.message`).html('');
				// this.clearMessage();

			} else if (playerFinalTotal === dealerTotal) {				
				//It's a push chipStack update
				this.players[i].playerChipStack += this.players[i].playerBet;
				this.updateChipTotal();
				// PUsh message
					// this.clearMessage();
				setTimeout( function() {
				$(`.message`).append(`It\'s a push, Player ${i + 1}. Keep your chips.`).fadeIn(1600);
				}, 3000);
				$(`.message`).hide('pulsate', 1200);
				// $(`.message`).html('');
				// this.clearMessage();
			}
			$(`.message`).html('');
		}
		// End game prompt
		// this.clearMessage();
		setTimeout( function() {
		} ,3000);
		$(`.message`).append('Good game y\'all\. Play again\?').fadeIn(1600);

			// Clear Table <<<<----------TODO-----<<<
			// this.clearTable();	

			// Show replay btns

	}
};
	
game.startGame();
// game.nextPlayer();
// console.log(game.currentPlayerIndex);
// console.log(game.players[0].currentHand[0].value)
// console.log(game.players[0].countAces());
// console.log(game.players[0].checkForBust();
// console.log(game.players[0].possibleValuesArray);

/*  <<<=========================================================>>>
						 JQuery Widgets
	<<<=========================================================>>> */

// Bet Sliders
$('#bet-slider-1').slider({
    orientation: 'vertical',
    min: 5,
    max: 50,
    inc: 5,
    value: 50
});

$( function() {
	$('#bet-slider-1').slider({
		orientation: 'vertical',
 		value: 5,
 		min: 5,
 		max: 50,
 		step: 5,
 		slide: function( e, ui ) {
 		  $('#slider-bet-amount').val( '$' + ui.value );
 		  // game.   <<<------TODO: hook up slider to betting ? ---- <<<<<<
 		}
	});
	$('#slider-bet-amount').val( '$' + $('#bet-slider-1').slider('value'));
});
	
// Hide Effects 

// $( function() {
    // Run the currently selected effect
    function betButtonSlideHide(playerBetting) {
      // get effect type from
      // let selectedEffect = $('#effectType').val();
      let selectedEffect = 'slide';
 
      // Most effect types need no options passed by default
      let options = {};
      // some effects have required parameters
      if (selectedEffect === 'scale') {
        options = { percent: 50 };
      } else if (selectedEffect === 'size') {
        options = { to: { width: 200, height: 60 } };
      }
 
      // Run the effect
      $(`#bet-btn-${playerBetting}, #clr-bet-btn-${playerBetting}, #plc-bet-btn-${playerBetting}`).hide( selectedEffect, options, 1000, /*callback*/ );
    };
 
    // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function() {
        $(`#bet-btn-${playerBetting}, #clr-bet-btn-${playerBetting}, #plc-bet-btn-${playerBetting}`).removeAttr('style').hide().fadeIn();
      }, 1000 );
    };
 
    function callback() {
      setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
    };

/*  <<<===========================================================>>>
					 Event Listeners
	<<<===========================================================>>> */

const $dealBtn   		= $('#deal-btn');
const $hitBtn    		= $('#hit-btn');
const $stayBtn   		= $('#stay-btn');
const $betBtn    		= $('#bet-btn');
const $clrBetBtn 		= $('#clr-bet-btn');
const $plcBetBtn 		= $('#plc-bet-btn');
const $strategyBtn 		= $('#strategy-btn');

$('#deal-btn-one').on('click', () => {
  console.log('deal btn was clicked');
  game.startDeal();
});

$('#hit-btn-one').on('click', () => {
	console.log('hit-one was clicked');
	const player = 0;
	game.hit(player);	
});
 
$('#stay-btn-one').on('click', () => {
	console.log('stay btn one click');
	const player = 0;
	game.stay(player);	
});

$('#hit-btn-two').on('click', () => {
	const player = 1;
	game.hit(player);
});

$('#stay-btn-two').on('click', () => {
	const player = 1;
	game.stay(player);	
});

$('#bet-btn-one').on('click', () => {
	const player = 0;
	$(`#bet-player-1`).html('');
	$(`.chip-total-player-1`).html('');
	game.playerBet(player);
});

$('#bet-btn-two').on('click', () => {
	const player = 1;
	$(`#bet-player-2`).html('');
	$(`.chip-total-player-2`).html('');
	game.playerBet(player);
});

$('#clr-bet-btn-one').on('click', () => {
	const player = 0;
	$(`.chip-total-player-1`).html('');
	$(`#bet-player-1`).html('').html('');
	game.clrBet(player);
});

$('#clr-bet-btn-two').on('click', () => {
	const player = 1;
	$(`.chip-total-player-2`).html('');
	$(`#bet-player-2`).html('').html('');
	game.clrBet(player);
});

$('#plc-bet-btn-one').on('click', () => {
	// $('#bet-btn-one').disabled = true;
	const player = 0;
	const playerBetting = 'one';
	$(`.chip-total-player`);
	$(`.chip-total-player-1`).html('');
	betButtonSlideHide(playerBetting);
	game.placeYourBets(player);
});

$('#plc-bet-btn-two').on('click', () => {
	// $('#bet-btn-two').disabled = true;
	const player = 1;
	const playerBetting = 'two';
	$(`.chip-total-player-2`).html('');
	betButtonSlideHide(playerBetting);	
	game.placeYourBets(player);
});

$('#strategy-btn-one').on('click', () => {
	console.log('strat one was clicked');
	const player = game.players[0];
	const dealer = game.dealer;
	game.strategy.getBasicStrategicPlay(player, dealer);
});

$('#strategy-btn-two').on('click', () => {
	console.log('strat two was clicked');
	const player = game.players[1];
	const dealer = game.dealer;
	game.strategy.getBasicStrategicPlay(player, dealer);
});










