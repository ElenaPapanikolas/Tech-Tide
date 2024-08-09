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
};

// Retrieve post data to fill edit post form
const startEditPost = async (id) => {
    const message = document.getElementById('edit-error-message');
    if (!id) {
        message.textContent = 'Post not found.  Please try again.'
    } else {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'GET',
            });
            if (response.ok) {
                const postData = await response.json();
                const id = postData.id;
                const title = postData.title;
                const content = postData.content;
                const authorId = postData.author_id;
                return { id, title, content, authorId }
            } else {
                const errorMessage = await response.json();
                message.textContent = errorMessage.message;
            }
        } catch (error) {
            message.textContent = error;
        }
    } 
};

// Function to handle editing post
const handleEditPost = async (post) => {
    // Gets access to edit button for event listener
    const editBtn = document.getElementById('submit-edit-post');
    // Gets access to modal input elements
    const title = document.getElementById('edit-title');
    const postContent = document.getElementById('edit-content');
    const message = document.getElementById('edit-error-message');

    title.value = post.title;
    postContent.value = post.content;

    if (editBtn) {
        editBtn.addEventListener('click', async () => {
            if ((title.value === "") || (postContent.value === "") ) {
                message.textContent = 'Please fill out all fields.';
            } else {
                try {
                    const response = await fetch(`/api/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ title: title.value.trim(), content: postContent.value.trim(), author_id: post.authorId }),
                        headers: {'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        document.location.replace('/dashboard');
                    } else {
                        const errorMessage = await response.json();
                        message.textContent = errorMessage.message;
                    }

                } catch (error) {
                    message.textContent = error;
                }
            } 
        })
    }

};

const handleDeletePost = async (id) => {
    if (id) {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error(error);
        }
    } 
    console.error('No ID found.  Failed to delete post.');
}

// Event listener to add a new post
newPostBtn.addEventListener('click', handleAddPost);

// Event listener for edit post buttons
document.querySelectorAll('.edit-post').forEach(button => {
    button.addEventListener('click', async function(event) {
        const postId = event.target.getAttribute('data-post-id');
        const postData = await startEditPost(postId);
        handleEditPost(postData);
        
    })
});

// Event listener for delete post buttons
document.querySelectorAll('.delete-post').forEach(button => {
    button.addEventListener('click', function (event) {
        const postId = event.target.getAttribute('data-post-id');
        handleDeletePost(postId);
    })
})
