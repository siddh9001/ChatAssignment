const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "userref",
  },
  senderUserName: {
    type: String,
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "userref",
  },
  receiverUserName: {
    type: String,
    required: true,
  },
  chatname: {
    type: String,
    required: true,
  },
  messages: [
    {
      sentby: {
        type: Schema.Types.ObjectId,
        ref: "userref",
      },
      message: {
        type: String,
        default: "",
      },
      messagetype: {
        type: String,
        required: true,
      },
      timstamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Chat = mongoose.model("chatref", ChatSchema);
