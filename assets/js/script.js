const videoContainer = document.getElementById('video-container')
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
    {
        song: "Game Of Thrones theme",
        src: "https://www.youtube.com/embed/F6SxzmEOHMI",
        difficulty: "easy",
        numberOfAnswers: 6,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "4/3", "6/3"],
    },
    {
        song: "Left Side",
        src: "https://www.youtube.com/embed/xAOkYFZvqDQ",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "4/4",
        otherAnswers: ["3/4", "6/8", "4/3", "5/4"],
    },
    {
        song: "Take Five",
        src: "https://www.youtube.com/embed/V2QHW-pEUYE",
        difficulty: "easy",
        numberOfAnswers: 4,
        correctAnswer: "5/4",
        otherAnswers: ["3/4", "6/8", "5/8"],
    },
    {
        song: "Dean Town",
        src: "https://www.youtube.com/embed/le0BLAEO93g",
        difficulty: "easy",
        numberOfAnswers: 6,
        correctAnswer: "2/2",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "4/8"],
    },
]

function setSong(song) {
    videoContainer.innerHTML = `
    <iframe id="video" width="560" height="315" src="${song.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
    `

    let answers = [...song.otherAnswers, song.correctAnswer]

    // defining correct answer so it can be checked against guess
    correctAnswer = song.correctAnswer

    shuffleArr(answers)

    console.log(answers)

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
     score += 1

     rightWrongEl.innerText = "Correct!" 
     scoreCounter.innerText = score
     
    } else {
        rightWrongEl.innerText = "Incorrect!" 
        scoreCounter.innerText = score
    }
    
currentQuestion += 1

videoContainer.innerHTML = ''
answersEl.innerHTML = ''
    
    
resultsScreen.style.display = 'flex'

setTimeout(() => {
    setSong(songArr[currentQuestion])
    resultsScreen.style.display = 'none'
}
,2000)
 
}

// Fisher Yates shuffle to arrange question buttons randomly
function shuffleArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        let array = arr;
        let i = array.length;
        while (--i > 0) {
           let temp = Math.floor(Math.random() * (i + 1));
           [array[temp], array[i]] = [array[i], array[temp]];
        }


       return array;
 }

}

setSong(songArr[currentQuestion])
