document.querySelectorAll('.Score').forEach(scoreEl => {
    const score = parseFloat(scoreEl.getAttribute('data-score'));
    const max = 5;
    const percentage = (score / max) * 100;
    const fill = scoreEl.querySelector('.score-fill');
    fill.style.width = percentage + '%';
});