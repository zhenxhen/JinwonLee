async function getSaju() {
    const name = 'John'; // Replace with dynamic input if needed
    try {
        const response = await fetch('http://localhost:3000/sajusayyo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        });

        const data = await response.json();
        addMessageToChat('System', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
        addMessageToChat('System', 'Error: ' + error.message);
    }
}

function sendMessage() {
    const inputElement = document.getElementById('chatInput');
    const message = inputElement.value;
    inputElement.value = '';
    addMessageToChat('You', message);

    // Call getSaju() for demonstration
    getSaju();
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chatOutput');
    const newMessageDiv = document.createElement('div');
    newMessageDiv.textContent = sender + ': ' + message;
    chatBox.appendChild(newMessageDiv);
}

// Optional: Scroll to the bottom of the chat box when a new message is added
function updateScroll(){
    var chatBox = document.getElementById("chatOutput");
    chatBox.scrollTop = chatBox.scrollHeight;
}
