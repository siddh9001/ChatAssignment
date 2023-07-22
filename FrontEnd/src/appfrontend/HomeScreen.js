import React, { useState } from "react";
import { Login } from "./services/service";

const HomeScreen = ({
  isUserLoggedIn,
  userData,
  setUserData,
  setIsUserLoggedIn,
  onLogout,
  setIsHomeScreen,
  setIsChatScreen,
}) => {
  const [inpUsername, setInpUsername] = useState(null);

  const onChangeUsername = (event) => {
    // console.log(event.target.value);
    setInpUsername(event.target.value);
  };

  const onLoggingIn = () => {
    Login(inpUsername)
      .then((userdata) => {
        setUserData(userdata);
        setInpUsername(null);
        setIsUserLoggedIn(true);
        setIsHomeScreen(false);
        setIsChatScreen(true);
      })
      .catch((err) => {
        // console.log("Error in Login function", err.message);
      });
  };

  return (
    <div className="w-full h-28 flex items-center p-4 rounded-xl">
      <p className="flex-grow text-white text-2xl font-bold">
        Welcome to Sharding Chat
      </p>
      {isUserLoggedIn ? (
        <div className="h-full flex items-center space-x-4 p-4">
          <p className="text-gray-100 font-medium text-xl">
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
      ) : (
        <div className="h-full flex items-center space-x-4 p-4">
          <input
            className="h-14 flex-grow bg-inherit rounded-xl p-4 text-gray-100 border-2 border-gray-200 overflow-hidden"
            type="text"
            placeholder="Username"
            onChange={onChangeUsername}
          />
          <button
            className="h-14 p-2 px-6 bg-[#007a5993] hover:bg-[#007a59] text-gray-100 rounded-xl"
            onClick={onLoggingIn}
          >
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
