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

// Initialise the shuffled card deck before the game starts.
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

// The cards are analysed for game winning conditions, e.g. Blackjack.
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


// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
var MODE_DEAL_CARDS = "deal and display player cards and 1 computer card";
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
// If Hit, deal another card to player and check player hand sum
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
      //myOutputValue = `Your card total is ${playerHandSum}. Game over!`;
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

// Spent a good 1hr on this betting counter and I have honestly no idea how this works..
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

/*
// Declare Game modes
var GAME_START = 'game start';
var GAME_CARDS_DRAWN = 'cards are drawn';
var GAME_RESULTS_SHOWN = 'results are shown';
var GAME_HIT_OR_STAND = 'hit or stand';
var currentGameMode = GAME_START;

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  var deck = [];
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      if (cardName == 1) {
        cardName = 'ace';
      }
      if (cardName == 11) {
        cardName = 'jack';
      }
      if (cardName == 12) {
        cardName = 'queen';
      }
      if (cardName == 13) {
        cardName = 'king';
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//  ================================================= 
//  ================ GAME FUNCTIONS ================ 
//  ================================================ 

// Function that checks a hand for black jack
var checkForBlackJack = function (handArray) {
  // Loop through player hand 
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios  
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (  
    (playerCardOne.name == 'ace' && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == 'ace' && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (currCard.name == 'king' || currCard.name == 'queen' || currCard.name == 'jack') {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == 'ace') {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }
  
  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value 
  // when totalHandValue is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// Function that displays the player and dealers hand in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = 'Player hand:<br>';
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = playerMessage + '- ' + playerHandArray[index].name + ' of ' + playerHandArray[index].suit + '<br>';
    index = index + 1;
  }

  index = 0;
  var dealerMessage = 'Dealer hand:<br>';
  while (index < dealerHandArray.length) {
    dealerMessage = dealerMessage + '- ' + dealerHandArray[index].name + ' of ' + dealerHandArray[index].suit + '<br>';
    index = index + 1;
  }

  return playerMessage + '<br>' + dealerMessage;
};

// Function that displays the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage = '<br>Player total hand value: ' + playerHandValue + '<br>Dealer total hand value: ' + dealerHandValue;
  return totalHandValueMessage;
};

// ================================================= 
// ================= MAIN FUNCTION ================ 
// ================================================ 

var main = function (input) {
  var outputMessage = '';

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // create a deck of cards 
    gameDeck = createNewDeck();

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    
    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
    outputMessage = 'Everyone has been dealt a card. Click button to calculate cards!';

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Its a Black Jack Tie!';
      } 
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Player wins by Black Jack!';
      } 
      // Condition when only dealer has black jack
      else {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Dealer wins by Black Jack!';
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';
      
      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == 'hit') {
      playerHand.push(gameDeck.pop());
      outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br> You drew another card. <br>Please input "hit" or "stand".';
    }
    
    // Condition where player inputs 'stand'
    else if (input == 'stand') {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Conditions for tied game
      if ((playerHandTotalValue == dealerHandTotalValue) ||
          (playerHandTotalValue > 21 && dealerHandTotalValue > 21)) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Its a Tie!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } 
      
      // Conditions for player win
      else if ((playerHandTotalValue > dealerHandTotalValue && playerHandTotalValue <= 21) ||
                (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)) { 
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Player wins!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } 

      // Dealer wins when above two conditions are not met
      else {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Dealer wins!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      currentGameMode = GAME_RESULTS_SHOWN;
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage = 'wrong input... only "hit" or "stand" are valid.<br><br>' + displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    // return output message
    return outputMessage;
  }
};
*/
