const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { addMessage } = require('./contollers/messageControllers');


//dotenv in our server.js
dotenv.config();


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});
const port=5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes in server file
app.use('/api/messages', require('./routes/messageRoutes'));

//root rout
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the Message API',
        version: '1.0.0',
        endpoints: {
            getMessages: 'GET /api/messages',
            createMessage: 'POST /api/messages',
            deleteMessage: 'DELETE /api/messages',
            testClinet:'GET /index.html'
        }
    });
});

//scoket connection in backend
io.on('connection',(socket)=>{
    console.log('User socket id is :',socket.id);

    socket.on('message',(messageData)=>{
        const savedMessage = addMessage(messageData);
        io.emit('message', savedMessage);
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
   

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});