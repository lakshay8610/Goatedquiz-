let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
    const res = await fetch("question.json");
    questions = await res.json();
}

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    loadQuestions().then(() => {
        currentQuestion = 0;
        score = 0;
        loadNextQuestion();
    });
}

function loadNextQuestion() {
    if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
    }

    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    let optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    document.getElementById("feedback").innerText = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    let correctAnswer = questions[currentQuestion].answer;

    let feedback = document.getElementById("feedback");

    if (selected === correctAnswer) {
        score++;
        feedback.innerText = "✔ Correct!";
        feedback.style.color = "lightgreen";
        btn.style.background = "green";
    } else {
        feedback.innerText = "✘ Wrong!";
        feedback.style.color = "red";
        btn.style.background = "darkred";
    }

    document.getElementById("score").innerText = score;

    disableButtons();

    setTimeout(() => {
        currentQuestion++;
        loadNextQuestion();
    }, 1200);
}

function disableButtons() {
    document.querySelectorAll("#options button").forEach(b => b.disabled = true);
}

function finishQuiz() {
    document.getElementById("quiz-screen").innerHTML =
        `<h1>Quiz Complete!</h1>
         <h2>Your Score: ${score}/${questions.length}</h2>`;
}
