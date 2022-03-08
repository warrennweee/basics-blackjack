//Make Deck Helper Function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥︎", "♦︎", "♣︎", "♠︎"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Initialise the shuffled card deck
var deck = shuffleCards(makeDeck());
var blackjackLimit = 21;
var playerHand = [];
var computerHand = [];

// User clicks Submit to deal cards.
var dealCard = function (){
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
};

// The cards are analysed for game winning conditions
var getHandSum = function(userHand) {
  var numAcesInHand = 0;
  var sum = 0;
  var index = 0
//Logical sequence for numbering of cards (ie. for cards 2-9, sum of cards is card1.rank + card 2.rank)
//Logical sequence for numbering of cards (ie. if card is j/q/k, card.rank =10)
//Logical sequence for numbering of cards (ie. for ace )

  while (index<userHand.length){
    var currentCard = userHand[index];
    //var currentCard = {name: "Ace",
        //suit:"♣︎",
        //rank: 1,}
    if (currentCard.rank >=2 && currentCard.rank <=10){
      sum = sum + currentCard.rank;
    } else if (currentCard.rank >=11 && currentCard.rank <=13){
      sum = sum + 10;
    } else if (currentCard.rank == 1) {
      numAcesInHand = numAcesInHand + 1
      sum = sum + 11
    };
     index +=1;
     console.log(userHand)
  };
  if (sum > blackjackLimit && numAcesInHand > 0){
  x = 0
  while (x < numAcesInHand){
    sum = sum - 10
    x +=1
  if (sum <= blackjackLimit) {
  break;
};
};
};
console.log(sum);
return sum;
};

//Various game modes 
var MODE_DEAL_CARDS = "deal and display player cards and 1 of the computer card";
var MODE_HIT_OR_STAND = "get another card or stay";
var MODE_COMPARE_CARD_SUM = "compare sum";
var MODE_RESET = "reset game";
var MODE_RESET2 = "reset game 2";
var MODE_RESET3 = "reset game 3";
var mode = MODE_DEAL_CARDS;


