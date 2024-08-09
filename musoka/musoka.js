const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

//typing at footer
const content = [
    "Welcome to the club!",
    "Here at MUSOKA, every collection tee is crafted to bring you on a fun-filled adventure.",
    "MUSOKA tees are designed to be your coziest go-to, perfect for even your laziest days. Pair them with anything, and you'll always look effortlessly cute. Featuring a heavier, more structured fabric and an oversized streetwear look, our tees are made to stand out."
]

async function typeOut(element, message)
{
    for (let i = 0; i < message.length; i++)
    {
        element.innerHTML += message[i]
        await sleep(10)
    }
}

const typeFooter = async () =>
{
    console.log(content.length)
    for (let i = 0; i < content.length; i++){
        let currentSentence = content[i]
        let currentElement = document.getElementById("footerText"+(i+1))
        await typeOut(currentElement, currentSentence);
    }
}

typeFooter();

//card game
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'];
let flippedCards = [];
let matchedCards = [];

//randomizes the card list by iterating through the list backwards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//creates the cards for the game
function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach((card, index) => {
        const cardContainerElement = document.createElement('div');
        cardContainerElement.classList.add('card-container');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);

        const cardFrontElement = document.createElement('div');
        cardFrontElement.classList.add('card-front');

        const logoElement = document.createElement('img');
        logoElement.src = "logo-inverted.png"
        logoElement.width = 100;

        const cardBackElement = document.createElement('div');
        cardBackElement.classList.add('card-back');

        const imageElement = document.createElement('img');
        imageElement.src = "image " + card + ".jpg"
        imageElement.width = 100;
        imageElement.height = 100;

        cardElement.appendChild(cardFrontElement);
        cardFrontElement.appendChild(logoElement);
        cardBackElement.appendChild(imageElement);
        cardElement.appendChild(cardBackElement);
        cardContainerElement.appendChild(cardElement);
        gameBoard.appendChild(cardElement);
    });
}

//turn over card if less than 2 cards are flipped & card is not matched
async function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

//
async function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.cardValue === card2.dataset.cardValue) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        await sleep(2000);
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('Congratulations, you matched all the cards!'), 500);
    }
}

restartButton.addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    createBoard();
});

createBoard();