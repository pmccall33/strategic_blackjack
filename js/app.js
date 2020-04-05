console.log('Howdy- Blackjack');

import { Strategy } from './classes/Strategy.js';
import { Deck } 	from './classes/Deck.js';
import { Card } 	from './classes/Card.js';
import { Player } 	from './classes/Player.js';

// TODO : 	-Fix all the stuff and things and make it all better
// 	  	  	-switch testing and fixes
//		  	-get methods in classes?


/*  <<<======================================================>>>
		 					Game Object 
	<<<=====================================================>>> */

const game = {
	deck: null,
	shoe: [],
	numOfDecks: 1,
	numOfPlayers: 2,
	players: [],
	currentPlayerIndex: 0,
	player: null,
	dealerHand: [],
	countedCardsArr: [],
	currentCountOdds: 48.3,
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

	createDeckShoe() {
	  	// Create shoe of multiple decks
	    for (let i = 0; i < this.numOfDecks; i++) {
	    	this.shoe.push(this.Deck.shuffleCards());
	    }
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
		this.dealerInitialDeal(); // <================ TESTING ONLY ====<<<
								  // delete and uncomment at line 658
	},

	updateChipTotal(player) {
		$(`.chip-total-player-1`).html('');
		$(`.chip-total-player-2`).html('');
		$(`.chip-total-player-1`).append(this.players[0].playerChipStack.toString());
		$(`.chip-total-player-2`).append(this.players[1].playerChipStack.toString());
	},

	nextPlayer(players, player) {
	    if (this.currentPlayerIndex < (this.numOfPlayers - 1)) {
	      this.currentPlayerIndex += 1;
	      this.checkForBlackjack(this.players, this.currentPlayerIndex);
	    } else {
	      this.dealerPlay();	
	    };
	},

	placeYourBets(player) {							

		// Display playerChipStacks
		this.updateChipTotal(player);

		// Place bets here and don't deal cards until betting is done		
		this.players[player].playerBetPlaced = true;

		if (this.players[0].playerBetPlaced && this.players[1].playerBetPlaced) {
			this.startDeal();
		};

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
		console.log((this.players[player].currentHand.length === 2) && (this.players[player].currentTally === 21));
		// Check for blackjack conditions and add winnings to chipstack
		if ((this.players[player].currentHand.length === 2) && (this.players[player].currentTally === 21)) {
			this.players[player].playerBlackjack = true;
			this.players[player].playerChipStack += (this.players[player].playerBet * 1.5);
			
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
		};
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

			this.countedCardsArr.push(card1, card2);
		};
		// this.dealerInitialDeal();   <<======== UNCOMMENT AFTER TESTING ===
		// Get/Set initial odds
		// ClearOdds() if necessary here <----------
		this.checkForBlackjack(this.players, this.currentPlayerIndex);
	},	
	
	playerBet(player) {
		// Set betting status to true and increment by 5
		this.players[player].playerBetPlaced = true;
		this.players[player].playerBet += 5;
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
		console.log(player, this.currentPlayerIndex, this.players[player].playerBetPlaced, this.players[player].playerBet !== 0, this.players[player].currentHand.length, 'player data at hit');
		console.log(player === this.currentPlayerIndex && this.players[player].playerBetPlaced && this.players[player].playerBet !== 0, 'bool comparison at hit' );


		if (player === this.currentPlayerIndex && this.players[player].playerBetPlaced && this.players[player].playerBet !== 0 ) {		
			if (this.players[player].currentHand.length < 5) {
				// player dealt a card
				const card = this.deck.dealCard();
				this.players[player].receiveCard(card);
				this.countedCardsArr.push(card);
				
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

	doubleBet(player) {
		// when doubling is allowed <<<<<---
		if (player === this.currentPlayerIndex) {
			// Double playerBet and update chipstack and betbox
			this.players[player].playerChipStack -= this.players[player].playerBet;
			this.players[player].playerBet *= 2;
			this.updateChipTotal();
			// $(`#bet-player-${player + 1}`).append(this.players[player].playerBet.toString());
			// this.players[player].playerChipStack -= 5;
			// $(`.chip-total-player-${player + 1}`).append(this.players[player].playerChipStack.toString());
		};
	},

	stay(player) {		// <------ playerIndex passed ;in as arg
		if (player === this.currentPlayerIndex)	{
			// Update player data and call for next player
			this.players[player].checkForBust();
			this.players[player].handValue();
			this.nextPlayer(this.players, this.currentPlayerIndex);
		}		
	},

	dealerInitialDeal() {											
		// Add card element to the dealer card div
		const card1 = (this.deck.dealCard());
		$('#dealer-cards #card-one').append(card1.getHTML());
		this.dealer.receiveCard(card1);
		this.countedCardsArr.push(card1);
		this.dealer.handValue();
	},

	dealerHand() {												
		this.dealer.handValue();
	},

	dealerPlay() {
		// Get dealer's currentTally
		this.dealerHand();
		this.dealer.checkForBust();

		console.log(this.dealer, '<<<--- this.dealer')
		$(`.message`).html('');
		// setTimeout(function() {
		// $(`.message`).append('Dealer has... .');
		// }, 6000); 

	    // 'Flip' down card
	    $(`#dealer-card-reverse`).hide();
	    $(`#dealer-cards #dealer-card-two`).append(this.dealer.currentHand[0].getHTML());
	   	$('#dealer-cards #card-one').hide();


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
				this.updateChipTotal();
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
			} else if (playerFinalTotal < 22 && dealerTotal > 21) {
				this.players[i].playerChipStack += this.players[i].playerBet;
				this.updateChipTotal();	
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
 
    // function callback() {
    //   setTimeout(function() {
    //     $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    //   }, 1000 );
    // };

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

$('#dbl-btn-one').on('click', () => {
	console.log('dbl 1 was clicked');
	const player = 0;
	game.doubleBet(player);
});

$('#dbl-btn-two').on('click', () => {
	console.log('dbl 2 was clicked');
	const player = 1;
	game.doubleBet(player);
});

$('#split-btn-one').on('click', () => {
	console.log('split 1 clicked');
	const player = 0;
	game.splitHand(player);
});

$('#split-btn-one').on('click', () => {
	console.log('split 2 clicked');
	const player = 1;
	game.splitHand(player);
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
	// $('#bet-btn-one').disabled = true;  		// TODO disable so the user 							cannot double click while btn is fadin out
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

$('#strategy-btn-two').on('click', () => {
	console.log('strat two was clicked');
	const player = game.players[1];
	const dealer = game.dealer;
	console.log('Strategy master says:', game.strategy.getBasicStrategicPlay(player, dealer));
});

$('#strategy-btn-one').on('click', () => {
	console.log('strat one was clicked');
	const player = game.players[0];
	const dealer = game.dealer;
	console.log('Strategy master says:', game.strategy.getBasicStrategicPlay(player, dealer));
});

$('#odds-btn-two').on('click', () => {
	console.log('odds two was clicked');
	const player = game.players[1];
	const dealer = game.dealer;
	const countedCardsArr = game.countedCardsArr;
	const currentCountOdds = game.currentCountOdds;
	game.strategy.getOdds(player, dealer, countedCardsArr, currentCountOdds);
});

$('#odds-btn-one').on('click', () => {
	console.log('odds one was clicked');
	const player = game.players[0];
	const dealer = game.dealer;
	const countedCardsArr = game.countedCardsArr;
	const currentCountOdds = game.currentCountOdds;
	game.strategy.getOdds(player, dealer, countedCardsArr, currentCountOdds);
});

$('#count-btn-one').on('click', () => {
	console.log('count two was clicked');
	const countedCardsArr = game.countedCardsArr;
	const currentCountOdds = game.currentCountOdds;
	const dealer = game.dealer;
	game.strategy.getCount(dealer, countedCardsArr, currentCountOdds);
});

$('#count-btn-two').click(function() {
	console.log('count one was clicked');
	const countedCardsArr = game.countedCardsArr;
	const currentCountOdds = game.currentCountOdds;
	const dealer = game.dealer;
	game.strategy.getCount(dealer, countedCardsArr, currentCountOdds);
});

// Sample slick script
// $(document).ready(function(){
//     $('.your-class').slick({
//     	setting-name: setting-value
//     });
// });




