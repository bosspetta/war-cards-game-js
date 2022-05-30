let deckId
let computerScore = 0
let playerScore = 0
const computerScoreEl = document.getElementById('computer-score')
const playerScoreEl = document.getElementById('player-score')
const header = document.getElementById('header')
const cardsWrapper = document.getElementById('cards')
const remainingContainer = document.getElementById('remaining')
const getNewDeck = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')

function newDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(`Remaining ${data.remaining} from ${deckId} deck`)
            remainingContainer.innerText = `Remaining ${data.remaining} from this deck`
        })
    resetDeck()
}

newDeck()

function getCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsWrapper.children[0].innerHTML = `
                <img src="${data.cards[0].image}" alt="" />
            `
            cardsWrapper.children[1].innerHTML = `
                <img src="${data.cards[1].image}" alt="" />
            `
            
            const handWinnerText = winnerMessages(data.cards[0], data.cards[1])
            header.textContent = handWinnerText
            
            if (data.remaining === 0) {
                drawCards.disabled = true
                if (computerScore > playerScore) {
                    header.innerHTML = `<span class="yellow">Computer wins</span> by ${computerScore} to ${playerScore}!`
                } else if (computerScore < playerScore) {
                    header.innerHTML = `<span class="yellow">Player wins</span> by ${playerScore} to ${computerScore}!`;
                } else {
                    header.innerHTML = `<span class="yellow">No winner, it's a tie</span> ${playerScore} to ${computerScore}!`;
                }
            }
            remainingContainer.innerText = `Remaining ${data.remaining} from this deck`
        })
}

function winnerMessages(card1, card2) {
    const valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore += 1
        computerScoreEl.innerText = `Computer score: ${computerScore}`
        return 'Computer wins this hand!'
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore += 1
        playerScoreEl.innerText = `Player score: ${playerScore}`
        return 'You win this hand!'
    } else {
        return 'War!'
    }
}

function resetDeck() {
    computerScore = 0
    playerScore = 0
    computerScoreEl.innerText = `Computer score: ${computerScore}`
    playerScoreEl.innerText = `Player score: ${playerScore}`
    cardsWrapper.children[0].innerHTML = ''
    cardsWrapper.children[1].innerHTML = ''
    header.innerText = 'Game of War'
}

getNewDeck.addEventListener('click', newDeck)
drawCards.addEventListener('click', getCards)
