const express = require("express");
const cors = require("cors");
let bodyParser = require("body-parser");
const usersRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const channelRoute = require("./routes/channelRoute");
const morgan = require("morgan");
const passport = require("passport");
const PORT = process.env.PORT || 4567;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use("/messages", messageRoute);
app.use("/channels", channelRoute);
app.use("/users", usersRoute);
http.listen(4567, function(){
  console.log(`listening on *:${PORT}`);
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