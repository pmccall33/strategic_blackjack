import { strategyTesting }  from './strategy_testing.mjs';
import { Deck }				from '../js/classes/Deck.mjs';
import { Player } 			from '../js/classes/Player.mjs';
import { Strategy }			from '../js/classes/Strategy.mjs';
import { HelperFunctions }	from '../js/HelperFunctions.mjs';

// const deck = new Deck();
const strategy = new Strategy();

const localPlayerHandsVsDealerObj = strategyTesting.playerHandsVsDealerObj;
// console.log(localPlayerHandsVsDealerObj, 'first local obj');

// Define expected outputs from getBasicStrategy(player, dealer) from class Strategy

// create function to convert face cards to card value
const convertFaceCards = (obj) => {
		let nObj = {};
	for (let key in obj) {
		nObj[key] = obj[key].flat()
		.map( e => {
			if (e === 'A') {
				return 11;
			} else if (e === 'K' || e === 'Q' || e === 'J') {
				return 10;
			} else {
				return e;
			};
		});
	};

	for (let key in nObj) {
		nObj[key] = [[nObj[key][0], nObj[key][1]], nObj[key][2]];
	};

	// console.log(nObj, '- nObj');
	return nObj;
};

const nObj = convertFaceCards(localPlayerHandsVsDealerObj);
// console.log( nObj);

// Range function (optional step inc)
const range = (start, stop, step = 1) =>
  Array(Math.ceil(((stop + 1)  - start) / step)).fill(start).map((x, y) => x + y * step);


// ========================================
// 				Hard Total Logic
// ========================================

	// build arr of possible player hand totals vs dealer up card totals
	const hardTotalComparison = () => {		
		const playerHandTotalVsDealerUpCard = [];
		const dealerCard = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		const playerTotal = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
		for (const total in playerTotal) {
			for (const card in dealerCard) {
				playerHandTotalVsDealerUpCard.push([playerTotal[total],dealerCard[card]]);
			};
		};
		return playerHandTotalVsDealerUpCard;
	};

	// returns arr of possible player hand totals vs dealer card in the form    	- [playerTotal, dealerTotal]
	const hardTotalPlayerAndDealerArr = hardTotalComparison();

	//create hard total hit range
	const hardTotalHitRange = [];
	hardTotalHitRange.push(range(0, 70), range(75, 79), 88, 89, 100, 101, range(105, 109), range(115, 119), range(125, 129), range(135, 139), range(145, 149));

	// flatten and create obj - hardHit
	const hardHitObj = hardTotalHitRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Hit'}), {});
	// console.log(hardHitObj);

	// create hardStayRange
	const hardTotalStayRange = [];
	hardTotalStayRange.push(range(102, 104), range(110, 114), range(120, 124), range(130, 134), range(140, 144), range(150, 159), range(160, 199));

	// flatten and create obj - hardStay
	const hardStayObj = hardTotalStayRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Stay'}), {});
	// console.log(hardStayObj);

	// create hard Double Range
	const hardTotalDoubleRange = [range(71, 74), range(80, 87), range(90, 99)];
	// console.log(hardTotalDoubleRange);

	// flatten and create obj - hardStay
	const hardDoubleObj = hardTotalDoubleRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Double'}), {});
	// console.log(hardDoubleObj);

	// create full hard total expected result obj
	const hardTotalExpectedOutcomeObj = Object.assign(hardHitObj, hardStayObj, hardDoubleObj);
	console.log(hardTotalExpectedOutcomeObj);
	

// ========================================================
// 					Split/Double/Soft Outcomes
// ========================================================

