'use strict'

//selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//start values
let scores, currentScore, activePlayer, playing

const init = function() {

    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0
    
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    
    diceEl.classList.add('hidden')

}

init()

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

//adding events
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1) Generating a random number
        const dice = Math.trunc(Math.random() * 6) + 1

        //2) display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `img/dice-${dice}.png`

        //3) check for rolled 1
        if(dice !== 1){
            //adding dice to current score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }else{
            //switch next player
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function() {

    if(playing){
        //1) add current score to active player's score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        //2) check if player's score >= 100 : finish the game
        if(scores[activePlayer] >= 10){
            //finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

            playing = false

        }
        //switch next player
        else{
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click', init)