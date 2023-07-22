const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mychats: {
    type: [String],
    default: [],
  },
  mygroupchats: {
    type: [String],
    default: [],
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("userref", UserSchema);
