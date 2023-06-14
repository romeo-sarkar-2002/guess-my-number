'use strict';
/*
let btn = document.querySelector('.message')
let btn_text = btn.textContent;

btn_text = 'hello world';

document.querySelector('.message').textContent = '🥳 correct number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 11000;

document.querySelector('.guess').value = 100;
*/

// let doc;
let highScore;
let secretNumber, score;
let arrGuesses;
let gameOver;

function gameInitialize()
{
    highScore = 0;
}

function gameStart()
{
    score = 10;
    gameOver = false;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    arrGuesses =
    [
        false, false, false, false, false,
        false, false, false, false, false,
        false, false, false, false, false,
        false, false, false, false, false
    ];

    // console.log(secretNumber);

    document.querySelector('.guess').textContent = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').style.width = '25rem';
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('body').style.backgroundColor = '#1e1a1a';
    document.querySelector('.message').textContent = '😀 start guessing!';
}

function gameInput(guess)
{
    if(arrGuesses[guess - 1])
    {
        return;
    }

    if(guess < secretNumber)
    {
        score--;
        document.querySelector('.message').textContent = '📉 too low!';
    }
    else if(guess > secretNumber)
    {
        score--;
        document.querySelector('.message').textContent = '📈 too high!';
    }
    else
    {
        gameWon();
        return;
    }
    
    document.querySelector('.score').textContent = score;
    
    if(score === 0)
    {
        gameLost();
        return;
    }
    
    arrGuesses[guess - 1] = true;
}

function gameWon()
{
    gameOver = true;
    
    if(score > highScore)
    {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
    }
    
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.message').textContent = '🥳 correct number!';
}

function gameLost()
{
    gameOver = true;

    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#ab2222';
    document.querySelector('.message').textContent = 'you lost the game!'
}



function checkOnClick()
{
    if(gameOver)
    {
        return;
    }

    let guess = document.querySelector('.guess').value;
    guess = Number(guess);

    if(guess <= 0 || guess > 20)
    {
        document.querySelector('.message').textContent = '😫 invalid input!';
        return;
    }

    gameInput(guess);
}

function againOnClick()
{
    gameStart();
}




gameInitialize();

gameStart();

document.querySelector('.check').addEventListener('click', checkOnClick);
document.querySelector('.again').addEventListener('click', againOnClick);


