//selectCards();
let lastFlipped = null;

function shuffle() {
    return Math.random() - 0.5;
}

function selectCards() {
    
    let numCards = 0;

    while(numCards%2 | numCards <= 3 | numCards >= 15) 
        numCards = prompt("Selecione o número de cartas: (número par entre 4-14)");
    

    let cards = document.querySelectorAll('.card');
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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
  

async function flip(element) {

    flipImage(element, 0);

    if(lastFlipped !== null) {
        
        if(lastFlipped.innerHTML == element.innerHTML) {
            element.setAttribute('onclick', '');
            lastFlipped.setAttribute('onclick', '');
        }

        else {
            await delay(1000);
            flipImage(element, 1);
            flipImage(lastFlipped, 1);
            element.setAttribute('onclick', 'flip(this);');
            lastFlipped.setAttribute('onclick', 'flip(this);');
        }

        lastFlipped = null;

    }

    else {
        
        lastFlipped = element;
        element.setAttribute('onclick', '');

    }


}
