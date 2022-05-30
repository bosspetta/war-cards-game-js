/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deckId = void 0;
var computerScore = 0;
var playerScore = 0;
var computerScoreEl = document.getElementById('computer-score');
var playerScoreEl = document.getElementById('player-score');
var header = document.getElementById('header');
var cardsWrapper = document.getElementById('cards');
var remainingContainer = document.getElementById('remaining');
var getNewDeck = document.getElementById('new-deck');
var drawCards = document.getElementById('draw-cards');

function newDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/').then(function (res) {
        return res.json();
    }).then(function (data) {
        deckId = data.deck_id;
        console.log('Remaining ' + data.remaining + ' from ' + deckId + ' deck');
        remainingContainer.innerText = 'Remaining ' + data.remaining + ' from this deck';
    });
    resetDeck();
}

newDeck();

function getCards() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/' + deckId + '/draw/?count=2').then(function (res) {
        return res.json();
    }).then(function (data) {
        cardsWrapper.children[0].innerHTML = '\n                <img src="' + data.cards[0].image + '" alt="" />\n            ';
        cardsWrapper.children[1].innerHTML = '\n                <img src="' + data.cards[1].image + '" alt="" />\n            ';

        var handWinnerText = winnerMessages(data.cards[0], data.cards[1]);
        header.textContent = handWinnerText;

        if (data.remaining === 0) {
            drawCards.disabled = true;
            if (computerScore > playerScore) {
                header.innerHTML = '<span class="yellow">Computer wins</span> by ' + computerScore + ' to ' + playerScore + '!';
            } else if (computerScore < playerScore) {
                header.innerHTML = '<span class="yellow">Player wins</span> by ' + playerScore + ' to ' + computerScore + '!';
            } else {
                header.innerHTML = '<span class="yellow">No winner, it\'s a tie</span> ' + playerScore + ' to ' + computerScore + '!';
            }
        }
        remainingContainer.innerText = 'Remaining ' + data.remaining + ' from this deck';
    });
}

function winnerMessages(card1, card2) {
    var valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    var card1ValueIndex = valueOptions.indexOf(card1.value);
    var card2ValueIndex = valueOptions.indexOf(card2.value);

    if (card1ValueIndex > card2ValueIndex) {
        computerScore += 1;
        computerScoreEl.innerText = 'Computer score: ' + computerScore;
        return 'Computer wins this hand!';
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore += 1;
        playerScoreEl.innerText = 'Player score: ' + playerScore;
        return 'You win this hand!';
    } else {
        return 'War!';
    }
}

function resetDeck() {
    computerScore = 0;
    playerScore = 0;
    computerScoreEl.innerText = 'Computer score: ' + computerScore;
    playerScoreEl.innerText = 'Player score: ' + playerScore;
    cardsWrapper.children[0].innerHTML = '';
    cardsWrapper.children[1].innerHTML = '';
    header.innerText = 'Game of War';
}

getNewDeck.addEventListener('click', newDeck);
drawCards.addEventListener('click', getCards);

/***/ })
/******/ ]);