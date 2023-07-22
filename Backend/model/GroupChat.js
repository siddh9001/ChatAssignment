const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  members: {
    type: [String],
    default: [],
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

module.exports = GroupChat = mongoose.model("groupchatref", ChatSchema);
