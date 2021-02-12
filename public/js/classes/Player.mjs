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

  // Return possibleHanValuesArr
  getPossibleHandValuesArr(player) {
    // get players currentTally
    this.currentTally = 0;
    for (let i = 0; i < this.currentHand.length; i++) {
          this.currentTally += this.currentHand[i].value;
        };

    // create possible values array
    this.possibleValuesArray = [this.currentTally];

    // update currentTally possiblity for number of aces
    const numAces = this.countAces();

    // for each ace check and push value into possibleValues
    for (let i = 0; i < numAces; i++) {
            this.currentTally -= 10;
          this.possibleValuesArray.push(this.currentTally);
        };

    const possibleHandValuesArr = this.possibleValuesArray;

    return possibleHandValuesArr
  }


	checkForBust(player) {					// Also here????
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
        for (let i = 0; i < this.possibleValuesArray.length; i++) {
        	if (this.possibleValuesArray[i] <= 21 &&
        		this.possibleValuesArray[i] > highestValue) {
        		highestValue = this.possibleValuesArray[i];
        	}
        }
        this.currentTally = highestValue;
        return highestValue;
	}
};

export { Player };
