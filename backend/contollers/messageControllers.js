//mock database
let messages = [
    { 
        id: 1,
        text: "Hello, Welcome to our chat room!",
        user:"jhon",
        timestamp: new Date() 

    },
     { 
        id: 2,
        text: "Hello, Welcome to our chat room!",
        user:"harry",
        timestamp: new Date() 

    },
];

//get all messages
const getMessages = (req, res) => {
    try{
        res.json({
            success:true,
            count: messages.length,
            data: messages
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error: error.message
        })
    }
};



//post the message 
const createMessage = (req, res) => {
    try{
        const { text, user } = req.body;

        //validation
        if(!text || !user){
            return res.status(400).json({
                success:false,
                message:'Please provide text for the message'
            });
        }
        const newMessage = {
            id: messages.length + 1,
            text,
            user,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        res.status(201).json({
            success:true,
            message:'Message created successfully',
            data: newMessage
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error: error.message
        })


    }
};


//delete message
const deleteMessage=(req,res)=>{
    try{
        messages=[];
        res.json({
            success:true,
            message:'All messages deleted successfully'
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error: error.message
        })
    }
}

module.exports={getMessages,createMessage,deleteMessage};