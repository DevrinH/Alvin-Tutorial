let readScore = localStorage.getItem("readingScore");
let readingWritingScore = Number(readScore);

setTimeout(function() {

    showScore()
    }, 62000);
    
    const startingMinutes = 1;
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
    
    
    
    const questions = [
        {
            question: "5+5?",
            answers: [
                { text: "9", correct: false},
                { text: "10", correct: true},
                { text: "-5", correct: false},
                { text: "15", correct: false},
            ]
        },
        {
            question: "5-15?",
            answers: [
                { text: "10", correct: true},
                { text: "20", correct: false},
                { text: "-10", correct: false},
                { text: "-15", correct: false},
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
    
    let currentQuestionIndex = 0;
    let mathScore = 0;  //score
    
    function startQuiz(){
        currentQuestionIndex = 0;
        mathScore = 0;  //score
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
    
    
    function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
            
        }
    }
    
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            mathScore++; //score
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }
    
    function showScore(){
        resetState();
        questionElement.innerHTML = `You scored ${mathScore} out of ${questions.length} and your reading score was ${readingWritingScore}!`; //score
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
            
            mathlink(); 
        }
    });
    
    
    startQuiz();