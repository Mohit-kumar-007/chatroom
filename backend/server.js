const express = require('express');

const app=express();
const port=5000;

//root rout
app.get('/',(req,res)=>{
    res.send('Hello World!');
});

//test route
app.get('/test',(req,res)=>{
    res.json({
        message:'server is working',
        timestamp: new Date(),
        status:'suceess'
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});