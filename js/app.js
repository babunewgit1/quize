async function fetchData() {
  try {
    const response = await fetch("data/question.json");
    if (!response.ok) {
      throw new Error("Failed to fetch question.json");
    }
    const data = await response.json();
    allQuestions = data;
  } catch (error) {
    console.error(error);
  }
}

async function processQuestions() {
  await fetchData();
  const questionHeading = document.querySelector(".question_box h2");
  const mainQuestion = document.querySelector(".question_box p");
  const question_ans = document.querySelector(".question_ans");
  const skip = document.querySelector("#skip");
  const uncover = document.querySelector("#uncover");
  const uncover_more = document.querySelector(".uncover_more");
  const questionbox = document.querySelector(".questionbox");
  const nuclear = document.querySelector("#nuclear a");
  const relatedInfo = document.querySelector("#relatedInfo a");
  const nextquestion = document.querySelector(".nextquestion ");
  const question_box = document.querySelector(".question_box");

  if (allQuestions) {
    function displayQuestion() {
      const questionLength = allQuestions.length;
      const random = Math.round(Math.random() * (questionLength - 1));
      const questionSet = allQuestions[random];
      const answerSet = questionSet.answerOption;
      const rightAns = questionSet.correctAns;
      const logic = questionSet.correctLogic;
      const linkOne = questionSet.link[0];
      const linkTwo = questionSet.link[1];

      questionHeading.innerHTML = questionSet.questionHeading;
      mainQuestion.innerHTML = questionSet.mainQuestion;

      answerSet.forEach((ans, index) => {
        if (index === answerSet.length - 2) {
          question_ans.innerHTML += `<button class="ansbtn">${ans}</button><span>or</span>`;
        } else {
          question_ans.innerHTML += ` <button class="ansbtn">${ans}</button>`;
        }
      });

      const buttons = document.querySelectorAll(".ansbtn");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((btn) => {
            btn.classList.remove("right", "wrong");
          });

          skip.style.display = "none";
          uncover.style.display = "inline-block";

          const buttonText = button.textContent;
          if (buttonText === rightAns) {
            button.classList.add("right");
            questionHeading.innerHTML = "Correct";
            mainQuestion.innerHTML = logic;
            // question_ans.innerHTML = "";
            // displayQuestion();
          } else {
            button.classList.add("wrong");
            questionHeading.innerHTML = "Incorrect!";
            mainQuestion.innerHTML = logic;
          }
        });
      });

      uncover.addEventListener("click", function () {
        questionbox.style.display = "none";
        uncover_more.style.display = "block";
        uncover.style.backgroundColor = "#EF8848";
        nextquestion.style.display = "block";
        question_ans.style.display = "none";
        question_box.classList.add("nobgelment");

        relatedInfo.setAttribute("href", linkOne);
        nuclear.setAttribute("href", linkTwo);
      });
    }

    skip.addEventListener("click", function () {
      question_ans.innerHTML = "";
      displayQuestion();
    });

    nextquestion.addEventListener("click", function () {
      skip.style.display = "none";
      uncover.style.display = "inline-block";
      question_ans.innerHTML = "";
      uncover_more.style.display = "none";
      questionbox.style.display = "block";
      nextquestion.style.display = "none";
      question_ans.style.display = "flex";
      uncover.style.display = "none";
      skip.style.display = "inline-block";
      question_box.classList.remove("nobgelment");
      displayQuestion();
    });

    displayQuestion();
  } else {
    console.error("Data is not available.");
  }
}

processQuestions();
