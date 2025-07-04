// Load questions from localStorage or use default
let questions = JSON.parse(localStorage.getItem('questions')) || [
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

// Display existing questions
function displayQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${q.text} (Answer: ${q.answer})
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionList.appendChild(li);
    });
}

// Add new question
document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('question-text').value;
    const options = document.getElementById('options').value.split(',').map(opt => opt.trim());
    const answer = document.getElementById('answer').value.trim();

    if (text && options.length >= 2 && answer && options.includes(answer)) {
        questions.push({ text, options, answer });
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
        e.target.reset();
    } else {
        alert('Please provide valid question text, at least two options, and a correct answer that matches one of the options.');
    }
});

// Delete question
function deleteQuestion(index) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

// Initialize
displayQuestions();





// Card Management
let cards = JSON.parse(localStorage.getItem('cards')) || [
    {
        title: "Design Systems for Websites Using Figma",
        image: "./img/image5.png",
        price: 99,
        score: 3.7,
        instructor: "IDERBAT"
    },
    {
        title: "Design Systems for Websites Using Figma",
        image: "./img/image4.png",
        price: 99,
        score: 3.7,
        instructor: "IDERBAT"
    },
    {
        title: "Design Systems for Websites Using Figma",
        image: "./img/image6.png",
        price: 99,
        score: 3.7,
        instructor: "IDERBAT"
    },
    {
        title: "Design Systems for Websites Using Figma",
        image: "./img/image7.png",
        price: 99,
        score: 3.7,
        instructor: "IDERBAT"
    }
];

// Display existing questions
function displayQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${q.text} (Answer: ${q.answer})
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionList.appendChild(li);
    });
}

// Display existing cards
function displayCards() {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${card.title} (Price: $${card.price}, Score: ${card.score}, Instructor: ${card.instructor})
            <button onclick="deleteCard(${index})">Delete</button>
        `;
        cardList.appendChild(li);
    });
}

// Add new question
document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('question-text').value;
    const options = document.getElementById('options').value.split(',').map(opt => opt.trim());
    const answer = document.getElementById('answer').value.trim();

    if (text && options.length >= 2 && answer && options.includes(answer)) {
        questions.push({ text, options, answer });
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
        e.target.reset();
    } else {
        alert('Please provide valid question text, at least two options, and a correct answer that matches one of the options.');
    }
});

// Add new card
document.getElementById('card-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('card-title').value.trim();
    const image = document.getElementById('card-image').value.trim();
    const price = parseFloat(document.getElementById('card-price').value);
    const score = parseFloat(document.getElementById('card-score').value);
    const instructor = document.getElementById('card-instructor').value.trim();

    if (title && image && !isNaN(price) && !isNaN(score) && score >= 0 && score <= 5 && instructor) {
        cards.push({ title, image, price, score, instructor });
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards();
        e.target.reset();
    } else {
        alert('Please provide valid inputs: a title, image URL, valid price, score (0-5), and instructor name.');
    }
});

// Delete question
function deleteQuestion(index) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

// Delete card
function deleteCard(index) {
    if (confirm('Are you sure you want to delete this card?')) {
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards();
    }
}

// Initialize
displayQuestions();
displayCards();


function displayCards() {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${card.title} (Price: $${card.price}, Score: ${card.score}, Instructor: ${card.instructor})
            <button onclick="editCard(${index})">Edit</button>
            <button onclick="deleteCard(${index})">Delete</button>
        `;
        cardList.appendChild(li);
    });
}

function editCard(index) {
    const card = cards[index];
    document.getElementById('card-title').value = card.title;
    document.getElementById('card-image').value = card.image;
    document.getElementById('card-price').value = card.price;
    document.getElementById('card-score').value = card.score;
    document.getElementById('card-instructor').value = card.instructor;

    // Change form submit to update instead of add
    const form = document.getElementById('card-form');
    form.onsubmit = function (e) {
        e.preventDefault();
        const title = document.getElementById('card-title').value.trim();
        const image = document.getElementById('card-image').value.trim();
        const price = parseFloat(document.getElementById('card-price').value);
        const score = parseFloat(document.getElementById('card-score').value);
        const instructor = document.getElementById('card-instructor').value.trim();

        if (title && image && !isNaN(price) && !isNaN(score) && score >= 0 && score <= 5 && instructor) {
            cards[index] = { title, image, price, score, instructor };
            localStorage.setItem('cards', JSON.stringify(cards));
            displayCards();
            form.reset();
            form.onsubmit = addCard; // Reset to default add behavior
        } else {
            alert('Please provide valid inputs.');
        }
    };
}

function addCard(e) {
    e.preventDefault();
    const title = document.getElementById('card-title').value.trim();
    const image = document.getElementById('card-image').value.trim();
    const price = parseFloat(document.getElementById('card-price').value);
    const score = parseFloat(document.getElementById('card-score').value);
    const instructor = document.getElementById('card-instructor').value.trim();

    if (title && image && !isNaN(price) && !isNaN(score) && score >= 0 && score <= 5 && instructor) {
        cards.push({ title, image, price, score, instructor });
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards();
        e.target.reset();
    } else {
        alert('Please provide valid inputs.');
    }
}

// Update form submit to use addCard by default
document.getElementById('card-form').addEventListener('submit', addCard);



