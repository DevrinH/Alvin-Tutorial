document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
});


const lessons = [
    {
        title: "Introduction to Algebra",
        description: "Learn the basics of algebra, including solving simple equations.",
        difficulty: "easy",
        category: "algebra",
        questions: [
            {
                question: "Solve for x: 5x + 3 = 18",
                answers: [
                    { text: "A) 2", correct: false },
                    { text: "B) 3", correct: true },
                    { text: "C) 4", correct: false },
                    { text: "D) 5", correct: false }
                ],
                explanation: "The correct answer is B) 3. 5x + 3 = 18 -> 5x = 15 -> x = 3."
            },
            {
                question: "If y = 2x + 1, what is the value of y when x = 3?",
                answers: [
                    { text: "A) 5", correct: false },
                    { text: "B) 6", correct: false },
                    { text: "C) 7", correct: true },
                    { text: "D) 8", correct: false }
                ],
                explanation: "The correct answer is C) 7. y = 2(3) + 1 = 6 + 1 = 7."
            }
        ]
    },
    {
        title: "Linear Equations",
        description: "Explore linear equations and how to solve them efficiently.",
        difficulty: "medium",
        category: "algebra",
        questions: [
            {
                question: "What is the solution to the inequality 2x - 5 > 3?",
                answers: [
                    { text: "A) x > 4", correct: true },
                    { text: "B) x < 4", correct: false },
                    { text: "C) x > 1", correct: false },
                    { text: "D) x < 1", correct: false }
                ],
                explanation: "The correct answer is A) x > 4. 2x - 5 > 3 -> 2x > 8 -> x > 4."
            },
            {
                question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
                answers: [
                    { text: "A) 10 hours", correct: false },
                    { text: "B) 11 hours", correct: true },
                    { text: "C) 9 hours", correct: false },
                    { text: "D) 8 hours", correct: false }
                ],
                explanation: "The correct answer is B) 11 hours. The customer has $45 - $12 = $33 left for rental. $33 / $3 per hour = 11 hours."
            }
        ]
    }
];

let categoryStats = { algebra: { correct: 0, incorrect: 0 } };
let currentQuestionIndex = 0;

function displayLessonSelection() {
    let lessonSelectionHTML = `<h2>Select a Lesson</h2>`;
    lessons.forEach((lesson, index) => {
        lessonSelectionHTML += `
            <button class="lesson-btn" data-index="${index}">${lesson.title}</button>
        `;
    });

    document.getElementById('lesson-content').innerHTML = lessonSelectionHTML;
    
    document.querySelectorAll('.lesson-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const lessonIndex = e.target.getAttribute('data-index');
            startLesson(lessonIndex);
        });
    });
}

function startLesson(index) {
    currentLesson = lessons[index]; // Store selected lesson
    document.getElementById('lesson-content').innerHTML = `
        <h2>${currentLesson.title}</h2>
        <p>${currentLesson.description}</p>
        <button id="start-lesson-btn">Start Lesson</button>
    `;
    document.getElementById('start-lesson-btn').addEventListener('click', showExample);
}

document.addEventListener("DOMContentLoaded", displayLessonSelection);


function showExample() {
    document.getElementById('lesson-content').innerHTML = `
        <h2>Example: Solving for x</h2>
        <p>Consider the equation: 2x + 3 = 7</p>
        <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
        <p>Step 2: Simplify: 2x = 4</p>
        <p>Step 3: Divide by 2: x = 2</p>
        <button id="next-example">Next Example</button>
    `;
    document.getElementById('next-example').addEventListener('click', showNextExample);
}

function showNextExample() {
    document.getElementById('lesson-content').innerHTML = `
        <h2>Example: Solving for y</h2>
        <p>Consider the equation: y - 4 = 10</p>
        <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
        <p>Step 2: Simplify: y = 14</p>
        <button id="next-question">Next Question</button>
    `;
    document.getElementById('next-question').addEventListener('click', askQuestion);
}

