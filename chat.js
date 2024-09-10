// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
var messagesRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to Firebase
function sendMessage(e) {
    e.preventDefault();

    // Get input values
    var username = document.getElementById("username-input").value;
    var recipient = document.getElementById("recipient-input").value;
    var message = document.getElementById("message-input").value;

    // Save message to Firebase with username and recipient
    messagesRef.push().set({
        sender: username,
        recipient: recipient,
        message: message
    });

    // Clear form
    document.getElementById("message-form").reset();
}

// Listen for new messages and display them if the recipient matches the current user
document.getElementById("username-input").addEventListener("input", loadMessages);

function loadMessages() {
    var currentUser = document.getElementById("username-input").value;
    document.getElementById("messages").innerHTML = ''; // Clear previous messages

    messagesRef.on("child_added", function(snapshot) {
        var messageData = snapshot.val();

        // Display only messages for the current user
        if (messageData.recipient === currentUser) {
            var messageElement = document.createElement("div");
            messageElement.textContent = messageData.sender + ": " + messageData.message;
            document.getElementById("messages").appendChild(messageElement);
        }
    });
}
