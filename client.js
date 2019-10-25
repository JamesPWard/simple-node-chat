const textInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('btn-send');
const ws = new WebSocket('ws://localhost:1017');

//Websocket connected
ws.onopen = () => {
    console.log('Connection to websocket open...');
};

//Update chat
ws.onmessage = (e) => {
    console.log(`${e.data}`);
};

//Client leaves
ws.onclose = () => {
    console.log("Disconnected");
};

//When send is clicked
sendBtn.addEventListener('click', function(e){

    //Get text from input field
    var msg = textInput.value;
    ws.send(msg);

});