let lastFlipped = null, jogadas = 0, win = 0, numCards = 0, clockInterval;
const originalSet = document.querySelectorAll('.card');

function updateClock() {
    const clock = document.querySelector('.clock');
    clock.innerHTML = (Date.now() - start)/1000;
}

function shuffle() {
    return Math.random() - 0.5;
}

function finishGame() {

    clearInterval(clockInterval);
    const clock = document.querySelector('.clock');
    alert(`Você ganhou em ${jogadas} jogadas e em ${clock.innerHTML} segundos!`)

    if(prompt("Deseja reiniciar?") === "sim") 
        startGame();
    
}

function selectCards() {
    

    while(numCards%2 | numCards <= 3 | numCards >= 15) 
        numCards = prompt("Selecione o número de cartas: (número par entre 4-14)");

    let cards = originalSet;
    cardsArr = Array.from(cards);
    cardsArr = cardsArr.slice(0, numCards);
    cardsArr = cardsArr.sort(shuffle);

    let newCardBoard = "";
    for(let i = 0; i < numCards; i++)
        newCardBoard += `<div class="container card" onclick="flip(this);">
                        ${cardsArr[i].innerHTML}
                        </div>`;

    cardBoard = document.querySelector('.cardboard');
    cardBoard.innerHTML = newCardBoard;

}


function flipImage(card, xd) {


    const imgs = card.querySelectorAll('img');


    if(!xd) {
        imgs[0].style.setProperty('transform', 'rotateY(0deg)')
        imgs[1].style.setProperty('transform', 'rotateY(-180deg)')
    }
    else {
        imgs[1].style.setProperty('transform', 'rotateY(0deg)')
        imgs[0].style.setProperty('transform', 'rotateY(180deg)')       
    }

}

let kiki;



function flip(element) {  

    flipImage(element, 0);

    if(lastFlipped !== null) {
        

        if(lastFlipped.innerHTML == element.innerHTML) {
            element.setAttribute('onclick', '');
            lastFlipped.setAttribute('onclick', '');
            win++;
        }

        else {
            const holder = lastFlipped;
            setTimeout(function(){
                flipImage(holder, 1);
                flipImage(element, 1);
                element.setAttribute('onclick', 'flip(this);');
                holder.setAttribute('onclick', 'flip(this);');
            }, 1000);
        }
        

        jogadas++;  
        lastFlipped = null;

    }

    else {
        
        lastFlipped = element;
        element.setAttribute('onclick', '');

    }

    if(2*win == numCards) 
        setTimeout(finishGame, 200);
    

}

function startGame() {
    
    lastFlipped = null, jogadas = 0, win = 0, numCards = 0, clockInterval;
    selectCards();

    start = Date.now();
    clockInterval = setInterval(updateClock, 99);

}

startGame();
