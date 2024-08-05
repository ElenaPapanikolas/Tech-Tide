const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToLogin = document.getElementById('toggle-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Function to toggle signup form
const toggleSignup = (event) => { 
    event.preventDefault();
    if (signupForm.classList.contains('d-none')) {
        signupForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
    }
}

// Function to toggle login form
const toggleLogin = (event) => {
    event.preventDefault();
    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
    }
}

toggleToSignup.addEventListener('click', toggleSignup)
toggleToLogin.addEventListener('click', toggleLogin)