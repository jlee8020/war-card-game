

var cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
var deck1 = [];
var deck2 = [];
var deck1WinPile = [];
var deck2WinPile = [];
var card1Remove = "temp";
var card2Remove = "temp";
var isWinner = false;

let gameButton = document.getElementById('game-btn');
let deck1El = document.getElementById('deck-1');
let deck2El = document.getElementById('deck-2');
let deck1DrawEl = document.getElementById('deck-1-draw');
let deck2DrawEl = document.getElementById('deck-2-draw');
let deck1CardsLeftEl = document.getElementById('deck-1-cards-left');
let deck2CardsLeftEl = document.getElementById('deck-2-cards-left');
let winPile1 = document.getElementById('win-pile-1');
let winPile2 = document.getElementById('win-pile-2');
let message = document.getElementById('message');

gameButton.addEventListener('click',handleClick);




function handleClick() {
    if (isWinner === false) {
        if (cards.length === 52) {
            gameButton.textContent = 'Flip Em';
            for (i=1; i<=26; i++) {
            let randIdx = Math.floor(Math.random()*cards.length);
            cardPicked = cards.splice(randIdx, 1);
            deck1.push(`${cardPicked}`);
            randIdx = Math.floor(Math.random()*cards.length);
            cardPicked = cards.splice(randIdx, 1);
            deck2.push(`${cardPicked}`);
            }
            deck1El.classList.add('back-blue');
            deck1El.classList.remove('outline');
            deck2El.classList.add('back-blue');
            deck2El.classList.remove('outline');
            deck1DrawEl.classList.remove('back-blue');
            deck1DrawEl.classList.add('outline');
            deck2DrawEl.classList.add('outline');
            deck2DrawEl.classList.remove('hidden');
            deck1CardsLeftEl.textContent = `${deck1.length}`;
            deck1CardsLeftEl.classList.remove('hidden');
            deck2CardsLeftEl.textContent = `${deck2.length}`;
            deck2CardsLeftEl.classList.remove('hidden');
            message.textContent = "Click 'Flip Em' to start!";
        } else {
        checkForReshuffle1();
        checkForReshuffle2();
        render();
        flipCards();
    
        }
    }
}

function flipCards() {
    deck1DrawEl.classList.remove(card1Remove);
    deck2DrawEl.classList.remove(card2Remove);
    
    let compare1 = deck1.shift();
    card1Remove = compare1;
    let value1 = lookupValue(`${compare1}`);
    let compare2 = deck2.shift();
    card2Remove = compare2;
    let value2 = lookupValue(`${compare2}`);

    deck1DrawEl.classList.add(`${compare1}`);
    deck1DrawEl.classList.remove('outline');
    deck2DrawEl.classList.add(`${compare2}`);
    deck2DrawEl.classList.remove('outline');
    render();
    if (value1 > value2) {
        message.textContent = "Player 1 wins the hand!";
        deck1WinPile.push(`${compare1}`);
        deck1WinPile.push(`${compare2}`);
        winPile1.classList.remove('outline');
        winPile1.classList.add('back-blue');
    }
    if (value2 > value1) {
        message.textContent = "Player 2 wins the hand!";
        deck2WinPile.push(`${compare1}`);
        deck2WinPile.push(`${compare2}`);
        winPile2.classList.remove('outline');
        winPile2.classList.add('back-blue');
    }
    if (value1 === value2) {
        message.textContent = "WAR!!!!!!!!!"
    }
    
}

function shuffle(cardsToShuffle) {
    let shuffledCards = [];
    let shuffleHolder;
    for (i=1; i=cardsToShuffle.length; i++){
        randIdx=Math.floor(Math.random()*cardsToShuffle.length);
        shuffleHolder = cardsToShuffle.splice(randIdx, 1);
        shuffledCards.push(`${shuffleHolder}`);
    }
    return shuffledCards;
}

function checkForReshuffle1() {
    if (deck1.length === 0) {
        if (deck1WinPile.length === 0) {
            message.textContent = "Player 2 Wins!"
            isWinner = true;
        } else {
            deck1WinPile = shuffle(deck1WinPile);
            for (i=0; i<=(deck1WinPile.length - 1); i++) {
                let cardToMove = deck1WinPile[i];
                deck1.push(`${cardToMove}`);
            }
            deck1WinPile = [];
        }
    }
    render();
}

function checkForReshuffle2() {
    if (deck2.length === 0) {
        if (deck2WinPile.length === 0) {
            message.textContent = "Player 1 Wins!"
            isWinner = true;
        } else {
            deck2WinPile = shuffle(deck2WinPile);
            for (i=0; i<=(deck2WinPile.length - 1); i++) {
                let cardToMove = deck2WinPile[i];
                deck2.push(cardToMove);
            }
            deck2WinPile = [];
        }
    }
    render();
}

function render() {
    deck1CardsLeftEl.textContent = deck1.length;
    deck2CardsLeftEl.textContent = deck2.length;
    if (deck2WinPile.length === 0) {winPile2.classList.remove('back-blue')}
    if (deck1WinPile.length === 0) {winPile1.classList.remove('back-blue')}
    if (deck2.length === 0) {deck2El.classList.add('outline')}
    if (deck1.length === 0) {deck1El.classList.add('outline')}
    if (deck2.length === 0) {deck2El.classList.remove('back-blue')}
    if (deck1.length === 0) {deck1El.classList.remove('back-blue')}
    if (deck2.length !== 0) {deck2El.classList.add('back-blue')}
    if (deck1.length !== 0) {deck1El.classList.add('back-blue')}
    if (deck2.length !== 0) {deck2El.classList.remove('outline')}
    if (deck1.length !== 0) {deck1El.classList.remove('outline')}
}

function lookupValue(card) {
    if (card === "dA" || card === "cA" || card === "sA" || card === "hA") {
        return 14;
    }
    if (card === "dK" || card === "cK" || card === "sK" || card === "hK") {
        return 13;
    }
    if (card === "dQ" || card === "cQ" || card === "sQ" || card === "hQ") {
        return 12;
    }
    if (card === "dJ" || card === "cJ" || card === "sJ" || card === "hJ") {
        return 11;
    }
    if (card === "d10" || card === "c10" || card === "s10" || card === "h10") {
        return 10;
    }
    if (card === "d09" || card === "c09" || card === "s09" || card === "h09") {
        return 9;
    }
    if (card === "d08" || card === "c08" || card === "s08" || card === "h08") {
        return 8;
    }
    if (card === "d07" || card === "c07" || card === "s07" || card === "h07") {
        return 7;
    }
    if (card === "d06" || card === "c06" || card === "s06" || card === "h06") {
        return 6;
    }
    if (card === "d05" || card === "c05" || card === "s05" || card === "h05") {
        return 5;
    }
    if (card === "d04" || card === "c04" || card === "s04" || card === "h04") {
        return 4;
    }
    if (card === "d03" || card === "c03" || card === "s03" || card === "h03") {
        return 3;
    }
    if (card === "d02" || card === "c02" || card === "s02" || card === "h02") {
        return 2;
    }
}

