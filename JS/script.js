let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

const images = [];
for (let i = 0; i <= 7; i++) {
    images.push(`https://picsum.photos/id/${imgStart + i}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array) {
    for (let i = 0; i <= array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    shuffle(images);
}