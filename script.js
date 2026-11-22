// Part A: Dark / Light theme switcher
const themeButton = document.getElementById('themeToggle');

// Restore the user's last selected theme, if available.
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}
updateThemeButton();

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = document.body.classList.contains('light-mode');
  themeButton.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
  themeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

// Part B: Five-question JavaScript and web development quiz
const questions = [
  {
    question: 'Which language is used to add interactivity to web pages?',
    options: ['Python', 'JavaScript', 'C', 'SQL'],
    answer: 'JavaScript'
  },
  {
    question: 'Which HTML tag is used to create the largest heading?',
    options: ['<p>', '<h6>', '<h1>', '<head>'],
    answer: '<h1>'
  },
  {
    question: 'Which CSS property changes the text colour?',
    options: ['font-size', 'background-color', 'color', 'border'],
    answer: 'color'
  },
  {
    question: 'Which keyword can be used to declare a variable in JavaScript?',
    options: ['let', 'print', 'echo', 'display'],
    answer: 'let'
  },
  {
    question: 'Which method selects an HTML element using its ID?',
    options: ['queryText()', 'getElementById()', 'console.log()', 'push()'],
    answer: 'getElementById()'
  }
];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const feedbackElement = document.getElementById('feedback');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
const progressElement = document.getElementById('progress');
const progressFill = document.getElementById('progressFill');
const scorePreview = document.getElementById('scorePreview');

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

function showQuestion() {
  answerSelected = false;
  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  optionsElement.innerHTML = '';
  feedbackElement.textContent = '';
  scorePreview.textContent = 'Choose one answer';
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? 'See Result →' : 'Next Question →';
  progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  current.options.forEach(optionText => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'option';
    optionButton.textContent = optionText;
    optionButton.addEventListener('click', () => selectAnswer(optionButton, optionText));
    optionsElement.appendChild(optionButton);
  });
}

function selectAnswer(selectedButton, selectedAnswer) {
  if (answerSelected) return;
  answerSelected = true;
  const correctAnswer = questions[currentQuestion].answer;
  const optionButtons = optionsElement.querySelectorAll('.option');

  optionButtons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) button.classList.add('correct');
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = 'Correct answer! Well done.';
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('incorrect');
    feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }
  scorePreview.textContent = `Score: ${score}/${questions.length}`;
  nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
  if (!answerSelected) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  questionElement.textContent = 'Quiz completed!';
  optionsElement.innerHTML = '';
  feedbackElement.textContent = '';
  scorePreview.textContent = 'Your final score';
  resultElement.hidden = false;
  resultElement.textContent = `You scored ${score} out of ${questions.length}. ${score === 5 ? 'Excellent work!' : score >= 3 ? 'Good effort! Keep practising.' : 'Keep learning and try again!'}`;
  nextButton.hidden = true;
  restartButton.hidden = false;
  progressElement.textContent = 'Completed';
  progressFill.style.width = '100%';
}

restartButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultElement.hidden = true;
  nextButton.hidden = false;
  restartButton.hidden = true;
  showQuestion();
});

// Display the current year in the footer.
document.getElementById('year').textContent = new Date().getFullYear();
showQuestion();
