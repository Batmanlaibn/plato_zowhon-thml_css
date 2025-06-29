

document.querySelector('.page1_icon1').addEventListener('click', function () {
    // ene dutuu
  alert('Icon1 darsan');
});

document.querySelector('.page1_icon2').addEventListener('click', function () {
  location.reload(); 
});

let isWatchVisible = false;
let areTabsVisible = false;

function toggleFooterUI(event) {
  const watchBtn = document.getElementById("watchCourseBtn");
  const tabs = document.getElementById("footerTabs");

  // ali button deer darsniig shalgan
  const clickedId = event.target.closest("button")?.id;

  // 1. icon1 deer darsan bol -> Watch Course towchiig toggle
  if (clickedId !== "watchCourseBtn") {
    if (!isWatchVisible) {
      watchBtn.style.display = "flex";
      isWatchVisible = true;
    } else {
      watchBtn.style.display = "none";
      tabs.style.display = "none"; // tabuudiig dawhar alga bolgon
      isWatchVisible = false;
      areTabsVisible = false;
    }
  }

  // 2. Watch Course deer darsan bol -> tab-uudiig toggle
  else {
    if (!areTabsVisible) {
      tabs.style.display = "flex";
      areTabsVisible = true;
    } else {
      tabs.style.display = "none";
      areTabsVisible = false;
    }
  }
}




// page1_content_wrapper iin uildel end baina
const imageContainer = document.getElementById("image_container");
const quizWrapper = document.getElementById("quiz_wrapper");

const imageSteps = [
  { images: [{ src: "./img/aslut_img/background.png", className: "img_background" }] },
  { images: [{ src: "./img/aslut_img/image 1.png", className: "img_1" }] },
  { images: [{ src: "./img/aslut_img/image 2.png", className: "img_2" }] },
  { images: [{ src: "./img/aslut_img/image 3.png", className: "img_3" }] },
  { images: [{ src: "./img/aslut_img/image 4.png", className: "img_4" }] }, // asult 1
  {
    images: [
      { src: "./img/aslut_img/image 5.1.png", className: "img_5_1" },
      { src: "./img/aslut_img/image 5.2.png", className: "img_5_2" }
    ]
  },
  { images: [{ src: "./img/aslut_img/image 6.png", className: "img_6" }] } // asult 2
];

const questions = [
  {
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, _____ nibh euismod tincidunt ut.",
    options: ["apple", "correct", "banana", "hello"],
    answer: "correct"
  },
  {
    text: "OpenAI is the creator of _____, a powerful AI language model.",
    options: ["Elon", "ChatGPT", "Bard", "Alexa"],
    answer: "ChatGPT"
  }
];

let currentIndex = 0;
let currentQuestion = 0;
let score = 0;

function showNextImage() {
  const continueBtn = document.getElementById("continueBtn");
  continueBtn.disabled = true; // tur Continue button idwehgui bolgon

  if (currentIndex < imageSteps.length) {
    const step = imageSteps[currentIndex];

    step.images.forEach(image => {
      const newImg = document.createElement("img");
      newImg.src = image.src;
      newImg.classList.add("page1_overlay_img");
      if (image.className) newImg.classList.add(image.className);
      imageContainer.appendChild(newImg);
    });

    const currentClass = step.images[0].className;

    if (currentClass === "img_4" && currentQuestion === 0) {
      quizWrapper.style.display = "flex";
      loadQuestion(currentQuestion);
    } else if (currentClass === "img_6" && currentQuestion === 1) {
      quizWrapper.style.display = "flex";
      loadQuestion(currentQuestion);
    } else {
      quizWrapper.style.display = "none";
      continueBtn.disabled = false; // herew asult bish bol Continue ajilna
    }

    currentIndex++;
  }
}

function showPrevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    const step = imageSteps[currentIndex];
    const countToRemove = step.images.length;

    for (let i = 0; i < countToRemove; i++) {
      const images = imageContainer.getElementsByTagName("img");
      const lastImg = images[images.length - 1];
      if (lastImg) imageContainer.removeChild(lastImg);
    }

    // quiz nuuh
    quizWrapper.style.display = "none";
  }
}

function loadQuestion(index) {
  const question = questions[index];
  const quizBox = document.getElementById("quiz_box");

  let optionsHTML = '';
  question.options.forEach(option => {
    optionsHTML += `<button class="page1_quiz_button" onclick="checkAnswer('${option}', '${question.answer}', this)">${option}</button>`;
  });

  quizBox.innerHTML = `
    <p>${question.text.replace("_____", `<span class="blank" id="blank">_____</span>`)}</p>
    <div class="choices">${optionsHTML}</div>
  `;
}

function checkAnswer(selected, correct, button) {
  const blank = document.getElementById("blank");
  const buttons = document.querySelectorAll(".choices button");

  buttons.forEach(btn => btn.disabled = true);
  blank.textContent = selected;

  buttons.forEach(btn => {
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#b9fbc0";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#ffadad";
    }
  });

  if (selected === correct) {
    score++;
    document.getElementById("score").textContent = score;
  }

  setTimeout(() => {
    currentQuestion++;
    quizWrapper.style.display = "none";

    if (currentQuestion < questions.length) {
      showNextImage(); // daragiin zuragluu toglon
    } else {
      showFinal();
    }
  }, 1500);
}

function showFinal() {
  const quizBox = document.getElementById("quiz_box");
  quizBox.innerHTML = `
    <h2>Тест дууслаа!</h2>
    <p>Нийт оноо: ${score} / ${questions.length}</p>
  `;
}

// huudas rephresh shuud zurag garhahguil
window.onload = () => {
  // ehelhed quiz haragdahgui
  quizWrapper.style.display = "none";
};
