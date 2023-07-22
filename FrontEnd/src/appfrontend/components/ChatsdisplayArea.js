import React, { useEffect } from "react";
import "./ChatdisplayArea.css";
import parser from "html-react-parser";
import io from "socket.io-client";
import { LoadChatMessages } from "../services/service";

const ChatsdisplayArea = ({ message, chatData, setChatData, userData }) => {
  const socket = io("http://localhost:5000");
  useEffect(() => {
    // console.log("socket useEffect");
    socket.connect();
    socket.on("chatMessageUpdated", async (chatid) => {
      await LoadChatMessages(chatid)
        .then((chatdata) => {
          // console.log("inside socket chatscreen: ", chatdata);
          setChatData(chatdata.messages);
        })
        .catch((err) => {
          // console.log("Err in Loadchatmessage: ", err.message);
        });
    });
    return () => {
      socket.disconnect();
    };
  });

  return (
    <div className="h-96 overflow-y-scroll scroll-smooth .hide-scrollbar">
      {chatData?.map((msgObj, index) => (
        <div
          key={index}
          className={
            index === 0
              ? "w-full grid p-4 rounded-xl"
              : "w-full grid p-4 pt-0 rounded-xl"
          }
        >
          {msgObj.sentby === userData._id ? (
            <div className="max-w-md justify-self-end items-center text-white bg-[#007a5a] p-4 rounded-xl rounded-br-none ProseMirror">
              {parser(msgObj.message)}
            </div>
          ) : (
            <div className="max-w-md justify-self-start items-center text-white  bg-gray-800 p-4 rounded-xl rounded-bl-none ProseMirror">
              {parser(msgObj.message)}
            </div>
          )}
        </div>
      ))}
      {/* <div className="w-full grid p-4 rounded-xl">
        {message !== undefined ? (
          <div className="max-w-md justify-self-end items-center text-white bg-[#007a5a] p-4 rounded-xl rounded-br-none ProseMirror">
            {message?.type === "text" ? (
              parser(message?.html)
            ) : (
              <img
                src={URL.createObjectURL(message?.file)}
                alt="Uploaded File"
              />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div> */}
    </div>
  );
};

export default ChatsdisplayArea;
