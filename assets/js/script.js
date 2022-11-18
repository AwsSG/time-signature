const video_container = document.getElementById('video-container')
const video = document.getElementById('video')
const answersEl = document.getElementById('answer-container')
const resultsScreen = document.getElementById('results-screen')
const rightWrongEl = document.getElementById('right-wrong')
const scoreCounter = document.getElementById('score-counter')

let correctAnswer;
let currentQuestion = 0
let score = 0

let songArr = [
    {
        song: "Hysteria",
        src: "https://www.youtube.com/embed/3dm_5qWWDV8",
        difficulty: "easy",
        numberOfAnswers: 4,
        correctAnswer: "4/4",
        otherAnswers: ["3/4", "6/8", "4/3"],
    },
]

function setSong(song) {
    video.setAttribute("src", song.src)

    const answers = [...song.otherAnswers, song.correctAnswer]
    console.log(answers)

    // defining correct answer so it can be checked against guess
    correctAnswer = song.correctAnswer

    shuffleArr(answers)

    //Inserting Questions Into DOM 
    for (let i = 0; i < song.numberOfAnswers; i++) {
        answersEl.innerHTML += `<div class="answer">${answers[i]}</div>`
    }

    //Then making array here so for each and event listeners can be applied 
    const answerBtns = document.querySelectorAll('.answer')

    answerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('hi')
            console.log(correctAnswer)
            checkAnswer(e)
        })
    })
}

// function to check if answer is correct or incorrect applied through above for each loop
function checkAnswer(e) {
 if (e.target.innerText == correctAnswer) {
    currentQuestion += 1
    score += 1

    rightWrongEl.innerText = "Correct!"
    scoreCounter.innerText = score

    resultsScreen.style.display = 'flex'
    
    setTimeout(() => {
        
        resultsScreen.style.display = 'none'
    }
    ,3000)
 }
}

// Fisher Yates shuffle to arrange question buttons randomly
function shuffleArr(arr) {
    for (let i = 0; i < arr.length; i++) {
       let temp = arr[i];
       let j = Math.floor(Math.random() * arr.length);
       arr[i] = arr[j];
       arr[j] = temp;

       return arr;
    }

}

setSong(songArr[0])
