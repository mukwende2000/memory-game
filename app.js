const container = document.querySelector('.container')
const progressBar = document.querySelector('.progress-bar')
const scoreContainer = document.querySelector('.score-container')
const chancesContainer = document.querySelector('.chances-container')
const Results = document.querySelector('.results')
const button = document.querySelector('button')
const congratsMsg = document.querySelector('.congrats-msg')
const HighScoreContainer = document.querySelector('.high-score-container')
const resultScore = document.querySelector('.result-score')
const newHighScore = document.querySelector('.new-high-score')
// RESTART THE GAME
button.addEventListener('click', () => {
    location.reload()
})

// CREATE IMAGE ARRAY
const myImages = []
for(let i = 1; i <= 20; i++) {
    let imageName;
    imageName = `images/img${i}.png`
    myImages.push(imageName)
    myImages.push(imageName)
}

// CREATE CARD ELEMENTS AND INSERT INTO THE DOM
for(let i = 0; i < 40; i++) {
    const backFace = document.createElement('div')
    backFace.className = 'back'
    const faceImage = document.createElement('img')
    
    const randomImage = myImages[Math.floor(Math.random()* myImages.length)]
    myImages.splice(myImages.indexOf(randomImage), 1)
    faceImage.setAttribute('src', randomImage)
    
    const frontFace = document.createElement('div')
    frontFace.className = 'front'
    frontFace.appendChild(faceImage)

    const card = document.createElement('div')
    card.className = 'card'
    card.append(backFace, frontFace)
    container.appendChild(card)
}


const backFaces = Array.from(document.querySelectorAll('.back'))
const frontFaces = Array.from(document.querySelectorAll('.front'))

// FLIP CARDS ON MOUSE CLICK
let flipedCards = []
backFaces.forEach(backFace => {
    backFace.addEventListener('click', flipCard)
    function flipCard(e) {
        e.target.style.transform = 'rotateY(180deg)'
        frontFaces[backFaces.indexOf(e.target)].style.transform = 'rotateY(0deg)'

        flipedCards.push(frontFaces[backFaces.indexOf(e.target)])
        checkMatch()
    }
}) 

// STATISTICS
let progress = 0
let score = 0
let chances = 20
let HighScore;
let counter = 0

// CHECK IF CARDS MATCH
if(localStorage.HighScore ) {
    document.querySelector('.high-score').textContent = `high score: ${localStorage.HighScore}`
} else {
    document.querySelector('.high-score').textContent = `high score: 0`
}

function checkMatch() {
    if(flipedCards.length === 2) {

        if(flipedCards[0].children[0].getAttribute('src') != flipedCards[1].children[0].getAttribute('src')) {
            
           setTimeout(() => {
               flipedCards[0].style.transform = 'rotateY(180deg)'
               flipedCards[1].style.transform = 'rotateY(180deg)'
               backFaces[frontFaces.indexOf(flipedCards[0])].style.transform = 'rotateY(0deg)'
               backFaces[frontFaces.indexOf(flipedCards[1])].style.transform = 'rotateY(0deg)'
               flipedCards.length = 0;
               chances--
               chancesContainer.textContent = chances
                    
                    if(score === 0) {
                        score = 0
                    } else {
                        score -= 10
                    }
                    scoreContainer.textContent = score;
                    if(counter === 0) {
                        counter = 0
                    } else {
                        counter -= 10
                    }
                    results()
            }, 1000); 

        } else {
            chances++
            chancesContainer.textContent = chances
            progress += 5
            progressBar.style.width = `${progress}%`
            counter += 10

            let scoreIncrease = setInterval(() => {
                score++
                scoreContainer.textContent = score;
                if(score - counter === 0) clearInterval(scoreIncrease)
            }, 50);
          
            results()
            flipedCards.length = 0;
        }
    } else {
        return
    }
}


function results() {
    if(chances === 0) {
        container.style.display = 'none'
        Results.removeChild(congratsMsg)
        Results.removeChild(HighScoreContainer)
        resultScore.textContent = score
        Results.style.display = 'flex'

    } else if (progress === 100) {

        // SET HIGH SCORE IN LOCAL STORAGE
        if(!localStorage.HighScore) {
            localStorage.HighScore = score
            newHighScore.textContent = localStorage.HighScore

        } else if(+localStorage.HighScore < score) {
            localStorage.HighScore = score        
            newHighScore.textContent = localStorage.HighScore
           
        } else if (+localStorage.HighScore >= score) {        
            Results.removeChild(congratsMsg)
            Results.removeChild(HighScoreContainer)
        }

        container.style.display = 'none'
        resultScore.textContent = score
        Results.style.display = 'flex'
    } else {
        return
    }
}

// INSTRUCTIONS MENU
document.querySelector('.ins-btn').onclick = function (e) {
    document.querySelector('.instructions').classList.toggle('active')
    e.target.classList.toggle('activebtn')
}