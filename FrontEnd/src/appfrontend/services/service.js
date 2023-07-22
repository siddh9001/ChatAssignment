import axios from "axios";

const URL = "http://localhost:5000/api/auth";

export async function Login(inpUsername) {
  return axios
    .post(`${URL}/register`, { username: inpUsername })
    .then((userdata) => {
      console.log("userdata inside function :", userdata);
      return userdata.data;
    })
    .catch((err) => {
      console.log("Err in axios post register", err.message);
    });
}

export async function Getallchats(userid) {
  return axios
    .get(`${URL}/allmychats/${userid}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log("axios err in getting chats", err.message);
    });
}

export async function CreateNewchat(newchatinfo) {
  return axios
    .post(`${URL}/createnewchat`, newchatinfo)
    .then((newchatdata) => {
      return newchatdata.data;
    })
    .catch((err) => {
      console.log("err creating new chat", err.message);
    });
}

export async function LoadChatMessages(chatid) {
  return axios
    .get(`${URL}/loadmessages/${chatid}`)
    .then((result) => {
      console.log("axios result in loadchat:", result.data);
      return result.data;
    })
    .catch((err) => {
      console.log("err in loading messages: ", err.message);
    });
}

export async function AddNewMessage(newmsgdata) {
  return axios
    .put(`${URL}/addmessage`, newmsgdata)
    .then(async (result) => {
      console.log(result);
      return LoadChatMessages(newmsgdata.chatId)
        .then((result) => {
          return result.messages;
        })
        .catch((err) => {
          console.log("reloading messages:", err.message);
        });
    })
    .catch((err) => {
      console.log("eer in adding message", err.messsage);
    });
}
