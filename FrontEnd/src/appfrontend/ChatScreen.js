import React, { useEffect, useState } from "react";
import ChattingInputArea from "./components/ChattingInputArea";
import { IconContext } from "react-icons";
import ChatsdisplayArea from "./components/ChatsdisplayArea";
import { FaPlus, FaUsers } from "react-icons/fa";
import { Getallchats, LoadChatMessages } from "./services/service";
import { CreateNewchat } from "./services/service";

const ChatScreen = ({ userData, isUserLoggedIn, onLogout }) => {
  const [message, setMessage] = useState();
  const [myChats, setMychats] = useState();
  // const [mygroupchats, setMygroupchats] = useState();
  const [chatIdSelected, setChatIdSelected] = useState();
  const [chatData, setChatData] = useState();
  const [newchatinfo, setNewchatinfo] = useState({
    senderId: "64bbab67a496d791ced27965",
    senderUserName: "user8",
    receiverId: userData._id,
    receiverUserName: userData.username,
    chatname: "",
  });
  const [isnewchatclicked, setIsnewchatclicked] = useState(false);
  const [peopleInchat, setPeopleInchat] = useState();

  useEffect(() => {
    (async function fetchchats() {
      await Getallchats(userData._id)
        .then((allchats) => {
          console.log("allchats:", allchats.allmychats);
          setMychats(allchats.allmychats);
        })
        .catch((err) => {
          console.log("err in fetchchats: ", err.message);
        });
    })();
  }, [userData._id]);

  const onChatClick = async (chatdata) => {
    setChatIdSelected(chatdata._id);
    setPeopleInchat(
      chatdata.receiverId === userData._id
        ? chatdata.senderUserName
        : chatdata.receiverUserName
    );
    await LoadChatMessages(chatdata._id)
      .then((chatdata) => {
        console.log("chatscreen: ", chatdata);
        setChatData(chatdata.messages);
      })
      .catch((err) => {
        console.log("Err in Loadchatmessage: ", err.message);
      });
  };

  const onClickNewChatCreate = async () => {
    await CreateNewchat(newchatinfo)
      .then(async (result) => {
        console.log("new chat information: ", result);
        await Getallchats(userData._id)
          .then((updatedchats) => {
            setMychats(updatedchats.allmychats);
          })
          .catch((err) => {
            console.log("Err in getting updated chats:", err.message);
          });
        setIsnewchatclicked(false);
      })
      .catch((err) => {
        console.log("err in new chat information: ", err.messsage);
      });
  };

  const onChatnameChange = (event) => {
    setNewchatinfo({ ...newchatinfo, chatname: event.target.value });
  };

  return (
    <div className="flex h-full">
      {/* =========== chat screen side panel - for user chats and and add chat option ========== */}
      <div className="w-48 h-full border-2 border-white rounded-xl flex flex-col space-y-4 p-1 pt-4">
        <div
          onClick={() => setIsnewchatclicked(!isnewchatclicked)}
          className="flex items-center space-x-4 p-3 border-2 border-gray-100 rounded-xl opacity-70 hover:opacity-100 cursor-pointer"
        >
          <IconContext.Provider value={{ color: "#007a59" }}>
            <FaPlus />
          </IconContext.Provider>
          <p className="text-gray-300 text-sm font-bold">New Chat</p>
        </div>
        <div
          className={
            isnewchatclicked
              ? "flex flex-col space-y-3 p-3 border-[2px] border-gray-100 rounded-xl"
              : "hidden"
          }
        >
          <input
            className="w-full h-8 p-4 text-gray-100 bg-inherit border-[1px] border-slate-300 rounded-md"
            placeholder="Chatname"
            onChange={onChatnameChange}
          />
          <input
            className="w-full h-8 p-4 text-gray-100 bg-inherit border-[1px] border-slate-300 rounded-md"
            placeholder="username"
          />
          <button
            onClick={onClickNewChatCreate}
            className="w-full h-8 text-gray-100 bg-[#007a5993] hover:bg-[#007a59] rounded-md"
          >
            Create New Chat
          </button>
        </div>
        <div className="flex items-center space-x-4 p-3 border-2 border-gray-100 rounded-xl opacity-70 hover:opacity-100 cursor-pointer">
          <IconContext.Provider value={{ color: "#007a59" }}>
            <FaUsers />
          </IconContext.Provider>
          <p className="text-gray-300 text-sm font-bold">New Group Chat</p>
        </div>
        {myChats?.map((chatdata, index) => (
          <button
            key={index}
            type="submit"
            onClick={() => onChatClick(chatdata)}
            className="p-2 bg-gray-700 text-white rounded-xl overflow-clip"
          >
            {chatdata.chatname}
          </button>
        ))}
      </div>
      {/* ======== chat screen main panel for chat info, chatting area , input and people in chats */}
      <div className="flex-grow h-full border-2 border-gray-200 rounded-xl flex flex-col">
        {/* ========= chat info bar ========= */}
        <div className="h-[5rem] w-full p-4 border-2 border-gray-200 rounded-xl flex flex-row-reverse">
          {isUserLoggedIn && (
            <div className="flex items-center space-x-4">
              <p className="text-gray-100 font-medium text-xl tracking-wide">
                {userData?.username}
              </p>
              <button
                type="submit"
                className="h-14 p-2 px-6 bg-[#007a5993] hover:bg-[#007a59] text-gray-100 rounded-xl"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="flex-grow w-full border-2 border-gray-200 rounded-xl flex flex-row-reverse">
          {/* ========= people in chat ====== */}
          <div className="w-44 border-2 border-gray-200 rounded-xl h-full flex flex-col space-y-4 ">
            <p className="text-gray-300 border-b-[1px] border-gray-400 p-2  pl-4 pb-2">
              People in chat
            </p>
            <p
              className={
                peopleInchat
                  ? "w-[90%] text-gray-100 p-2 px-4 font-bold tracking-wide border-[0.5px] shadow-md rounded-xl self-center"
                  : "hidden"
              }
            >
              {peopleInchat}
            </p>
          </div>
          <div className="flex-grow h-full flex flex-col-reverse">
            {/* ============= input area ============== */}
            <div className="w-full h-40 p-2">
              <IconContext.Provider value={{ color: "white" }}>
                <ChattingInputArea
                  message={message}
                  setMessage={setMessage}
                  userData={userData}
                  chatIdSelected={chatIdSelected}
                  setChatData={setChatData}
                />
              </IconContext.Provider>
            </div>
            {/* =========== chats display area =========== */}
            <div className="flex-grow w-full">
              <ChatsdisplayArea
                message={message}
                chatData={chatData}
                setChatData={setChatData}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
