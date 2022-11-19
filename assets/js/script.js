//Game functionality

const videoContainer = document.getElementById('video-container')
const video = document.getElementById('video')
const answersEl = document.getElementById('answer-container')
const resultsScreen = document.getElementById('results-screen')
const rightWrongEl = document.getElementById('right-wrong')
const correctAnswerCard = document.getElementById('correct-answer')
const scoreCounter = document.getElementById('score-counter')
const questionsCount = document.getElementById('questions-count')
const flipcard = document.getElementById('flip-container')
const nextBtn = document.getElementById('next')

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
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "6/3"],
    },
    {
        song: "Black Velvet Band",
        src: "https://www.youtube.com/embed/YytdBDpVSHc",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "6/3"],
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
        song: "Piano Man",
        src: "https://www.youtube.com/embed/5HWmQxy5C-Y",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "5/4"],
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
    {
        song: "Money",
        src: "https://www.youtube.com/embed/cpbbuaIA3Ds",
        difficulty: "easy",
        numberOfAnswers: 6,
        correctAnswer: "7/4",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "2/2"],
    },
    {
        song: "Electric Feel",
        src: "https://www.youtube.com/embed/fbkv5xOLvnA",
        difficulty: "easy",
        numberOfAnswers: 8,
        correctAnswer: "6/4",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "2/2", "7/4", "7/8"],
    },
    {
        song: "We Are The Champions",
        src: "https://www.youtube.com/embed/O71fetlkCZo",
        difficulty: "easy",
        numberOfAnswers: 8,
        correctAnswer: "6/8",
        otherAnswers: ["3/4", "12/8", "4/3", "4/4", "2/2", "7/4", "7/8"],
    },
]

// Shows the current question number
questionsCount.innerHTML = " 1 / " + songArr.length

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
        answersEl.innerHTML += `<div class="answer" tabindex="0">${answers[i]}</div>`
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
answersEl.innerHTML = ''
videoContainer.innerHTML = '' 
correctAnswerCard.innerHTML = correctAnswer
   
    
resultsScreen.style.display = 'flex'
flipcard.classList.add('flip')

nextBtn.addEventListener("click", nextQuestion)
function nextQuestion() {
    setSong(songArr[currentQuestion])
    resultsScreen.style.display = 'none'
    flipcard.classList.remove('flip')
    questionsCount.innerHTML = (currentQuestion+1) + " / " + songArr.length
    }
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

// Sound wave JS

var playBtn = document.getElementById("pause-play");

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: 'green',
    barWidth: 4,
    responsive: true,
    height: 90,
    barRadius: 4
});

wavesurfer.load('../assets/media/Frozen_Let_It_Go.mp3');

playBtn.onclick = function(){
    wavesurfer.playPause();
};

