// Function to fetch and display posts
function fetchPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '<h2>Existing Posts</h2>';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                postsContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Handle form submission to add a new post
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validate form
    if (!title || !content) {
        errorMessage.textContent = 'Both title and content are required.';
        return;
    }

    // Clear the error message
    errorMessage.textContent = '';

    // Send POST request to add a new post
    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Post added') {
            // Clear the form and reload posts
            document.getElementById('postForm').reset();
            fetchPosts();
        } else {
            errorMessage.textContent = data.error || 'An error occurred';
        }
    })
    .catch(error => console.error('Error adding post:', error));
});

// Fetch posts when the page loads
window.onload = fetchPosts;
