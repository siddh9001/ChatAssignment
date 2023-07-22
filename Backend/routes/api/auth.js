const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const Chat = require("../../model/Chat");
const GroupChat = require("../../model/GroupChat");
const socketIO = require("socket.io");
const httpServer = require("../../index");

const io = socketIO(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected.");

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

router.get("/", (req, res) => {
  return res.json({
    test: "auth sucessful",
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);

  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        const newUser = new User({
          username: req.body.username,
          mychats: [],
        });
        newUser
          .save()
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((err) => {
            console.log("Error in saving user:", err.message);
          });
      }
    })
    .catch((err) => {
      console.log("Erorr in finding user: ", err.message);
    });
});

router.get("/allmychats/:userid", (req, res) => {
  //   console.log(req);
  let mychats = [];
  User.findById(req.params.userid)
    .then((user) => {
      Chat.find({
        _id: { $in: user.mychats },
      })
        .then((result) => {
          // result.forEach((item) =>
          //   mychats.push({
          //     chatId: item._id,
          //     chatname: item.chatname,
          //   })
          // );
          res.json({ allmychats: result });
        })
        .catch((err) => {
          console.log("cannot find chats", err.message);
        });
      //   res.json({ allmychats: user.mychats });
    })
    .catch((err) => {
      console.log("Err in finding the user:", err.message);
    });
});

router.get("/loadmessages/:chatid", (req, res) => {
  Chat.findById(req.params.chatid)
    .then((chat) => {
      // console.log(chat.messages);
      res.json({ messages: chat.messages });
    })
    .catch((err) => {
      console.log("Err in finding chat:", err.message);
    });
});

router.post("/createnewchat", (req, res) => {
  Chat.findOneAndUpdate(
    {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    },
    {
      senderUserName: req.body.senderUserName,
      receiverUserName: req.body.receiverUserName,
      chatname: req.body.chatname,
    },
    { upsert: true, new: true }
  )
    .then((chatdata) => {
      console.log(chatdata);
      User.findById(req.body.senderId)
        .then((user) => {
          user.mychats.push(chatdata._id);
          user
            .save()
            .then((result) => {
              console.log(result);
              //   res.json({ text: "updated mychats in user 2" });
            })
            .catch((err) => {
              console.log("err in updating mychats", err.message);
            });
        })
        .catch((err) => {
          console.log("errr in updating mychats", err.message);
        });
      User.findById(req.body.receiverId)
        .then((user) => {
          user.mychats.push(chatdata._id);
          user
            .save()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log("err in updating mychats", err.message);
            });
        })
        .catch((err) => {
          console.log("errr in updating mychats", err.message);
        });
      res.json(chatdata);
    })
    .catch((err) => {
      console.log("Err in creating new chat ", err.message);
      res.status(500).json({ text: "cannot create chat" });
    });
});

router.get("/loadgroupmessages/:chatid", (req, res) => {
  GroupChat.findById(req.params.chatid)
    .then((groupchat) => {
      // console.log(chat.messages);
      res.json({ messages: groupchat.messages });
    })
    .catch((err) => {
      console.log("Err in finding groupchat:", err.message);
    });
});

router.post("/createnewgroupchat", (req, res) => {
  const groupmembers = req.body.members;
  GroupChat.findOneAndUpdate(
    { members: groupmembers },
    { chatname: req.body.chatname },
    { upsert: true, new: true }
  )
    .then((groupchat) => {
      const bulkUpdateOperations = groupmembers.map((id) => ({
        updateOne: {
          filter: { _id: id },
          update: { $addToSet: { mygroupchats: groupchat._id } },
        },
      }));

      User.bulkWrite(bulkUpdateOperations)
        .then((result) => {
          console.log(result);
          res.json({ text: "all updated sucessfully" });
        })
        .catch((err) => {
          console.log("Err in bulkwrite:", err.message);
        });
    })
    .catch((err) => {
      console.log("Err in creating or updating new chat:", err.message);
    });
});

router.get("/allmygroupchats/:userid", (req, res) => {
  //   console.log(req);
  let mygroupchats = [];
  User.findById(req.params.userid)
    .then((user) => {
      GroupChat.find({
        _id: { $in: user.mygroupchats },
      })
        .then((result) => {
          result.forEach((item) =>
            mygroupchats.push({
              chatId: item._id,
              chatname: item.chatname,
            })
          );
          res.json({ allmygroupchats: mygroupchats });
        })
        .catch((err) => {
          console.log("cannot find group chats", err.message);
        });
      //   res.json({ allmychats: user.mychats });
    })
    .catch((err) => {
      console.log("Err in finding the user:", err.message);
    });
});

router.put("/addmessage", (req, res) => {
  Chat.findById(req.body.chatId)
    .then((chat) => {
      chat.messages.push({
        sentby: req.body.sentby,
        message: req.body.message,
        messagetype: req.body.messagetype,
      });
      chat
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({ text: "chat message added" });
          io.emit("chatMessageUpdated", result._id);
        })
        .catch((err) => {
          console.log("error adding chat message :", err.message);
        });
    })
    .catch((err) => {
      console.log("Cannot add message to chat", err.message);
      res.status(500).json({ text: "cannot add message" });
    });
});

router.post("/addgroupmessage", (req, res) => {
  GroupChat.findById(req.body.groupchatId)
    .then((groupchat) => {
      groupchat.messages.push({
        sentby: req.body.sentby,
        message: req.body.message,
      });
      groupchat
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({ text: "group chat message added" });
        })
        .catch((err) => {
          console.log("error adding group chat message :", err.message);
        });
    })
    .catch((err) => {
      console.log("Cannot add message to group chat", err.message);
      res.status(500).json({ text: "cannot add message" });
    });
});

module.exports = router;
