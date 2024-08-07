const newPostBtn = document.getElementById('new-post');

// Function to send new post POST request to server
const handleAddPost = async (req, res) => {
    // Getting access to author id from newPostBtn
    const authorId = newPostBtn.getAttribute('data-user-id');
    // Getting access to form elements
    const title = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    const message = document.getElementById('post-error-message');

    if (!title || !postContent) {
        message.textContent = 'Please fill out both fields.'
        return;
    } else {
        try { // Fetch request to create a new post
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title: title, content: postContent, author_id: authorId }),
                headers: { 'Content-Type': 'application/json', },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                const errorMessage = await response.json();
                message.textContent = errorMessage.message
            }
        } catch (error) {
            message.textContent = error;
        }
    }
}

newPostBtn.addEventListener('click', handleAddPost);