let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;


const images = [];
for (let i = 0; i <= 7; i++) {
    images.push(`https://picsum.photos/id/${imgStart + i}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function formatTime(sec) {
    const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
    const secondes = String(sec % 60).padStart(2, "0");
    return `${minutes}:${secondes}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = formatTime(seconds);
    }, 1000);
}

function checkVictory() {
    if (matchedCount == cards.length / 2) {
        clearInterval(timerInterval);
        document.getElementById("result").textContent = `Gagné en ${moves} coups et ${formatTime(seconds)} !`;
    }
}

function initGame() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedCount = 0;
    seconds = 0;
    clearInterval(timerInterval);

    document.getElementById("moves").classList.remove("hidden");
    document.getElementById("timer").classList.remove("hidden");
    document.getElementById("moves").textContent = "Coups : 0";
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("result").textContent = "";
    document.getElementById("start-button").textContent = "Rejouer";

    shuffle(cards);
    cards.forEach((url) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = url;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        document.getElementById("game-board").appendChild(card);

        card.addEventListener('click', () => handleCardClick(card))
    })

    startTimer();
}


function handleCardClick(card) {
    if (lockBoard == true || card == firstCard || card.classList.contains("matched") == true) {
        return;
    }

    revealCard(card);

    if (firstCard == null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    moves++;
    document.getElementById("moves").textContent = `Coups : ${moves}`;
    checkMatch();
}

function revealCard(card) {
    const img = document.createElement("img");
    img.src = card.dataset.value;
    img.alt = "Image de mémoire";
    card.appendChild(img);
}

function checkMatch() {
    if (firstCard.dataset.value == secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount++;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        checkVictory();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
}


document.getElementById("start-button").addEventListener("click", initGame);