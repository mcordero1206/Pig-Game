/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


LESSONS COVERED:

+++ Creating fundamental program variables
+++ Generating random numbers
+++ Manipulating the DOM with vanilla JS
+++ Manipulating CSS styles with vanilla JS
+++ Setting up event handlers
+++ Call back functions
+++ Anonymous functions
+++ Ternary operator
+++ Manipulatig HTML classes
*/

var scores, roundScore, activePlayer, gamePlaying, scoreCap;

init();

var lastDice;

//Activates pop up notification when user hovers over score-input box
var scoreInput = document.querySelector('.score-input');

scoreInput.onmouseover = function() 
{
    document.querySelector('.popup').style.display = 'block';
}

scoreInput.onmouseout = function() 
{
    document.querySelector('.popup').style.display = 'none';
}

//Code to be executed once a player hits "ROLL DICE"
document.querySelector('.btn-roll').addEventListener('click', function()
{
    document.getElementById('scoreInput').disabled = true;
    document.querySelector('.score-input').style.color = '#b4b4b4';
    
    if(gamePlaying)
    {   
    //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
    //console.log(dice);

        //2.Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        //3. Update the round score IF the rolled number is NOT a 1
        if(dice === 6 && lastDice === 6)
        {
            //Player loses score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice !== 1)
        {
            //Add score
            roundScore +=dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else
        {
            nextPlayer();

        }
        lastDice = dice;
    }
});

//Code to be executed once user hits "HOLD" 
document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(gamePlaying)
    {    
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var scoreCap = document.querySelector('.score-input').value;
        
        // Check if player won
        if(scores[activePlayer] >= scoreCap)
        {
            //Update player name to indicate the winner
            document.querySelector('#name-' + activePlayer).textContent = ' Winnner!';
            //Hide the dice img and buttons
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            //add winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //remove active class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
        {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() 
{
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //Reset roundscore to 0
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
     
        //Reflects active player in UI
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');        
};

//Runs init function when user selects 'NEW GAME'
document.querySelector('.btn-new').addEventListener('click', init);

function init() 
{
    //Initiates all game values back to 0/pregame state
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.score-input').style.color = '#505050';
    
    document.getElementById('scoreInput').disabled = false;
    document.querySelector('.score-input').value = 100;
    
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    
    document.querySelector('.dice').style.display = 'block';
    
};














