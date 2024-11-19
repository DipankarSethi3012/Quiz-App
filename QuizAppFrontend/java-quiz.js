let currentQuestionIndex = 0;
let questions= [];
let correctAnswers = 0; 
let totalQuestions = 0;

//function to fetch the questions from api
async function fetchQuestions() {
    try{
        const response = await fetch('http://localhost:8080/api/questions');

        if(!response.ok) {
            throw new Error('Network reponse was not okay')
        }else{
            console.log("Questions fetched successfully");
        }

        questions = await response.json();
        totalQuestions = questions.length;
        console.log(totalQuestions);

        document.getElementById('total-questions').textContent = totalQuestions;

        displayQuestions();

    } catch(error) {
        // console.error("Error fetching questions:", error);
        document.getElementById('question-text').textContent = "Failed to load questions. Please try again.";
    }
}

function displayQuestions() {
    if (questions.length == 0) return;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    questionText.textContent = currentQuestion.questionText;

    optionsContainer.innerHTML = ''; // Clear previous options

    // Create buttons for each option
    const options = [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4];

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    // Update the current question number
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;

}


function checkAnswer(selectedQuestion){
    const currentQuestion = questions[currentQuestionIndex];

    if(selectedQuestion == currentQuestion.correctAnswer) {
        console.log("correct");
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
        window.location.href = 'result.html';
    }
}

window.onload = fetchQuestions;