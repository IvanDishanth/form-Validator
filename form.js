// Get Form Elements by ID
const regForm = document.getElementById('registrationForm');
const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('showPassword');
const successMessage = document.getElementById('successMessage');

// Event Listeners
regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
        successMessage.style.display = 'block';
        saveToLocal();
        alert('Form submitted successfully!');
    } else {
        successMessage.style.display = 'none';
        scrollToFirstError();
    }
});

passwordField.addEventListener('input', function () {
    const strength = calculateStrength(passwordField.value);
    const strengthIndicator = document.getElementById('strengthIndicator');
    strengthIndicator.style.width = strength.percent + '%';
    strengthIndicator.style.backgroundColor = strength.color;
});

showPasswordCheckbox.addEventListener('change', function () {
    const type = showPasswordCheckbox.checked ? 'text' : 'password';
    passwordField.type = type;
    confirmPasswordField.type = type;
});

// Functions
function validateForm() {
    let isValid = true;
    isValid &= check(usernameField.value, 'usernameError', /^[a-zA-Z0-9]{3,15}$/, 'Username must be 3-15 characters (letters and numbers only).');
    isValid &= check(emailField.value, 'emailError', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
    isValid &= check(passwordField.value, 'passwordError', /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.');
    isValid &= check(confirmPasswordField.value === passwordField.value, 'confirmPasswordError', /true/, 'Passwords do not match.');
    return !!isValid;
}

function check(value, id, regex, message) {
    if (!regex.test(value)) {
        setError(id, message);
        return false;
    } else {
        clearError(id);
        return true;
    }
}

function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;

    if (strength <= 50) return { percent: strength, color: 'red' };
    if (strength <= 75) return { percent: strength, color: 'orange' };
    return { percent: strength, color: 'green' };
}

function setError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    const inputElement = document.querySelector(`#${id.replace('Error', '')}`);
    inputElement.style.borderColor = 'red';
}

function clearError(id) {
    const errorElement = document.getElementById(id);
    errorElement.style.display = 'none';
    const inputElement = document.querySelector(`#${id.replace('Error', '')}`);
    inputElement.style.borderColor = 'green';
}

function scrollToFirstError() {
    const firstError = document.querySelector('.error[style*="display: block"]');
    if (firstError) {
        const inputElement = document.querySelector(`#${firstError.id.replace('Error', '')}`);
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function saveToLocal() {
    localStorage.setItem('username', usernameField.value);
    localStorage.setItem('email', emailField.value);
}