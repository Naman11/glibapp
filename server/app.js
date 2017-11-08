var express =require("express");
var http = require('http');
var socketio = require('socket.io');
var peer=require('peer');
var bodyParser = require('body-parser');
var cors = require('cors');
var socketEvents = require('./utils/socket');
var routes = require('./utils/routes');
var config = require('./utils/config');
var register = require('./routes/registerUser');
var userSessionCheck = require('./routes/userSessionCheck');
var userNameCheck = require('./routes/userNameCheck');
var login = require('./routes/login');
var generalChats = require('./routes/generalChat');
var scraping = require('./routes/scraping');
var messages = require('./routes/messages');
var verification=require('./routes/otp/verification');
var forget = require('./routes/forgotPassword');
var getUserInfo = require('./routes/getUserInfo');
var updateUserData = require('./routes/updateUserData');
var fileTransfer = require('./routes/fileTransfer');
var users = require('./routes/users');
var path = require('path')

let app=express();
let server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use('/registerUser', register);
app.use('/userSessionCheck', userSessionCheck);
app.use('/usernameCheck', userNameCheck);
app.use('/login', login);
app.use('/generalChats', generalChats);
app.use('/getMessages', messages);
app.use('/users', users);
app.use('/otpVerify',verification);
app.use('/unfurl',scraping);
app.use('/forgotPass',forget);
app.use('/getUserInfo',getUserInfo);
app.use('/updateUserData',updateUserData);
app.use('/fileTransfer',fileTransfer);
app.use('/profile_picture', express.static(path.join(__dirname, 'uploads/profilePicture')))
app.use('/file', express.static(path.join(__dirname, 'uploads/files')))
app.use('/peerjs',peer.ExpressPeerServer(server,{debug:true}));

server.listen(4000);
server.on('connection', function(id){
	console.log("peer connection connected");
})
server.on('disconnect', function(id){
	console.log("peer connection disconnected");
})
socket = socketio(server);
new socketEvents(socket).socketConfig();

module.exports=server;