function getSplitDoubleStayExpectedOutcomesObj()  {
	const strategyExpectedOutcomes = {}
	
	// Get split outcomes and set expected result
	const splitRange = [];
	splitRange.push(range(0, 12), range(723, 727), range(720, 721), range(819, 831), range(917, 922), range(996,1000), range(1113,1114), range(1151, 1156), range(1177, 1182));
	
	// flatten splitRange Arr
	const flatSplitArr = splitRange.reduce((acc, cur) => acc.concat(cur), []);

	// Create obj from the arr	
	const splitObj = flatSplitArr.reduce((acc, cur) => ({ ...acc, [cur]: 'Split'}), {});
	// console.log(splitObj);

	// Get dont' split outcomes
	const dontSplitRange = [];
	dontSplitRange.push(range(169, 181), range(325,337), range(468, 480), range(598, 610), 722, range(15, 19), range(910, 916), range(988, 995), range(1053, 1065), range(1105, 1112), range(1115, 1117), range(1114, 1150), range(1170,1176));
	// console.log(dontSplitRange);

	// flatten dontSplit and create obj
	const dontSplitObj = dontSplitRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Don\'t Split'}), {});
	// console.log(dontSplitObj);

	// soft total range - softStay
	const softStayRange = [];
	softStayRange.push(range(65, 77), range(78, 85), range(87, 90), range(78, 85), range(97, 98));

	// flatten and create obj - sofStay
	const softStayObj = softStayRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Stay'}), {});
	// console.log(softStayObj);

	// create softDoubleRangeArr
	const softDoubleRange = [];
	softDoubleRange.push(86, range(99, 103), range(112, 115), range(125, 127), range(138, 140), 152, 153, 164, 165);
	// console.log(softDoubleRange);

	// flatten and create obj - softStay
	const softDoubleObj = softDoubleRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Double'}), {});
	// console.log(softDoubleObj);

	// create soft hit range
	const softHitRange = [];
	softHitRange.push(range(91, 96), range(104, 111), 116, range(117, 124), 128, 129, range(130, 137), 141, 142, range(143, 150), range(153, 155), range(156, 163), range(166, 168));

	// flatten and create obj - softStay
	const softHitObj = softHitRange.reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: 'Hit'}), {});
	// console.log(softHitObj);

	//create 21 total arr
	const twentyOneCaseObj = [range(13, 64)].reduce((acc, cur) => acc.concat(cur), []).reduce((acc, cur) => ({...acc, [cur]: '21'}), {});

	// create full split, double and stay outcomes object
	const splitDoubleStayExpectedOutcomesObj = Object.assign(twentyOneCaseObj, softHitObj, softDoubleObj, softStayObj, splitObj, dontSplitObj);
	// console.log(splitDoubleStayExpectedOutcomesObj);

	return splitDoubleStayExpectedOutcomesObj;
};

// returns the object of { hand index: 'OUtcome' }
const pairSoftTotalExpectedOutcomesObj = getSplitDoubleStayExpectedOutcomesObj();
// console.log(pairSoftTotalExpectedOutcomesObj);

// instantiate player and dealer object for each possible hand from (nObj)
const createPlayer = (arr, rankArr) => {
	const player = new Player;
	player.currentHand = [{value: arr[0], rank: rankArr[0]}, {value: arr[1], rank: rankArr[1]}];
	// player.currentHand = [arr[0], arr[1]];
	// let key;
	// player.currentHand[0].rank = rankObj[key][0][0];
	// player.currentHand[1].rank = rankObj[key][0][1];
	// console.log(player.currentHand[0].rank = rankObj[key][0][0]);

	player.currentTally = arr[0] + arr[1];
	player.handValue = player.currentTally;
	if (player.currentHand[0] === 11 || player.currentHand[1] === 11) {
		player.playerHasAce = true;
	};
	return player;
};
	// this.dealerUpCardValue = dealer.currentHand[0].value;
const createDealer = (card) => {
	const dealer = new Player;
	const obj = new Object;
	obj.value = card;
	dealer.currentHand = [obj];
	dealer.currentTally = card;
	dealer.dealerUpCardValue = card;
	return dealer;
};

// iterate over nObj (all possible hands to compare) to create all players and dealers
// console.log(nObj);
const createPlayers = (obj, rankObj) => {
	let playersAndDealersArr = [];
	for (let key in obj) {
		const player = createPlayer(obj[key][0], rankObj[key][0]);
		const dealer = createDealer(obj[key][1], rankObj);
		// player.currentHand

		playersAndDealersArr.push([player, dealer]);
	};
	return playersAndDealersArr;
};

