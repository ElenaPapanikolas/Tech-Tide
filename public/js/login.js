// Getting access to buttons and forms
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToLogin = document.getElementById('toggle-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginButton = document.getElementById('login-submit');
const signupButton = document.getElementById('signup-submit');

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

// Function to handle logging in
const handleLogin = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('login-p');

    // Checks for completed form
    if (!username || !password) {
        message.classList.remove('d-none');
        message.textContent = 'Please fill out form.';
    } else {
        try {
            // Post request to log in
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Redirect to dashboard if log in successful
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Display error messages if login not successful
                const error = await response.json();
                message.classList.remove('d-none');
                message.textContent = error.message;
            }
        } catch (error) {
            message.classList.remove('d-none');
            message.textContent = error;
        }
    }
}

// Function to handle signing up
const handleSignup = async (event) => {
    event.preventDefault();

    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const message = document.getElementById('signup-p');

    try {
        // to verify password length
        if (password.length < 8) {
            message.classList.remove('d-none');
            message.textContent = 'Passwords must be 8 characters or more.';
            return;
        }

        const response = await fetch ('/api/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorMessage = await response.json();
            message.classList.remove('d-none');
            message.textContent =errorMessage.message;
        }
    } catch (error) {
        message.classList.remove('d-none');
        message.textContent = error.message || 'An unknown error occurred.';
    }
}



// Event listeners 
signupButton.addEventListener('click', handleSignup)
loginButton.addEventListener('click', handleLogin)
toggleToSignup.addEventListener('click', toggleSignup)
toggleToLogin.addEventListener('click', toggleLogin)