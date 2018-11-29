const app = require('express')();
const io = require('socket.io')();
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const ac = require('./controllers/authController');
const sp = require('./controllers/spController');
const mc = require('./controllers/socket/mpController');
require('dotenv').config();

const { CONNECTION_STRING: cs, SOCKET_PORT: socketPort, EXPRESS_PORT: expressPort, SESSION_SECRET: ss } = process.env;

massive(cs).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: ss,
    cookie: {
        maxAge: 99999999
    }
}));

/*
    Auth endpoints
*/

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.get('/auth/current_user', ac.currentUser);
app.get('/auth/logout', ac.logout);

/*
    SP game endpoints
*/

app.post('/sp/add_score', sp.addScore);
app.get('/sp/get_scores/:username', sp.getScores);
app.get('/sp/get_scores', sp.getScores);
app.get('/sp/leaderboard', sp.getLeaderboard);


/*
    Express Listen
*/

app.listen(expressPort, () => console.log(expressPort));

/*
    Socket stuff
*/

let roomCount = 0;

io.on('connection', client => {
    console.log('client connected: ' + client.id);
    let myRoom;
    let roomSize;
    client.on('playMp', (username) => {
        client.username = username;
        myRoom = 't' + roomCount;
        client.join(myRoom);
        io.to(myRoom).clients((err, clients) => {
            if (clients.length == 2) {
                let userList = clients.map(client => io.sockets.connected[client].username);
                roomCount++;
                io.in(myRoom).emit('startGame', userList);
                // if (userList[0] !== userList[1])
                //     io.in(myRoom).emit('startGame', userList);
                // else
                //     io.in(myRoom).emit('playAgainstSelf');
            }
        });
        client.emit('roomNum', 'You are in room ' + myRoom);    
    });

    client.on('sendBoard', (board) => {
        client.to(myRoom).emit('relayBoard', board);
    });

    client.on('iLost', () => {
        client.to(myRoom).emit('youWin');
    })

    client.on('disconnect', () => {
        io.to(myRoom).emit('userDisconnected')
        console.log('client disconnected: ' + client.id);
    });
});


io.listen(socketPort);