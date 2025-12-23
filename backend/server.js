const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { addMessage } = require('./contollers/messageControllers');

//dotenv in our server.js
dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});
const port= process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve React frontend build instead of public folder
app.use(express.static('../frontend/build'));

//Routes in server file
app.use('/api/messages', require('./routes/messageRoutes'));

// Catch-all route to serve React app for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../frontend/build/index.html'));
});

//socket connection in backend
io.on('connection',(socket)=>{
    console.log('User socket id is :',socket.id);

    socket.emit('message',{
        user:"System",
        text:"welcome to the Chat Room !",
        timestamp:new Date().toISOString()
    });

    socket.on('message',(messageData)=>{
        const savedMessage = addMessage(messageData);
        io.emit('message', savedMessage);
    });

    socket.broadcast.emit('message',{
        user:"System",
        text:"A new user has joined the chat",
        timestamp:new Date().toISOString()
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('userTyping',data);
    });

    //disconnect function
    socket.on('disconnect',()=>{
        console.log('User disconnected ',socket.id);
        io.emit('message',{
            user:"System",
            text:"A user has left the chat",
            timestamp:new Date().toISOString()
        });
    });
});

//error handling 

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:'Route not found'
    });
});

app.use((err,req,res,next)=>{
     console.error(err.stack),
    res.status(500).json({
        success:false,
        message:'Server Error',
        error: err.message
    })
});
   

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});