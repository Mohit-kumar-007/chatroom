const express = require('express');
const cors = require('cors');
const app=express();

const dotenv=require('dotenv');
const port=5000;

//dotenv in our server.js
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        }
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
   

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});