// Variables to hold user credentials
let users = JSON.parse(localStorage.getItem("users")) || {};

const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const authButton = document.getElementById('auth-button');
const authForm = document.getElementById('auth-form');
const toggleAuth = document.getElementById('toggle-auth');
const securedPage = document.querySelector('.secured-page');
const container = document.querySelector('.container');
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('logout-button');

let isLoginMode = false; // Tracks if it's in login mode or register mode

// Toggle between login and registration forms
toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    updateForm();
});

authButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    if (isLoginMode) {
        login(username, password);
    } else {
        register(username, password);
    }
});

// Registration logic
function register(username, password) {
    if (users[username]) {
        alert('Username already exists. Please choose another.');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now login.');
        switchToLogin();
    }
}

// Login logic
function login(username, password) {
    if (users[username] && users[username] === password) {
        // Successful login
        alert('Login successful!');
        showSecuredPage(username);
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Display the secured page after login
function showSecuredPage(username) {
    container.classList.add('hidden');
    securedPage.classList.remove('hidden');
    welcomeMessage.textContent = `Hello, ${username}`;
}

// Logout logic
logoutButton.addEventListener('click', () => {
    securedPage.classList.add('hidden');
    container.classList.remove('hidden');
    alert('You have been logged out.');
});

// Update form based on the mode (login or register)
function updateForm() {
    if (isLoginMode) {
        formTitle.textContent = 'Login';
        authButton.textContent = 'Login';
        toggleLink.innerHTML = 'Don\'t have an account? <a href="#">Register here</a>';
    } else {
        formTitle.textContent = 'Register';
        authButton.textContent = 'Register';
        toggleLink.innerHTML = 'Already have an account? <a href="#">Login here</a>';
    }
}

// Switch to login mode after successful registration
function switchToLogin() {
    isLoginMode = true;
    updateForm();
}
