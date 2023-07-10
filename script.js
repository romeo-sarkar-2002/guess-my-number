"use strict";
const game =
{
    min: 1,
    max: 10,

    initialize()
    {
        document.querySelector(".between").textContent = `between ${this.min} and ${this.max} (inclusive)`;
        this.scoreMax = 2 * Math.trunc(Math.log(this.max - this.min + 1));
        this.highScore = 0;
        
        this.domInitialize();
        this.start();

    },
    domInitialize()
    {
        this.domInputGuess = document.querySelector(".guess");
        this.domDisplayMessage = document.querySelector(".message");
        this.domDisplayBody = document.body;
    
        this.domSectionLeft = document.querySelector(".section-left");

        document.querySelector("#btn-reload").addEventListener("click", this.domBtnReloadEventOnClick.bind(this));
        document.querySelector("#btn-check").addEventListener("click", this.domBtnCheckEventOnClick.bind(this));
        document.querySelector("#btn-again").addEventListener("click", this.domBtnAgainEventOnClick.bind(this));
        
        document.querySelector(".guess").addEventListener("keypress", this.domInputGuessEventOnKeyPress.bind(this));
        // new Audio("res\\init.mp3").play();
    },

    

    random() // generates a random number between [this.min, this.max]
    {
        let rand = Math.random() * (this.max - this.min + 1);
        return Math.trunc(rand + this.min);
    },

    start()
    {
        this.isGameOver = false;
        this.score = this.scoreMax;
        this.setGuesses = new Set();
        this.secretNumber = this.random();
        
        this.domConfigure();
        console.log(`secretNumber: ${this.secretNumber}`);
    },
    
    check(number)
    {
        if(number == this.secretNumber)
        {
            this.win();
            return;
        }
        
        if(this.setGuesses.has(number))
        {
            new Audio("res/check-has.mp3").play();
        }
        else
        {
            this.score--;
            this.setGuesses.add(number);
            this.domUpdateScore();
            new Audio("res/check.mp3").play();
        }
        this.domUpdateMessage(number);
        
        if(0 == this.score)
        {
            this.lose();
        }
    },
    
    win()
    {
        if(this.score > this.highScore)
        {
            this.highScore = this.score;
            this.domUpdateHighScore();
        }

        this.domUpdateNumber();
        this.domDisplayBody.classList.add("win");
        this.domDisplayMessage.textContent = "🥳 correct number";
        new Audio("res/win.mp3").play();
        
        this.gameOver();
    },
    
    lose()
    {
        this.domUpdateNumber();
        this.domDisplayBody.classList.add("lose");
        this.domDisplayMessage.textContent = "😭 you lose";
        new Audio("res/lose.mp3").play();
        this.gameOver();
    },
    
    gameOver()
    {
        this.isGameOver = true;
        this.domDisplayMessage.classList.add("message-game-over");
        this.domSectionLeft.classList.add("hidden");
    },
    
    restart()
    {
        this.start();
        new Audio("res/again.mp3").play();
    },
    
    domConfigure()
    {
        this.domUpdateScore();
        this.domUpdateHighScore();
        this.domDisplayMessage.textContent = "😀 start guessing";
        this.domDisplayBody.classList.remove("win", "lose");

        this.domSectionLeft.classList.remove("hidden");
        document.querySelector(".number").textContent = "";
        this.domDisplayMessage.classList.remove("message-game-over");
        
    },

    domUpdateScore()
    {
        let domDisplayScore = document.querySelector(".score");
        domDisplayScore.textContent = String(this.score);
    },

    domUpdateMessage(number)
    {
        if(number < this.min || number > this.max)
        {
            this.domUpdateMessageInvalidNumber();
            return;
        }
        
        if(number > this.secretNumber)
        {
            this.domDisplayMessage.textContent = "📈 too high";
        }
        else
        {
            this.domDisplayMessage.textContent = "📉 too low";
        }
    },

    domUpdateMessageInvalidNumber()
    {
        this.domDisplayMessage.textContent = "😫 invalid number";
    },

    domUpdateHighScore()
    {
        let domDisplayHighScore = document.querySelector(".high-score");
        domDisplayHighScore.textContent = String(this.highScore);
    },

    domUpdateNumber()
    {
        let domDisplayNumber = document.querySelector(".number");
        domDisplayNumber.textContent = String(this.secretNumber);
    },

    domBtnCheckEventOnClick()
    {
        console.log("dom check event on click");
        console.log(this);
        if(this.isGameOver)
        {
            return;
        }

        let input = this.domInputGuess.value;
        if(input == "")
        {
            this.domUpdateMessageInvalidNumber();
            return;
        }

        this.check(Number(input));
    },

    domInputGuessEventOnKeyPress(event)
    {
        console.log("keypress");
        if(event.key == "Enter")
        {
            this.domBtnCheckEventOnClick();
        }
    },

    domBtnAgainEventOnClick()
    {
        this.restart();
    },
    domBtnReloadEventOnClick()
    {
        location.reload();
    }
}

game.initialize();
