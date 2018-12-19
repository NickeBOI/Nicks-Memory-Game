/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond","fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor",
"fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"]

shuffle(icons);

const cardContainer = document.querySelector(".deck");

let flippedCards = [];
let pairedCards = [];

// Starts Game
function startGame(){
    for(i = 0; i < icons.length; i++){
    const card = document.createElement("li")
    card.classList.add("card")
    card.innerHTML = `<i class="${icons[i]}"></i>`
    cardContainer.appendChild(card);

    
    
   
    
    click(card);
    
    
    
}
var timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
clearInterval(interval);

}


    // Card Clicking Event

        function click(card){
            card.addEventListener("click", function(){
                const currentCard = this;
                const lastCard = flippedCards[0];
            if (flippedCards.length === 1){

            card.classList.add("open", "show", "notAllowed");
            flippedCards.push(this);
                
             compareCards(currentCard, lastCard);  
             }
            else {
            currentCard.classList.add("open", "show", "notAllowed");
            flippedCards.push(this);

            }
            
        });
        }

        // Compares Cards
function compareCards(currentCard, lastCard){
    if(currentCard.innerHTML === lastCard.innerHTML) {
                
    currentCard.classList.add("match");
    lastCard.classList.add("match");

    pairedCards.push(currentCard, lastCard)

    flippedCards = [];

    GameOver();
}
    else {

        setTimeout(function(){
        currentCard.classList.remove("open", "show", "notAllowed");
        lastCard.classList.remove("open", "show", "notAllowed");
        flippedCards = [];
        }, 500);

    
    }
    addMove();
    
    
}

//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + "mins " + second +"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        
        }
    },1000);
}
// stops timer
function stopTimer(){
    clearInterval(interval);
}

// Ends Game
function GameOver(){
    if(pairedCards.length === icons.length){

        
        starRating();
        alert("You Took " + timer.innerHTML + "." + " Your rating was " + starGrade + "!" + " Would you like to play again?");
        stopTimer();
        
    }
    
}
// counts moves and stars timer once the first move is made
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    rating();
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer()
    }
}

// resets moves

function resetMoves() {
    moves = 0;
    movesContainer.innerHTML = moves;
}

// Refresh Game Button
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
    // delete cards
    cardContainer.innerHTML = "";

    // call startGame function
    startGame();

    // reset all variables
    pairedCards = [];
    flippedCards = [];

    
    resetMoves();

    // re-shuffles cards
    shuffle(icons);

    // resets rating
    rating();



    
});



// Remove Stars
const oneStar = ` <li><i class="fa fa-star"></i></li> `;
const twoStar = ` <li><i class="fa fa-star"></i></li>  <li><i class="fa fa-star"></i></li> `
const threeStar = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> `
const starClass = document.querySelector(".stars");
 function rating(){
     if(moves > 21){
         starClass.innerHTML = oneStar;
         
     }
     else if(moves > 15){
       starClass.innerHTML = twoStar;
        
     }
     else if(moves < 16){
         starClass.innerHTML = threeStar;
     }
 }
 // sets grades for the star rating
var starGrade = "";
function starRating(){
    if(starClass.innerHTML == oneStar){
        starGrade = "One Star";
    }
    else if(starClass.innerHTML == twoStar){
        starGrade = "Two Stars";
    }
    else if(starClass.innerHTML == threeStar){
        starGrade = "Three Stars";
    }
}




startGame();



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






