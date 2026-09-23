let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;


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

function initGame() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
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