const Message = require('../models/message.schema.js');

class MessageController {

    storeMessage = async (req, res) => {
        try {
            const { custId, custMsg } = req.body;
        
            const newMessages = custMsg.map((msg) => ({
                msgId: msg.msgId,
                message: msg.message,
                created_time: msg.created_time,
                from: {
                    senderName: msg.from.name,
                    senderEmail: msg.from.email,
                    senderId: msg.from.id,
                },
            }));
        
            const existingCustId = await Message.findOne({ custId });
        
            if(existingCustId){
                existingCustId.messages.push(...newMessages);
                await existingCustId.save();
            } 
            else{
                const firstTimeCust = new Message({
                    custId,
                    messages: newMessages,
                });
                await firstTimeCust.save();
            }
        
            return res.status(200).json({ 
                success: true, 
                message: "Messages stored successfully" 
            });

        } 
        catch(err){
            console.log(err);
            res.status(500).json({ 
                message: "Internal server error"
            });
        }
    };


    lastMessageTime = async(req, res) => {
        try {
            const { custId } = req.query;
        
            const latestMessage = await Message.findOne({ custId },{ "messages.created_time": 1 }).sort({ "messages.created_time": -1 });
        
            if(!latestMessage || !latestMessage.messages || latestMessage.messages.length === 0){
                return res.send({timestamp: "0"});
            }
            else{
                return res.send({timestamp: latestMessage.messages[0].created_time});
            }
        } 
        catch (error) {
            console.error("Error retrieving last stored message timestamp:", error);
            res.status(500).json({ 
                message: "Internal server error" 
            });
        }
    }

}

module.exports = MessageController;