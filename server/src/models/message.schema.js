const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    custId: {
        type: String,
        required: true,
    },
    messages: [{
        msgId: String,
        message: String,
        from: {
            senderId: String,
            senderName: String,
            senderEmail: String,
        },
    }],
},{ timestamps: true});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
