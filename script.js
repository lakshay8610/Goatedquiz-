let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

let correctSound = new Audio("correct.mp3");
let wrongSound = new Audio("wrong.mp3");

// START GAME
async function startGame() {
    document.getElementById("level-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    // Load JSON (with cache bypass)
    let res = await fetch("question.json?v=" + Date.now());
    let data = await res.json();

    questions = data;   // full array of questions
    currentQuestion = 0;
    score = 0;

    loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

// TIMER
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongSound.play();
            currentQuestion++;
            loadQuestion();
        }
    }, 1000);
}

// CHECK ANSWER
function checkAnswer(selected) {
    let correctAns = questions[currentQuestion].answer;

    if (selected === correctAns) {
        correctSound.play();
        score++;
        document.getElementById("score").innerText = score;
    } else {
        wrongSound.play();
    }

    currentQuestion++;
    loadQuestion();
}

// END QUIZ
function endQuiz() {
    clearInterval(timer);

    document.getElementById("quiz-screen").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score}/${questions.length}</p>
        <button onclick="location.reload()">Restart</button>
    `;
}
