console.log('Server Start!');
console.log('-- AppChat v 1.0');

// App
const path = require('path')
const express = require('express'); 
const app = express(); // Servidor
const SocketIO = require('socket.io');
const { log } = require('console');

// Settings
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(path.join(__dirname, 'public'))); 
console.log('-- AppRoute: ' + path.join(__dirname, 'public'));

// Start Server
const server = app.listen(app.get('port'), () => {
    console.log('-- Server on port', app.get('port'));
});

// SoketIO Settings
const io = SocketIO(server);

// Websockets
io.on('connection', (socket) => {
    console.log('New Connection: ', socket.id);

    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('server:message', data);
    })
})