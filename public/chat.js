const socket = io();

window.addEventListener('load', function() {
    console.log('AppChat v 1.0');
    addEvents();
})

function addEvents () {
    // DOM elements
    let btn = document.getElementById('send');
    let inputMessage = document.getElementById('message');
    
    // Events
    btn.addEventListener('click', sendMessage);
    socket.on('server:message', function (data) {
        printMessage(data);
    });

    inputMessage.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            sendMessage()
        }
    })
}

function sendMessage() {
    // DOM elements
    let message = document.getElementById('message');
    let user = document.getElementById('username');

    // Mandamos el mensage al Servidor
    socket.emit('chat:message', {
        username: user.value,
        msg: message.value
    });

    message.value = '';
}

function printMessage(data) {
    //DOM  elements
    let output = document.getElementById('output');
    output.innerHTML += '<div class="messageUser"><strong>' + data.username + ':</strong>' + '<p class="messageOutput"> - ' + data.msg + '</p></div>'
    
    scrollHandler();
}

function scrollHandler() {
    let outputContainer = document.getElementById('output');

    outputContainer.scrollTop = outputContainer.scrollHeight;
}