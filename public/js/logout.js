// Getting access to button
const logoutButton = document.getElementById('logout-btn');

// Function to log out
const handleLogout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.error('Error logging out.');
        }
    } catch(error) {
        console.error(error);
    }
};

// Event listener for logout button
logoutButton.addEventListener('click', handleLogout);