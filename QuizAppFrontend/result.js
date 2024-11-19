function displayResult() {
    const score = localStorage.getItem('quizScore');
    const totalQuestions = localStorage.getItem('totalQuestion');

    const feedback = document.getElementById('feedback');


    if(score != null) {
        document.getElementById('score').innerText = `You Scored ${score} out of ${totalQuestions}`;

        const percentage = (score / totalQuestions) * 100;

        if(percentage >= 80) {
            feedback.innerText = 'Excellent work! keep it up';
        }
        else if(percentage >= 50) {
            feedback.innerText = 'Good Job! You can do it better';
        }
        else{
            feedback.innerText = 'Success Always comes form hard work. Try Again !'
        }

    } else{
        document.getElementById('score').innerText = 'No Score Available'
    }
}

window.onload = displayResult;