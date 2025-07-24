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

            // Send the user's message to the FastAPI backend (use the live deployment link here)
            fetch('https://shop-bot-sooty.vercel.app/chat', {
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


