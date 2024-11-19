let currentQuestionIndex = 0;
let questions = [];
let totalQuestions = 0;
let correctAnswers = 0;

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:8080/api/getcompiler');
        console.log("hello");
        if (!response.ok) {
            throw new Error('Network response was not okay');
        } else {
            console.log("python questions fetched successfully!");
        }

        questions = await response.json();
        totalQuestions = questions.length;
        console.log(totalQuestions);

        document.getElementById('total-questions').textContent = totalQuestions;

        displayQuestions();
    } catch(error) {
        // console.error("An error occured while fetching !", error);

        document.getElementById('question-text').textContent = "Failed to load questions! Try Again later"
    }
}

function displayQuestions() {
    if(questions.length ==0) {
        console.log("No questions to display");
        return;
    }


    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    questionText.textContent = currentQuestion.questionText;

    optionsContainer.innerHTML = '';

    const options= [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4];

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    //updating the current question number
    document.getElementById('current-question').innerText = currentQuestionIndex + 1;


}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if(currentQuestion.correctAnswer == selectedOption) {
        correctAnswers++;
    }

    nextQuestion();
}

function nextQuestion() {
    if(currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        displayQuestions();
    } else{
        localStorage.setItem('quizScore', correctAnswers);
        localStorage.setItem('totalQuestion', totalQuestions);
        window.location.href = 'result.html'
    }
}

window.onload = fetchQuestions;