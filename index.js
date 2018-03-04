// Link in the Inquirer Package
var inquirer = require('inquirer');



// Link the list of random words
var guessWordList = require('./game.js');

// Link in the word tester
var checkForLetter = require('./word.js');

// Link in the letters to display
var lettersToDisplay = require('./letter.js');



var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayHangman;




//Create an Game OBject 

var game = {

  wordBank : guessWordList, // import a list of words
  guessesRemaining : 10, // per word
  currentWrd : null, // the word object


  startGame : function(){
    this.guessesRemaining = 10;

    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    console.log('Subject is Programming Languages, let us get started!');

    displayHangman = new lettersToDisplay(this.currentWrd);
    displayHangman.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);

    keepPromptingUser();
  }

};



// User Prompt Function (stand alone b/c of scoping issues inside the game object) 

function keepPromptingUser(){

  // Always make a gap between inputs
  console.log('');

  // If enough guesses left, then prompt for new letter
  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      // Collect Letter Input
      var inputLetter = userInput.letter.toLowerCase();
      
      // Valid input
      if(alphabet.indexOf(inputLetter) == -1){

        // Tell user they did not guess a letter
        console.log(inputLetter + '" is not a letter. Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        // Tell user they already guessed that letter
        console.log('You already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else{

        // Remove the entry from the list of possible inputs
        lettersAlreadyGuessed.push(inputLetter);


        // Check for the letter in the word
        var letterInWord = checkForLetter(inputLetter, game.currentWrd);

        // If the letter is in the word, update the letter object
        if(letterInWord){

          // Add to correct letters list
          lettersCorrectlyGuessed.push(inputLetter);

          // Show the empty letters ( _ _ _ _ ) and guesses, etc.
          displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
          displayHangman.parseDisplay();


          // Test if the user has won
          if(displayHangman.winner){
            console.log('You win!');
            return;
          }
          // Not a win yet, so ask for another input and decrement guesses
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            keepPromptingUser();
          }

        }
        // Otherwise, decrement guesses and re-prompt the old hangman object
        else{
          game.guessesRemaining--;


          displayHangman.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          keepPromptingUser();
        }
        
      }

    });
    
  }
  // If not enough guesses left, then user losses
  else{
    console.log('Bummer, dude. I guess you\'re no brogrammer, afterall.');
    console.log('Try again when you can bench 200 lb and type 120 wpm... while drinking.');
    console.log('Oh yeah. FYI. The word was "' + game.currentWrd + '".');
  }

}


// Create a new game object using the constructor and begin playing
game.startGame();