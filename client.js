const textInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('btn-send');
const chatList = document.querySelector('.chat-list');
const clientList = document.querySelector('.client-window ul');
const ws = new WebSocket('ws://localhost:1017');

//Get username
const username = prompt('What is your username?');
const userObj = {type: "user", username: username, colour: "green"};

//Websocket connected
ws.onopen = () => {
    console.log(`Connected to chat as ${username}...`);
    ws.send(JSON.stringify(userObj));
};

//Update chat/client list
ws.onmessage = (data) => {

    const message = JSON.parse(data.data);

    switch (message.type) {
        case "message":
            console.log(`${message.username}:${message.message}`);

            //Create chat item
            var msgElement = document.createElement('li');
            msgElement.innerHTML = `<p class="message-username">${message.username}</p><p class="message-text">${message.message}</p>`;

            chatList.appendChild(msgElement);

            break;
        case "user":
            console.log(`${message.username}`);
            break;
        case "msgList":
            message.collection.forEach((msg) => {
                //Create chat item
                var msgElement = document.createElement('li');
                msgElement.innerHTML = `<p class="message-username">${msg.username}</p><p class="message-text">${msg.message}</p>`;
                chatList.appendChild(msgElement);
            });
            break;
        case "userList":
            message.collection.forEach((user) => {
                const activeUser = document.createElement('li');
                activeUser.appendChild(document.createTextNode(user));
                clientList.appendChild(activeUser);
            });
            break;
    }
};

//Client leaves
// ws.onclose = () => {
//     console.log("Disconnected");
//     var dcObject = {type: "disconnect", username:username};
//     ws.send(JSON.stringify(dcObject));
// };

//When send is clicked
sendBtn.addEventListener('click', function (e) {
    //Get text from input field
    var messageObject = {type: "message", username: username, message: textInput.value};
    ws.send(JSON.stringify(messageObject));
});