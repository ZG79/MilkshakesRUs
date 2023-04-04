'use strict';

// window to the DOM
let quiz = document.getElementById('questions');
let containerElem = document.getElementById('containerElem');
let calorieCount = document.getElementById('calories');
let priceElem = document.getElementById('price');
let imgOne = document.getElementById('op1');
let imgTwo = document.getElementById('op2');
let imgThree = document.getElementById('op3');
let imgFour = document.getElementById('op4');
let questionLi = document.getElementById('questionList');



// global state object to store everything
const state = {
  currentQuestion: 0,
  questions: [],
  totalCalories: 0,
  totalPrice: 0,
  selections: [],
};

// constructor function for option objects
function Option(name,imageSrc, calories, price) {
  this.name = name;
  this.imageSrc = imageSrc;
  this.calories = calories;
  this.price = price;
}

// constructor function for question objects
function Question(question, options) {
  this.question = question;
  this.options = options;
}

// create question objects
const question1 = new Question('What base do you like?', [
  new Option('Whole Milk' ,'wholeMilk.jpg', 150, 2.5),
  new Option('Low Fat','lowFat.jpg', 100, 3),
  new Option('Oat Milk','nonDairy.jpg', 120, 3.5),
  new Option('Almond Milk','almondMilk.jpg', 80, 4),
]);

const question2 = new Question('What flavor do you prefer?', [
  new Option('Vanila','vanila.jpg', 200, 2),
  new Option('Choclate','chocolate.jpg', 250, 2.5),
  new Option('Strawberry','strawberry.jpg', 180, 3),
  new Option('Matcha','matcha.jpg', 220, 4),
]);

const question3 = new Question('What size do you want?', [
  new Option('Small','small.jpg', 150, 2.5),
  new Option('Medium','medium.jpg', 200, 3),
  new Option('Large','large.jpg', 250, 3.5),
  new Option('Extra Large','xlarge.jpg', 300, 4),
]);

const question4 = new Question('What toppings do you like?', [
  new Option('Whipped Cream','whippedCream.jpg', 50, 0.5),
  new Option('Sprinkles','sprinkle.jpg', 30, 0.25),
  new Option('All Berries','allBerries.jpg', 80, 0.75),
  new Option('Caramel Syrup','caramelSyrup.jpg', 70, 1),
]);

// add questions to state
state.questions.push(question1, question2, question3, question4);

function handleClick(event) {
  let imgClicked = event.target.alt;
  state.selections.push(imgClicked);
  state.currentQuestion++;

  for (let i = 0; i < state.questions.length; i++) {
    const options = state.questions[i].options;
    // const money = state.questions[i].money;
    for (let j = 0; j < options.length; j++) {
      state.totalCalories += options[j].calories;
      // state.totalPrice += money[j].price;
    }
  }

  // for (let l = 0; l < state.questions.length; l++) {
  //   // const options = state.questions[i].options;
  //   const money = state.questions[l].money;
  //   for (let m = 0; m < money.length; m++) {
  //     // state.totalCalories += options[j].calories;
  //     state.totalPrice += money[m].price;
  //   }
  // }

  render();

}

function handleShowResult(){
  if (state.currentQuestion === state.questions.length) {
    clearQuiz();
  }
}
// Check if the user has clicked on the fourth image



function clearQuiz() {

  const elements = document.querySelectorAll('*');
  elements.remove();

};

// render function - show the current question and its options
function render() {
  const currentQuestion = state.questions[state.currentQuestion];
  questionLi.textContent = currentQuestion.question;

  console.log(currentQuestion.question);


  imgOne.src = `assets/${currentQuestion.options[0].imageSrc}`;
  imgOne.alt = currentQuestion.options[0].imageSrc.split('.')[0];
  imgOne.addEventListener('click', handleClick);

  imgTwo.src = `assets/${currentQuestion.options[1].imageSrc}`;
  imgTwo.alt = currentQuestion.options[1].imageSrc.split('.')[0];
  imgTwo.addEventListener('click', handleClick);

  imgThree.src = `assets/${currentQuestion.options[2].imageSrc}`;
  imgThree.alt = currentQuestion.options[2].imageSrc.split('.')[0];
  imgThree.addEventListener('click', handleClick);

  imgFour.src = `assets/${currentQuestion.options[3].imageSrc}`;
  imgFour.alt = currentQuestion.options[3].imageSrc.split('.')[0];
  imgFour.addEventListener('click', handleClick);
  
  console.log(quiz.firstChild);
  while (quiz.firstChild) {
    quiz.removeChild(quiz.firstChild);
  }
  console.log(quiz.firstChild);

  quiz.append(questionLi);
  handleShowResult();
}


render();

