// let userRightAnswers = [];

// const quizeUiContainer = document.getElementsByClassName("quize-ui-container")[0];
// const scoreElement = document.getElementsByClassName("score")[0];

// scoreElement.innerText = userRightAnswers.length;

// function updateScore() {
//     scoreElement.innerText = userRightAnswers.length;
//     console.log(userRightAnswers);
// }

// fetch("./data/data.json")
// .then((response) => response.json())
// .then((data) => {

//     data.questions.forEach((question, index) => {

//         const questionElement = document.createElement("div");
//         questionElement.className = "question-block";

//         const questionTitle = document.createElement("div");
//         questionTitle.className = "question";
//         questionTitle.innerText = `${index + 1}. ${question.question}`;

//         questionElement.appendChild(questionTitle);

//         const optionSerial = ["a", "b", "c", "d"];

//         question.options.forEach((option, i) => {

//             const optionWrapper = document.createElement("div");

//             const optionElement = document.createElement("p");
//             optionElement.className = "options";
//             optionElement.innerText = `${optionSerial[i]}. ${option}`;
//             optionElement.title = option;

//             optionWrapper.appendChild(optionElement);
//             questionElement.appendChild(optionWrapper);

//             optionElement.addEventListener("click", (event) => {

//                 const allOptions = questionElement.querySelectorAll(".options");

//                 allOptions.forEach(opt => {
//                     opt.style.pointerEvents = "none";
//                 });

//                 if (event.target.title === question.answer) {

//                     optionElement.style.backgroundColor = "green";
//                     optionElement.style.color = "white";

//                     userRightAnswers.push({
//                         question: question.question,
//                         answer: question.answer,
//                         userSelected: event.target.title
//                     });

//                 } else {

//                     optionElement.style.backgroundColor = "red";
//                     optionElement.style.color = "white";

//                     allOptions.forEach(opt => {
//                         if(opt.title === question.answer){
//                             opt.style.backgroundColor = "green";
//                             opt.style.color = "white";
//                         }
//                     });

//                 }

//                 updateScore();

//             });

//         });

//         quizeUiContainer.appendChild(questionElement);

//     });

// })
// .catch((error) => {
//     console.error("Error fetching quize data:", error);
// });

let userRightAnswers = [];
let currentQuestionIndex = 0;
let questions = [];

const quizeUiContainer = document.querySelector(".quize-ui-container");
const scoreElement = document.querySelector(".score");
const nextBtn = document.getElementById("nextBtn");

scoreElement.innerText = 0;

function updateScore(){
    scoreElement.innerText = userRightAnswers.length;
}

fetch("./data/data.json")
.then(responce => responce.json())
.then(data => {

    questions = data.questions;

    // show first question
    showQuestion();

});


function showQuestion(){

    quizeUiContainer.innerHTML = "";

    const question = questions[currentQuestionIndex];

    const questionTitle = document.createElement("h2");
    questionTitle.innerText = `${currentQuestionIndex+1}. ${question.question}`;

    quizeUiContainer.appendChild(questionTitle);

    const optionSerial = ["a","b","c","d"];

    question.options.forEach((option,i)=>{

        const optionElement = document.createElement("p");
        optionElement.className = "options";
        optionElement.innerText = `${optionSerial[i]}. ${option}`;
        optionElement.dataset.option = option;

        quizeUiContainer.appendChild(optionElement);


        optionElement.addEventListener("click",(event)=>{

            const allOptions = document.querySelectorAll(".options");

            // disable options
            allOptions.forEach(opt=>{
                opt.style.pointerEvents="none";
            });

            if(event.target.dataset.option === question.answer){

                optionElement.style.backgroundColor="green";
                optionElement.style.color="white";

                userRightAnswers.push(question);

            }
            else{

                optionElement.style.backgroundColor="red";
                optionElement.style.color="white";

                allOptions.forEach(opt=>{
                    if(opt.dataset.option === question.answer){
                        opt.style.backgroundColor="green";
                        opt.style.color="white";
                    }
                });

            }

            updateScore();

        });

    });

}


nextBtn.addEventListener("click",()=>{

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){

        showQuestion();

    }else{

        quizeUiContainer.innerHTML = `<h2>Quiz Finished 🎉</h2>
        <p>Your Score: ${userRightAnswers.length}/${questions.length}</p>`;

        nextBtn.style.display="none";

    }

});