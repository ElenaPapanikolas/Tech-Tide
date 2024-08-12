// Function to pass correct postID to submit button
const showCommentForm = (event) => {
    // Get ID of post
    const postId = event.target.getAttribute('data-id');
    document.getElementById('add-comment').setAttribute('data-post-id', postId);

};

// Function to submit a new comment
const submitComment = async (event) => {
    // Get ID of user logged in
    const userId = document.getElementById('add-comment').getAttribute('data-user-id');
    // Get ID of post
    const postId = document.getElementById('add-comment').getAttribute('data-post-id');
    // Get access to error message paragraph
    const message = document.getElementById('comment-error-message');
        // Get access to form input element
        const commentBody = document.getElementById('comment-content').value.trim();
        if (!userId) {
            message.textContent = 'Must be logged in to add a comment';
        } else if (!postId) {
            message.textContent = 'Post no longer exists';
            return;
        } 
        if (!commentBody) {
            message.textContent = 'Please fill out comment form';
        } else {
            try {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({ content: commentBody, post_id: postId, author_id: userId }),
                    headers: { 'Content-Type': 'application/json', },
                });
                if (response.ok) {
                    document.location.replace(`post/${postId}`);
                } else {
                    const errorMessage = await response.json();
                    message.textContent = errorMessage.message;
                }
            } catch (error) {
                message.textContent = error;
            }
        }
}

// Event listener to submit comment
document.getElementById('add-comment').addEventListener('click', submitComment);

// Event listener to view specific post page
document.addEventListener('click', function(event) {
    if (event.target.closest('.card .comment-btn')) {
        return;
    }
    const card = event.target.closest('.card');
    if (card) {
        const postId = card.getAttribute('data-id');
        if (postId) {
            document.location.replace(`/post/${postId}`);
        }
    }
});

// Event listener for comment buttons
document.querySelectorAll('.comment-btn').forEach(button => {
    button.addEventListener('click', showCommentForm);
});
