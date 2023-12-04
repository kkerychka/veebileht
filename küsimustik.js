// selle küsimustiku tegemisel võtsin ideed kahest allikast: 
// 1) https://codingtorque.com/quiz-app-using-javascript/#google_vignette
// 2) https://www.codewithfaraz.com/content/161/build-a-quiz-application-with-html-css-and-javascript-step-by-step-guide#google_vignette
// pärast hakkasin tööd koos Chat GPT-ga, andsin talle need koodid ja seletasin, mida soovin endas küsimustikus näha, kuna kuna ma ei tunne JavaScripti üldse
(function () {
    // funktsioonid
    function buildQuiz() {
      // muutuja HTML väljundi salvestamiseks
      const output = [];
  
      // iga küsimuse jaoks...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // muutuja võimalike vastuste loendi salvestamiseks
        const answers = [];
  
        // ja iga saadaoleva vastuse jaoks...
        for (letter in currentQuestion.answers) {
          // ...HTMLi märkeruutu lisamine
          answers.push(
            `<label>
                  <input type="checkbox" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
          );
        }
  
        // küsimuse ja selle vastuste lisamine väljundisse
        output.push(
          `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
        );
      });
  
      // lõpuks ühendame väljundloend üheks HTML-istringiks ja paneme see lehele
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults() {
      // kogu vastuse konteinerid küsitluselt
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // kasutaja vastuste jälgimine
      let numCorrect = 0;
  
      // iga küsimuse jaoks...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // valitud vastuste leidmine
        const selectedOptions = answerContainers[questionNumber].querySelectorAll('input:checked');
        const userAnswers = Array.from(selectedOptions).map(option => option.value);
  
        // õigete ja valede vastuste leidmine
        const correctAnswers = currentQuestion.correctAnswers;
        const incorrectAnswers = userAnswers.filter(answer => !correctAnswers.includes(answer));
  
        // õigete vastuste värvimine roheliseks
        correctAnswers.forEach(answer => {
          const label = answerContainers[questionNumber].querySelector(`[value="${answer}"]`).parentNode;
          label.classList.add('correct');
        });
  
        // valede vastuste värvimine punaseks
        incorrectAnswers.forEach(answer => {
          const label = answerContainers[questionNumber].querySelector(`[value="${answer}"]`).parentNode;
          label.classList.add('incorrect');
        });
  
        // õigete vastuste arvu suurendamine
        if (arraysEqual(userAnswers, correctAnswers)) {
          numCorrect++;
        }
      });
  
      // õigete vastuste arv kokku
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
  
    // Muutujad
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
          e: "Vineerisaag"
        },
        correctAnswers: ["a", "b", "c", "d"]
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
  
    // alustamine
    buildQuiz();
  
    // lehelugemine
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // näitame esimest slaid
    showSlide(currentSlide);
  
    // sündmuse kuulajad
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();