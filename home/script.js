// Page2 Score
document.querySelectorAll('.page2_Score').forEach(scoreEl => {
  const score = parseFloat(scoreEl.getAttribute('data-score')); 
  const max = 5;
  const percentage = (score / max) * 100;
  const fill = scoreEl.querySelector('.page2_score_fill');
  if (fill) fill.style.width = percentage + '%';
});

// Page3 Score
document.querySelectorAll('.page3_Score').forEach(scoreEl => {
  const score = parseFloat(scoreEl.getAttribute('data-score')); 
  const max = 5;
  const percentage = (score / max) * 100;
  const fill = scoreEl.querySelector('.page3_score_fill');
  if (fill) fill.style.width = percentage + '%';
});

// Responsive quiz positioning
function updateQuizPosition() {
  const quizWrapper = document.getElementById("quiz_wrapper");
  const imageContainer = document.getElementById("image_container");
  
  if (window.innerWidth <= 767) {
    // Mobile: position quiz below the image
    quizWrapper.style.position = "relative";
    quizWrapper.style.left = "0";
    quizWrapper.style.top = "0";
    quizWrapper.style.transform = "none";
    quizWrapper.style.marginTop = "20px";
  } else if (window.innerWidth <= 1024) {
    // Tablet: adjust position
    quizWrapper.style.position = "absolute";
    quizWrapper.style.left = "calc(50% + 200px)";
    quizWrapper.style.top = "50%";
    quizWrapper.style.transform = "translateY(-50%)";
    quizWrapper.style.marginTop = "0";
  } else {
    // Desktop: original position
    quizWrapper.style.position = "absolute";
    quizWrapper.style.left = "calc(50% + 320px)";
    quizWrapper.style.top = "50%";
    quizWrapper.style.transform = "translateY(-50%)";
    quizWrapper.style.marginTop = "0";
  }
}

// Update quiz position on window resize
window.addEventListener('resize', updateQuizPosition);

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

// Mobile touch handling for footer
function handleMobileTouch() {
  const footer = document.querySelector('.baingiin_footer');
  
  if (window.innerWidth <= 767) {
    // Add touch event listeners for mobile
    footer.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, { passive: false });
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
      updateQuizPosition(); // Update position when quiz shows
    } else if (currentClass === "img_6" && currentQuestion === 1) {
      quizWrapper.style.display = "flex";
      loadQuestion(currentQuestion);
      updateQuizPosition(); // Update position when quiz shows
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
  
  // Initialize responsive features
  updateQuizPosition();
  handleMobileTouch();
  
  // Add smooth scrolling for mobile
  if (window.innerWidth <= 767) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};








const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const target = entry.target;

    if (entry.isIntersecting) {
      target.classList.add('show');
    } else {
      target.classList.remove('show'); // scroldhod animate dahin ajillah bolomj
    }
  });
}, {
  threshold: 0.2, // 20% haragdah uyd trigger
});

// buh .page4_animate elimentuud deer observer hiih
document.querySelectorAll('.animate').forEach((el) => observer.observe(el));


