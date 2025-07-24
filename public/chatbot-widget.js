document.addEventListener('DOMContentLoaded', function() {
    // Create the container for the chatbot
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatbot-container';
    document.body.appendChild(chatContainer);

    // Create the chat box area
    const chatBox = document.createElement('div');
    chatBox.id = 'chatbox';
    chatContainer.appendChild(chatBox);

    // Input field for the user to type a message
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'user-input';
    inputField.placeholder = 'Ask me anything...';
    chatContainer.appendChild(inputField);

    // Event listener for the user pressing Enter
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const userMessage = inputField.value;
            inputField.value = '';
            chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

            // Send the user's message to the FastAPI backend
            fetch('http://127.0.0.1:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                // Display the bot's response in the chat box
                chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
            })
            .catch(error => {
                // Error handling
                console.error('Error:', error);
                chatBox.innerHTML += `<p><strong>Bot:</strong> Sorry, I am having trouble understanding you right now.</p>`;
            });
        }
    });
});


//  Deploy Your FastAPI Backend
// Make sure your FastAPI backend is running and accessible at the correct URL (http://127.0.0.1:8000). If you're deploying your FastAPI backend (e.g., on Vercel), update the JavaScript in chatbot-widget.js to use the deployed backend URL.
// fetch('https://your-deployed-api-url.com/chat', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ message: userMessage })
// })