function askQuestion() {
    document.getElementById('lesson-content').innerHTML = `
        <h2>Question 1</h2>
        <p>Solve for x: 3x - 4 = 5</p>
        <input type="text" id="answer1" placeholder="Your answer">
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const answer = document.getElementById('answer1').value;
    if (answer == '3') {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showNextExample3();
    } else {
        alert('Incorrect. Try again.');
        categoryStats.algebra.incorrect++;
    }
}

function showNextExample3() {
    document.getElementById('lesson-content').innerHTML = `
        <h2>Example: Evaluating a Function</h2>
        <p>Consider the function f(x) = 3x² - 2x + 1. What is the value of f(3)?</p>
        <p>Step 1: Substitute x with 3: f(3) = 3(3)² - 2(3) + 1</p>
        <p>Step 2: Calculate: f(3) = 27 - 6 + 1 = 22</p>
        <button id="next-question">Next Question</button>
    `;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    document.getElementById('lesson-content').innerHTML = `
        <h2>Question 2</h2>
        <p>Solve for y: y + 5 = 12</p>
        <input type="text" id="answer2" placeholder="Your answer">
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const answer = document.getElementById('answer2').value;
    if (answer == '7') {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showQuiz();
    } else {
        alert('Incorrect. Try again.');
        categoryStats.algebra.incorrect++;
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    showNextQuizQuestion();
}

function showNextQuizQuestion() {
    if (currentQuestionIndex >= currentLesson.questions.length) {
        showFinalScore();
        return;
    }

    const question = currentLesson.questions[currentQuestionIndex];
    document.getElementById('lesson-content').innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}</h2>
        <p>${question.question}</p>
        ${question.answers.map((answer, index) => `
            <input type="radio" id="q${currentQuestionIndex}a${index}" name="q${currentQuestionIndex}" value="${answer.correct}">
            <label for="q${currentQuestionIndex}a${index}">${answer.text}</label><br>
        `).join('')}
        <button id="submit-answer">Submit Answer</button>
    `;

    document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question));
}


function checkQuizAnswer(question) {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentQuestionIndex++;
        currentQuestionIndex < mathQuestions.length ? showNextQuizQuestion() : showFinalScore();
    } else {
        alert('Please select an answer.');
    }
}

function showFinalScore() {
    let totalCorrect = 0, totalAttempted = 0;
    Object.values(categoryStats).forEach(stats => {
        totalCorrect += stats.correct;
        totalAttempted += stats.correct + stats.incorrect;
    });
    
    localStorage.setItem("finalScore", JSON.stringify({ correct: totalCorrect, attempted: totalAttempted, percentage: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0 }));
    
    document.getElementById('lesson-content').innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%</p>
        <button id="continue-button">Continue</button>
    `;
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });
}


//code ended here

function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    // Store the final score in localStorage
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage
    }));

    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage });
}


function showFinalScore() {
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted); // Log the score before redirecting

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = ''; // Clear lesson content
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button">Continue</button>
    `;

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });

    recordTestResults();
}



    // This function is no longer needed as we are grading each question individually
function gradeQuiz() {
    console.log("Grading quiz");
    let score = 0;
    let totalQuestions = mathQuestions.length;

    mathQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (!categoryStats[question.category]) {
            categoryStats[question.category] = { correct: 0, incorrect: 0 };
        }

        if (selectedAnswer) {
            if (selectedAnswer.value === "true") {
                score++;
                categoryStats[question.category].correct++;
            } else {
                categoryStats[question.category].incorrect++;
            }
        } else {
            console.log(`No answer selected for question ${index + 1}`);
        }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    console.log(`Quiz score: ${percentage}%`);
    
    localStorage.setItem("quizPercentage", percentage); // Store percentage in localStorage
    window.location.href = "results.html"; // Redirect to results page
}


function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    console.log("Previous testResults from localStorage:", results);

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {};
    }

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        console.log(`Before update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`After update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function updateDisplayedPercentage(categoryStats) {
    console.log("Updating displayed percentages");
    let percentageElement = document.getElementById("algebra-percentage");
    if (percentageElement) {
        let correct = categoryStats["algebra"]?.correct || 0;
        let incorrect = categoryStats["algebra"]?.incorrect || 0;
        let total = correct + incorrect;
        let percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        percentageElement.innerText = `Correct Answers: ${percentage}%`;
    } else {
        console.warn("Percentage element not found.");
    }
}

function showScore(correct, incorrect) {
    // Store only the latest quiz results
    let lastScore = { correct, incorrect };

    // Save last score to localStorage
    localStorage.setItem("lastQuizScore", JSON.stringify(lastScore));

    // Calculate percentage
    const total = correct + incorrect;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Update UI if element exists
    const percentageElement = document.getElementById("quiz-percentage");
    if (percentageElement) {
        percentageElement.textContent = `Correct Answers: ${percentage}% (${correct}/${total})`;
    }
}