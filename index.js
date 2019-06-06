const app = require('express')();
const http = require('http').createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const messageRoute = require("./routes/messageRoute");
const channelRoute = require("./routes/channelRoute");
const usersRoute = require("./routes/userRoute");
const io = require('socket.io')(http);
const PORT = process.env.PORT || 4567;

app.use(morgan("combined"));
app.use(cors());
app.use(passport.initialize());
app.use("/messages", messageRoute);
app.use("/channels", channelRoute);
app.use("/users", usersRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4567, function(){
  console.log(`listening on *:${PORT}`);
});