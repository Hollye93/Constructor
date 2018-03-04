const inquirer = require('inquirer');
const questions = require('./assets/questions.js')
const GameConstructor = require('./constructors/gameConstructor.js');

/////////////////////////////////////////////// /* Game Execution*/ //////////////////////////////////////////////////////////

console.log("\n Welcome to a Game of Hangman - Node Edition \n"); // Welcome Message

inquirer.prompt(questions.readyToPlay).then((answers) =>{ // Ask if the User is Ready to Play the Game

  answers = answers.ready.slice(0,1).toLowerCase(); // Store lower case sliced answer in a variable
  // Condition to Check Response
  switch(answers){
    case "y": // Player is Ready to Play a Game
      let newGame = new GameConstructor();
      newGame.newGame();
      break;
    case "n": // Player is not Ready to Play a Game
      console.log("\n Thank you for your time! \n");
      process.exit();
      break;
    default:
      console.log("\n Not a valid Input \n");
      break
  }; // End Switch
}); // End Game