var printCardsInHand = function(userHand){
  var cardsInHandString = '';
  for(var index=0; index<userHand.length;index+=1){
  cardsInHandString += `[${userHand[index].name} of ${userHand[index].suit}] `;
  }
return cardsInHandString
};
bettingCounter = 100
winCounter = 0
lossCounter =0
var playerHandSum = 0
var computerStandLimit = 16
var computerHandSum = 0
var playerStandLimit = 16
var winningImage = '<iframe src="https://giphy.com/embed/LdOyjZ7io5Msw" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
var losingImage = '<iframe src="https://giphy.com/embed/mYNnMs1fZHmMM" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
var main = function (input) {

// Deal cards
if (mode == MODE_DEAL_CARDS) {
// Show player cards and first computer card
// Ask player whether they want to hit or stand
  dealCard(deck);
  playerHandSum = getHandSum(playerHand);
  console.log(playerHandSum)
  computerHandSum = getHandSum(computerHand);
  var myOutputValue = `Your cards are ${playerHand[0].name} ${playerHand[0].suit}, ${playerHand[1].name} ${playerHand[1].suit} which gives a total score of ${playerHandSum}. Your first computer card is ${computerHand[0].name} ${computerHand[0].suit} <br><br> Do you want to Hit or Stand? Type your answer and Submit`;
  mode = MODE_HIT_OR_STAND;
// If Hit, deal another card to player and check player handsum
} else if (mode == MODE_HIT_OR_STAND){
  if(input != `hit` || input != `stand`)
  myOutputValue = `please type in either "hit" or "stand"`
  if (input == 'hit'){
    playerHand.push(deck.pop());
    playerHandSum = getHandSum(playerHand);
        console.log(playerHandSum);
        console.log(blackjackLimit);
        console.log(playerHand);

// If player hand sum is less than 21, ask if they want to Hit or Stand
  if (playerHandSum <= blackjackLimit){
    myOutputValue = `Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}. <br><br> Hit or Stand?`;
    mode = MODE_HIT_OR_STAND;
// If > than 21, Game over
    } else if (playerHandSum > blackjackLimit){
      mode=MODE_RESET;
    }
// If player chooses to Stand, check computer Hand.
// If less than 16, the player will be asked to Hit.
  } else if (input ==`stand` && playerHandSum < playerStandLimit){
    myOutputValue = `Your card score will need to be more than 16! Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}. <br><br> hit?`;
    }
// If player chooses to Stand, check computer Hand.
    else if (input == 'stand'){
    for(var index = 0; index<= computerHand.length; index+=1){

      if (computerHandSum <= computerStandLimit){
      computerHand.push(deck.pop());
      computerHandSum = getHandSum(computerHand);
        console.log(computerHand)
        console.log(computerHandSum);
// If computer hand sum is greater than 21, player automatically wins.
        if (computerHandSum > blackjackLimit){
        bettingCounter += 20;
        winCounter += 1
        myOutputValue = `${winningImage}<br>Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> 😃 Congratulations, Player wins!; you've $${bettingCounter.toFixed(0)} <br> Win Counter: ${winCounter.toFixed(0)} <br> Loss Counters: ${lossCounter.toFixed(0)}!`;
        mode=MODE_RESET2;
        };
// If more than 16, Computer automatically stands.
// Compare player hand and computer hand to determine winner.
    } else if(computerHandSum > computerStandLimit){
      if (playerHandSum > computerHandSum){

// if computerhand is more than the computer stand, the computer will not draw anymore card, and program will compare player hand with computer hand
        bettingCounter = bettingCounter+ (20/3);
        winCounter += (1/3)
        myOutputValue = `${winningImage}<br>Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> 😃 Congratulations, Player wins!; you've $${bettingCounter.toFixed(0)} <br> Win Counters: ${winCounter.toFixed(0)} <br> Loss Counters: ${lossCounter.toFixed(0)}!`
        mode=MODE_RESET2;
      } else if (playerHandSum < computerHandSum && computerHandSum <= blackjackLimit){
        bettingCounter = bettingCounter - 20/3;
        lossCounter +=1/3
        myOutputValue = `${losingImage}<br>Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> 😢, Computer wins; you're left with $${bettingCounter.toFixed(0)} <br> Win Counters: ${winCounter.toFixed(0)} <br> Loss Counters: ${lossCounter.toFixed(0)}! <br> Click play to start again`
        mode=MODE_RESET3;
      };
    }
    }
  }
}
// if mode is mode reset, remove all the cards on hand and computer hand, and produce different outputmessage depending on condition
if((mode==MODE_RESET||mode==MODE_RESET2||mode==MODE_RESET3) && bettingCounter==0){
  myOutputValue = `You have currently $0 and is unable to carry on the game`
}
else if(mode==MODE_RESET){
   bettingCounter -= 20;
   lossCounter +=1
   console.log(bettingCounter)
myOutputValue = `${losingImage}<br>Your card total is ${playerHandSum}. Busted! <br> You're left with $${bettingCounter.toFixed(0)}! <br> Win Counters: ${winCounter.toFixed(0)} <br> Loss Counters: ${lossCounter.toFixed(0)}! <br> Click play to start again`
while(playerHand.length > 0) {
    playerHand.pop();
}
while(computerHand.length>0) {
    computerHand.pop();
}
mode = MODE_DEAL_CARDS;
};
if(mode==MODE_RESET2){
while(playerHand.length > 0) {
    playerHand.pop();
}
while(computerHand.length>0) {
    computerHand.pop();
}
mode = MODE_DEAL_CARDS;
};
if(mode==MODE_RESET3){
while(playerHand.length > 0) {
    playerHand.pop();
}
while(computerHand.length>0) {
    computerHand.pop();
}
mode = MODE_DEAL_CARDS;
};

  return myOutputValue;
};

