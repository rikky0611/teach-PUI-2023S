//===========================================================
// Number guessing game for use as JavaScript Intro v1.1
// from MDN: 
//   https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
//
// Implements a simple game based on this prompt:
//   Create a simple guess the number type game. It should choose a random number 
//   between 1 and 100, then challenge the player to guess the number in 10 turns. 
//   After each turn, the player should be told if they are right or wrong, and 
//   if they are wrong, whether the guess was too low or too high. It should also 
//   tell the player what numbers they previously guessed. The game will end once 
//   the player guesses correctly, or once they run out of turns. When the game ends, 
//   the player should be given an option to start playing again.
//   
//   See the above web page for full explaination of program design.
//
// Version history
//   v1.0  Original from MDN tutoral page (with lots of surrounding explanatory text)
//   v1.1  Properly commented stand-alone version, Scott Hudson, CMU HCII, 1/2023

//-----------------------------------------------------------
//  HTML elements
//    In addition to text to prompt the user to play the game, this code makes use of 
//    the following elements in the HTML for proper operation:

// Display of game state (div)
const guesses = document.querySelector('.guesses');

// Display of last guess (p)
const lastResult = document.querySelector('.lastResult');

// Display of whether there last guess was high or low (p)
const lowOrHi = document.querySelector('.lowOrHi');

// Form submission element to let the user submit a guess (input type="submit")
const guessSubmit = document.querySelector('.guessSubmit');

// Form element for the guess (input type="number")
const guessField = document.querySelector('.guessField');

// Button used to restart the game (button, created dynamically by this code in setGameOver())
let resetButton;

//-----------------------------------------------------------
// Variables tracking game state
// 

// The number the user is trying to guess
let randomNumber = Math.floor(Math.random() * 100) + 1;

// How many guesses so far
let guessCount = 1;

//-----------------------------------------------------------
// Callback invoked when the user submits a guess (listener for 'click' on guessSubmit)
//   This function checks whether the user has correctly guessed the number, in which 
//   case it displays a message and ends the game.  If not, it checks the number of
//   guesses, and if we are at the limit, ends the game.  Otherwise, it displays a high
//   or low message, updates the previous guesses displays, and returns (continuing
//   the game as normal, waiting for the next guess input).
//
function checkGuess() { 
    // extract the value of the user's guess 
    const userGuess = Number(guessField.value);

    // if this is the first guess set up the prefix text on the previous guesses display
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';

    // did they guess right?
    if (userGuess === randomNumber) {
	// set up win display and clear the low/high indicator
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';

        setGameOver();

    // are we at the limit of guesses?
    } else if (guessCount === 10) {
        // set up over display
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';

        setGameOver();
    } else {
        // set up wrong and low/high displays
        lastResult.textContent = 'Wrong!';
        if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!' ;
            lastResult.style.backgroundColor = 'salmon';
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
            lastResult.style.backgroundColor = 'darkred';
        }
    }

    // count the guess
    guessCount++;
    
    // clear the old guess value
    guessField.value = '';

    // force the guess value box to be the focus so any typed text goes there
    guessField.focus();
}

//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
// Make checkGuess() the lister for clicks submitting a guess
//
guessSubmit.addEventListener('click', checkGuess);

//-----------------------------------------------------------
// This function sets things to a state corresponding to the game being over 
// This includes inserting a reset button which has to be pressed to restart the game
// and disabling all other input elements, but leaving the display elements alone.
//
function setGameOver() {
    // disable things to game can't be played
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // put in a reset button and have resetGame() respond to that
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

//-----------------------------------------------------------
// Callback invoked when the reset button is pressed
// This resets the game to a starting configuration.  Established as listener in 
// setGameOver() when the reset button is created.
//
// TODO: this should really be called at the start of play to initialize eveything
//       uniformly and in one place.
//
function resetGame() {
    // no count yet
    guessCount = 1;

    // clear the text from all the display elements 
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

//===========================================================
