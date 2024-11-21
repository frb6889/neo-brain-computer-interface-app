document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
    const trainingArea = document.getElementById("training-area") as HTMLDivElement;
    const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
    const resultMessage = document.getElementById("result-message") as HTMLParagraphElement;
    const question = document.getElementById("question") as HTMLParagraphElement;
    const answerInput = document.getElementById("answer-input") as HTMLInputElement;

    // Click event for the Start button
    startBtn.addEventListener("click", () => {
        trainingArea.style.display = "block";
        startBtn.style.display = "none";
        question.textContent = "What is 5 + 3?";
    });

    // Click event for the Submit button
    submitBtn.addEventListener("click", () => {
        const userAnswer = answerInput.value.trim();
        if (userAnswer === "8") {
           
