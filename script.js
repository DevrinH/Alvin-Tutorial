setTimeout(function() {

showScore()
}, 602000);

const startingMinutes = 10;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60; //minutes * 60 seconds
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown(){

    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const contdownEl = document.getElementById("f1"); 
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    time--;

    if (time < 0) { //stop the setInterval whe time = 0 for avoid negative time
        clearInterval(refreshIntervalId);
                    }



};

updateCountdown();

const explanation = [
    {
        explanation: "The whale is the larget animal in the world other than trees",
      
    },
    {
        explanation: "Which is the smallest country in the world?",
       
    },
    {
        explanation: "Which is the largest desert in the world?",
       
    },
    {
        explanation: "Which is the smallest continent in the world?",

    }  
];

const questions = [
    {
        question: "Which is larget animal in the world?",
        answers: [
            { text: "Bart", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentExplanationIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let explanationElement = document.getElementById("explanation"); //explain

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    explanationElement.style.display = "none";  // Hide explanation when moving to the next question
    explanationElement.textContent = "";  // Clear the explanation text
}



function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        explanationElement.textContent = explanation[currentQuestionIndex].explanation; // Fix this line
    }
    
    explanationElement.style.display = "block"; // Show explanation

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    return true;
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length && time > 0){
        showQuestion();
    }else{
        showScore();
        endtimer();
        clearInterval(refreshIntervalId);
    }
}

function endtimer(){
    if(currentQuestionIndex === 3){
        
        console.log("nada")
    }
}
function mathlink(){

    location.href = "https://devrinh.github.io/Alvin-Tutorial/math.html";

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length && time > 0){
        handleNextButton();
        
    }else{
        localStorage.setItem("readingScore", score);
        
    }
});


startQuiz();
