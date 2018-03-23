function qSel( q ) { return document.querySelector( q ); }

// Game values
let 
    max             = 10,
    min             = 1,
    guessesLeft     = 3,
    winningNum      = getRandomNum( min, max );


// UI elements
const game          = qSel( '#game' ),
      guessBtn      = qSel( '#guess-btn' ),
      guessInput    = qSel( '#guess-input' ),
      message       = qSel( '.message' ),
      minNum        = qSel( '.min-num' ),
      maxNum        = qSel( '.max-num' );

// Assign UI min & max
minNum.textContent  = min;
maxNum.textContent  = max;
console.log(this);

// Listens for play again event
game.addEventListener( 'mousedown', function( e ) {
    if( e.target.className === 'play-again' ) {
        window.location.reload();
    }
} );

// Listens for player guess
guessBtn.addEventListener( 'click', function( ) {
    let guess       = parseInt( guessInput.value );

    // Validates guess
    if( isNaN( guess ) || guess < min || guess > max ){
        setMessage( `Please enter a number between ${min} and ${max}`, 'red' );
    }

    // Checks if player won
    if( guess === winningNum ) {
        // Game over - won
        gameOver( true, `${winningNum} is correct, YOU WIN!` );
    } else {
        // Wrong number
        guessesLeft         -= 1;

        if( guessesLeft === 0 ) {
            // Game over - lost
            gameOver( false, `Game over, you lost. The correct answer was ${winningNum}.` );

        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';
            // Clear input
            guessInput.value = '';
            // Inform user of wrong number
            setMessage( `${guess} is not correct, ${guessesLeft} guesses remain.`, 'red' );
        }
    }
} );

// Game over
function gameOver ( won, msg ) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input, change border color, set response message
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage( msg, color );

    // Play again?
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum( min, max ) {
    return Math.floor(Math.random() * ( max - min + 1 ) +1 );
}

// Sets the message text & color 
function setMessage( msg, color ) {
    message.style.color = color;
    message.textContent = msg;
}
