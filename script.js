document.addEventListener("DOMContentLoaded", () => {
    // Fetch the CSV file
    fetch('questions.csv')
        .then(response => response.text())
        .then(data => {
            const questions = parseCSV(data);
            displayQuestions(questions);
        });
});

// Parse CSV into an array of objects
function parseCSV(data) {
    const rows = data.split("\n").slice(1); // Skip the header row
    const questions = rows.map(row => {
        const [question, answer] = row.split(",");
        return { question, answer };
    });
    return questions;
}

// Display questions and answers
function displayQuestions(questions) {
    const questionsSection = document.getElementById('questions');
    questions.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        // Add question and answer elements
        questionDiv.innerHTML = `
            <p>${index + 1}. ${item.question}</p>
            <div class="answer" style="display: none;">
                ${item.answer}
            </div>
        `;
        
        // Add click event to toggle answer visibility
        questionDiv.onclick = function () {
            const answer = this.querySelector('.answer');
            if(answer.style.display == 'none' || !answer.style.display)
            {
                answer.style.display = "block";
            }
            else
            {
                answer.style.display = "none";
            }
        };
        
        questionsSection.appendChild(questionDiv);
    });
}

// Search functionality (optional)
function searchQuestions() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const text = question.innerText || question.textContent;
        question.style.display = text.toUpperCase().includes(input) ? "" : "none";
    });
}
