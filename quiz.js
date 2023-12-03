(function () {
    // Functions
    function buildQuiz() {
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML checkbox
          answers.push(
            `<label>
                  <input type="checkbox" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answers
        const selectedOptions = answerContainers[questionNumber].querySelectorAll('input:checked');
        const userAnswers = Array.from(selectedOptions).map(option => option.value);
  
        // find correct and incorrect answers
        const correctAnswers = currentQuestion.correctAnswers;
        const incorrectAnswers = userAnswers.filter(answer => !correctAnswers.includes(answer));
  
        // color the correct answers green
        correctAnswers.forEach(answer => {
          const label = answerContainers[questionNumber].querySelector(`[value="${answer}"]`).parentNode;
          label.classList.add('correct');
        });
  
        // color the incorrect answers red
        incorrectAnswers.forEach(answer => {
          const label = answerContainers[questionNumber].querySelector(`[value="${answer}"]`).parentNode;
          label.classList.add('incorrect');
        });
  
        // increment the number of correct answers
        if (arraysEqual(userAnswers, correctAnswers)) {
          numCorrect++;
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if (currentSlide === 0) {
        previousButton.style.display = 'none';
      } else {
        previousButton.style.display = 'inline-block';
      }
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
      answerContainers[currentSlide].querySelectorAll('label').forEach(label => label.classList.remove('correct', 'incorrect'));
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
      answerContainers[currentSlide].querySelectorAll('label').forEach(label => label.classList.remove('correct', 'incorrect'));
    }
  
    function arraysEqual(arr1, arr2) {
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz-content');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Milliseid komponente on arvuti ehitamiseks vaja?",
        answers: {
          a: "Protsessor",
          b: "RAM-mälu",
          c: "Graafikakaart",
          d: "Emaplaat",
          e: "Kõik eelnevad"
        },
        correctAnswers: ["a", "b", "c", "d", "e"]
      },
      {
        question: "Mis on protsessor?",
        answers: {
          a: "Arvuti kõlar",
          b: "Arvuti keskprotsessor",
          c: "Mälupulk",
          d: "Hiir"
        },
        correctAnswers: ["b"]
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();