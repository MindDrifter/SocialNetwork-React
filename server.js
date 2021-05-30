const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
//const router = express.Router()
const mogoose = require('mongoose')
const api = require('./src/routes/api')

app.use(express.static(__dirname + '/dist')); 
app.use('/api', api)
app.use(express.urlencoded({
  extended:true,
  limit:'50mb'
}))
app.use(express.json({
  limit:'50mb'
}))

startDB()

app.get('/', (req, res)=> { 
    res.sendFile(__dirname +'/dist/index.html');
  })

  var users = [];
  var i = 0
  io.on('connection', socket =>{

    console.log('Client connected.');
    
   // for (let [id, socket] of io.of("/").sockets) {
    users.push({
      trueID: null,
      userID: socket.id,
      username: socket.username,
    });

    //console.log(users);
    //io.emit('id', {ID: users})
    // socket.join('room1')
    // console.log(socket);
    // io.to('room1').emit('Response', {msg: 'Nice cock'})
    // }
    // socket.on('chatMessage', msg =>{
    //     console.log(msg.name);
    //     io.emit('Response', {msg: 'xui'})
    // })

    socket.on('changeID', msg =>{
      users.forEach((element, p) => {
        if(element.userID === socket.id){
          users[p].trueID = i
          i++
        }
      });
    })
    
     io.emit('getAllUsers', {users})
      //console.log(users);
    socket.on('private message', msg =>{
      console.log(msg);
    })



    socket.on('123', () => {
      console.log('123');
      users.forEach(element => {
        if(element.trueID === 0){
          console.log('yes');
          socket.in(element.userID).emit('123', {msg:' yep'})
        }
      });
    })

    // Disconnect listener
    socket.on('disconnect', ()=>{
        console.log('Client disconnected.');
        //console.log(socket.id);
        //users.splice(users.indexOf(socket.id), 1)
        //delete users[socket.id]
        //console.log(socket.id);
        users.forEach((item, key)=>{
          if(item.userID === socket.id){
            users.splice(key, 1)
            console.log(users);
          }
        })

        io.emit('getAllUsers', {users:users})
    });
});

async function startDB(){
  try {
    await mogoose.connect('mongodb+srv://m:1q2w3e4r@cluster0.n6onj.mongodb.net/BD', {
        useNewUrlParser: true,
        useFindAndModify:false,
        useUnifiedTopology: true 
    })
      console.log('connected to MongoDB');
  } catch (e) {
      console.log(e);
  }
}  

server.listen(80)