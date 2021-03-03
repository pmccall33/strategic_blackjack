
// Original odds using basic strategy. Add in dealt card to get final percetage.
Dealer's Up Card	Dealer Odds of Busting	Player Advantage Percentage
2						35.30%						9.8%
3						37.56%						13.4%
4						40.28%						18.0%
5						42.89%						23.2%
6						42.08%						23.9%
7						25.99%						14.3%
8						23.86%						5.4%
9						23.34%						-4.3%
10					21.43%					  -16.9%
J						21.43%						-16.9%
Q						21.43%						-16.9%
K						21.43%						-16.9%
A						11.65%						-16.0%

Total Hand Value	Probability of Going Bust
21							100%
20							92%
19							85%
18							77%
17							69%
16							62%
15							58%
14							56%
13							39%
12							31%
11 or less	0%

Two Card Combination	Frequency Percentage
Natural 21 Blackjack	4.8%
Hard Standing (17 - 20)	30.0%
Decision Hands (2-16)	38.7%
No Bust	26.5%
Total (all two card hands)	100%

// Track dealt cards and add to dealerUpCard odds to get current odds
Removed Card	Effect on Odds
2					0.40%
3					0.43%
4					0.52%
5					0.67%
6					0.45%
7					0.30%
8					0.01%
9					-0.15%
10					-0.51%
Jack				-0.51%
Queen				-0.51%
King				-0.51%
Ace					-0.59%


Dealer Final Hand	Probability of Getting Final Hand ---
Natural Blackjack				4.82%
21 (more than 2 cards)			7.36%
20								17.58%
19								13.48%
18								13.81%
17								14.58%
Non-Bust (less than 21)			71.63%
Bust (more than 21)				28.37%


This rule is sometimes called the "Reno" rule, which restricts doubling only to certain hand totals. Double 9 - 11 affects the house edge increasing it by 0.09% (8 decks game) and 0.15% (1 deck game). Double 10-11 increases the house edge by 0.17% (8 decks game) and 0.26% (1 deck game).

Good for player
1 deck of cards (house edge 0.17%)
Doubling allowed on any cards
Doubling allowed after Split and after Hit (player edge 0.12%)
Early surrender is preferable
Dealer stands on soft 17 (player edge 0.2%)
Resplitting any cards allowed (player edge 0.03%)


Two Card Hand
Hand value  % frequency
21  4.8
17-20 30
1-16  38.7
No Bust 26.5

// DEALER'S UP CARD -> DEALER'S FINAL TOTAL -----------#### ONE DECK
        17      18        19        20          21      BUST
Ace 0.183786  0.19089   0.18868   0.191692  0.075137  0.169815
2   0.138976  0.131762  0.131815  0.123948  0.120526  0.352973
3   0.130313  0.130946  0.123761  0.123345  0.116047  0.375588
4   0.130973  0.114163  0.120679  0.116286  0.115096  0.402803
5   0.119687  0.123483  0.116909  0.104694  0.106321  0.428905
6   0.166948  0.106454  0.107192  0.100705  0.097879  0.420823
7   0.372345  0.138583  0.077334  0.078897  0.072987  0.259854
8   0.130857  0.362989  0.129445  0.06829   0.069791  0.238627
9   0.121886  0.103921  0.357391  0.12225   0.061109  0.233442
10  0.124156  0.122486  0.124421  0.356869  0.03957   0.232499
All 0.153225  0.145065  0.141657  0.184722  0.077364  0.297967


DEALER'S UP CARD --> DEALER'S FINAL TOTAL -------------##### TWO DECKS
      17        18        19        20        21        BUST
Ace 0.186367  0.189883  0.188851  0.190272  0.076531  0.168096
2   0.139367  0.133348  0.130744  0.123997  0.119254  0.353291
3   0.132764  0.130676  0.124575  0.121811  0.11538   0.374794
4   0.130704  0.120208  0.121038  0.116366  0.113145  0.39854
5   0.121005  0.122831  0.117318  0.109022  0.10732   0.422505
6   0.166224  0.10617   0.106749  0.101217  0.097508  0.422132
7   0.370478  0.138195  0.078013  0.078781  0.07339   0.261143
8   0.129697  0.361182  0.129025  0.068857  0.06961   0.24163
9   0.12094   0.112016  0.354051  0.121118  0.060977  0.230898
10  0.122412  0.1216    0.122524  0.36387   0.038449  0.231144
All 0.152784  0.145746  0.140865  0.186996  0.076841  0.296767

