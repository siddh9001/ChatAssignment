import React, { useState } from "react";
import ChatScreen from "./ChatScreen";
import HomeScreen from "./HomeScreen";
import { IconContext } from "react-icons";
import { AiFillHome, AiFillWechat } from "react-icons/ai";

const Home = () => {
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const [isChatScreen, setIsChatScreen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [userData, setUserData] = useState();

  const openHomeScreen = () => {
    setIsChatScreen(false);
    setIsHomeScreen(true);
  };

  const openChatScreen = () => {
    if (!isUserLoggedIn) {
      alert("Enter the username to login");
    } else {
      setIsHomeScreen(false);
      setIsChatScreen(true);
    }
  };

  const onLogout = () => {
    setIsUserLoggedIn(false);
    setUserData(null);
    setIsChatScreen(false);
    setIsHomeScreen(true);
  };

  // console.log("userdata inside Home:", userData);
  // console.log("is user logged in, inside home:", isUserLoggedIn);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-950">
      <div className="w-full h-full flex">
        {/* ============== Side Panel =============== */}
        <div className="w-[5rem] h-full bg-gray-800 rounded-xl flex flex-col items-center space-y-4 pt-4">
          <div
            className="h-14 w-14 bg-gray-900 border-1 border-gray-100 shadow-lg rounded-lg hover:bg-[#007a5a] transition-colors delay-100 cursor-pointer grid place-items-center"
            onClick={openHomeScreen}
          >
            <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
              <AiFillHome />
            </IconContext.Provider>
          </div>
          <div
            className="h-14 w-14 bg-gray-900 border-1 border-gray-100 shadow-lg rounded-lg hover:bg-[#007a5a] transition-colors delay-100 cursor-pointer grid place-items-center"
            onClick={openChatScreen}
          >
            <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
              <AiFillWechat />
            </IconContext.Provider>
          </div>
        </div>
        {/* ============ Main Chat Screen ============== */}
        <div className="flex-grow h-full">
          {isHomeScreen && (
            <HomeScreen
              userData={userData}
              setUserData={setUserData}
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              onLogout={onLogout}
              setIsChatScreen={setIsChatScreen}
              setIsHomeScreen={setIsHomeScreen}
            />
          )}
          {isChatScreen && (
            <ChatScreen
              isUserLoggedIn={isUserLoggedIn}
              userData={userData}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
