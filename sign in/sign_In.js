function flipForm() {
    const container = document.getElementById('formContainer');
    container.classList.toggle('flipped');
}

// Toggle password visibility
document.addEventListener('click', function(e) {
    if (e.target.closest('.password-toggle')) {
        const toggle = e.target.closest('.password-toggle');
        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector('.password-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
            input.type = 'password';
            icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
    }
});

// Add focus effects to inputs
document.addEventListener('focus', function(e) {
    if (e.target.classList.contains('form-input')) {
        e.target.parentElement.classList.add('focused');
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.classList.contains('form-input')) {
        e.target.parentElement.classList.remove('focused');
    }
}, true);
    