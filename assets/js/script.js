//Game functionality

const videoContainer = document.getElementById('video-container')
const video = document.getElementById('video')
const answersEl = document.getElementById('answer-container')
const resultsScreen = document.getElementById('results-screen')
const rightWrongEl = document.getElementById('right-wrong')
const correctAnswerCard = document.getElementById('correct-answer')
const scoreCounter = document.getElementById('score-counter')
const questionsCount = document.getElementById('questions-count')
const flipCard = document.getElementById('flip-container')
const nextBtn = document.getElementById('next')
const finalScore = document.getElementById('final-score')
const showFinal = document.querySelectorAll('.final')

let correctAnswer;
let currentQuestion = 0
let score = 0

let songArr = [
    {
        song: "Hysteria",
        src: "./assets/media/songs/hysteria.mp3",
        difficulty: "easy",
        numberOfAnswers: 4,
        correctAnswer: "4/4",
        otherAnswers: ["3/4", "6/8", "4/3"],
    },
    {
        song: "Game Of Thrones theme",
        src: "./assets/media/songs/game_of_thrones.mp3",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "6/3"],
    },
    {
        song: "Black Velvet Band",
        src: "./assets/media/songs/black_velvet_band.mp3",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "6/3"],
    },
    {
        song: "Left Side",
        src: "./assets/media/songs/left_side.mp3",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "4/4",
        otherAnswers: ["3/4", "6/8", "4/3", "5/4"],
    },
    {
        song: "Piano Man",
        src: "./assets/media/songs/piano_man.mp3",
        difficulty: "easy",
        numberOfAnswers: 5,
        correctAnswer: "3/4",
        otherAnswers: ["4/4", "6/8", "4/3", "5/4"],
    },
    {
        song: "Take Five",
        src: "./assets/media/songs/take_five.mp3",
        difficulty: "easy",
        numberOfAnswers: 4,
        correctAnswer: "5/4",
        otherAnswers: ["3/4", "6/8", "5/8"],
    },
    {
        song: "Dean Town",
        src: "./assets/media/songs/dean_town.mp3",
        difficulty: "easy",
        numberOfAnswers: 6,
        correctAnswer: "2/2",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "4/8"],
    },
    {
        song: "Money",
        src: "./assets/media/songs/money.mp3",
        difficulty: "easy",
        numberOfAnswers: 6,
        correctAnswer: "7/4",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "2/2"],
    },
    {
        song: "Electric Feel",
        src: "./assets/media/songs/electric_feel.mp3",
        difficulty: "easy",
        numberOfAnswers: 8,
        correctAnswer: "6/4",
        otherAnswers: ["3/4", "6/8", "4/3", "4/4", "2/2", "7/4", "7/8"],
    },
    {
        song: "We Are The Champions",
        src: "./assets/media/songs/we_are_the_champions.mp3",
        difficulty: "easy",
        numberOfAnswers: 8,
        correctAnswer: "6/8",
        otherAnswers: ["3/4", "12/8", "4/3", "4/4", "2/2", "7/4", "7/8"],
    },
]

// Shows the current question number
questionsCount.innerHTML = " 1 / " + songArr.length

function setSong(song) {

    wavesurfer.load(song.src);

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
        flipCard.classList.add('correct')
     } else {
        rightWrongEl.innerText = "Incorrect!" 
        scoreCounter.innerText = score
        flipCard.classList.add('incorrect')
    }

    // videoContainer.innerHTML = '' 
    answersEl.innerHTML = ''

    if (currentQuestion == songArr.length-1) {
        resultsScreen.style.display = 'none'
        finalScore.innerHTML = "Your final score is: " + score
        nextBtn.style.display = "none"
        showFinal.forEach(item => {
            item.style.display = "block"
        })

    } else {
        currentQuestion += 1
        resultsScreen.style.display = 'flex'
    }

    correctAnswerCard.innerHTML = correctAnswer 
    flipCard.classList.add('flip')
    nextBtn.addEventListener("click", nextQuestion)
}

// Go to next question
function nextQuestion() {
    setSong(songArr[currentQuestion])
    resultsScreen.style.display = 'none'
    flipCard.classList.remove('flip')
    flipCard.classList.remove('correct')
    flipCard.classList.remove('incorrect')
    questionsCount.innerHTML = (currentQuestion+1) + " / " + songArr.length
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