const playerDealerHandsTestingObjArr = createPlayers(nObj, localPlayerHandsVsDealerObj);
// console.log(playerDealerHandsTestingObj);	// returns arr of format - 		     	[[{player}, {dealer}], ...[]]

// pass testing object into getBasicStrategy() to get expected outcomes 



// console.log(hardTotalPlayerAndDealerArr);
console.log(nObj);  // {[[player.currentHand[0], player.currentHand[1], dealer.dealerUpCard]]}
// console.log(hardTotalExpectedOutcomeObj); // {'index': 'recommendedPlay'}
console.log(playerDealerHandsTestingObjArr[719][0]);


// take in players object and feed into getBasic strategy to get actual outcomes
const getStrategyActualOutcomes = (playersObjArr) => {
	const strategyActualOutcomes = {};
	let index = 0;
	let result;
	console.log
	playersObjArr.forEach(e => {
		result = strategy.getBasicStrategicPlay(e[0], e[1]);
		strategyActualOutcomes[index] = result;
		index++;
	});
	// console.log(strategyActualOutcomes, 'actOutcomes');
	return strategyActualOutcomes;
};

const strategyActualOutcomes = getStrategyActualOutcomes(playerDealerHandsTestingObjArr);

console.log(pairSoftTotalExpectedOutcomesObj, 'expOutcomes');
console.log(strategyActualOutcomes[34], 'actOut')
// take in two objs and compare expected vs actual outcomes
const compareOutcomes = (actObj, expObj) => {
	const testResult = {};
	for (let indx in actObj) {
		console.log(actObj[indx], expObj[indx],indx, 'act/exp');
		if (expObj[indx]) {
			actObj[indx].toLowerCase().includes(expObj[indx].toLowerCase()) ? testResult[indx] = '✅' : testResult[indx] = `‼️ Err at ${indx}, returned -${actObj[indx]}/ expected -${expObj[indx]}.`;
		};
	};
	// actObj.reduce((acc, cur) => ({...acc, [cur]: 
	// 	actObj[cur].toLowerCase().includes(expObj[cur].toLowerCase())
	// }, {}));
	console.log(testResult);
	return testResult;
};


// compareOutcomes(strategyActualOutcomes, pairSoftTotalExpectedOutcomesObj);






	// // add first two els of arr to get player hand total v dealer upCard
	// const playerTotalVsDealerObj = (obj) => {
	// 		// console.log(obj)
	// 	for (let key in obj) {
	// 		// console.log(obj[key], 'pvd');
	// 		obj[key].map( e => {

	// 		})
	// 	};
	// };

	// playerTotalVsDealerObj(convertFaceCards(localPlayerHandsVsDealerObj));
// // 	// iteerate over localPlayerHands object and flatten and add hand arr to get hand total
// 	for (let key in localPlayerHandsVsDealerObj) {
// 		let cardTotalObj = 
// 		localPlayerHandsVsDealerObj[key].map(e => {
// 			e === 'A' ? e => 11 : e ;

// 			// switch (e) {
// 			// 	case 'A':
// 			// 		return localPlayerHandsVsDealerObj[e].splice(e, 1, 11);
// 			// 		break;
// 			// 	case 'K':
// 			// 	case 'Q':
// 			// 	case 'J':
// 			// 		return localPlayerHandsVsDealerObj[e].splice(e, 1, 10);
// 			// 		break;
// 			// 	default:
// 			// 		console.log('Error in switch');
// 			// 		break;
// 			// };
// 		});
// 		// console.log(cardTotalObj, 'cardTotalObj');
// 		return cardTotalObj;
// 	};


// 	for (let key in localPlayerHandsVsDealerObj) {
// 		localPlayerHandsVsDealerObj[key] = localPlayerHandsVsDealerObj[key].reduce((acc, cur) => parseInt(acc) + parseInt(cur));
// 	};
// 	// console.log(localPlayerHandsVsDealerObj);

// 	// strategyExpectedOutcomes = 'Split';
// 	// console.log(strategyExpectedOutcomes);



// export { strategyExpectedOutcomes };