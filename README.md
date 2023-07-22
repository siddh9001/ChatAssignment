# Get Started with the project

clone the repository in local folder.
open seprate windows for both frontend and backend.

install all dependencies

```bash
    npm install
```

## FrontEnd setup and project run

use `npm install` to install all dependencies

there is one extension named `@tiptap-pro/extension-emoji` for that you have to create account in tiptap and follow pro-extension setup in tiptap follow link ( https://tiptap.dev/extensions?pro=true)

use `npm start` to start project

## Backend Setup and run

there is need to setup mongoDB database,
follow link
https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/

save the password received during database setup and follow below steps

1. go inside Backend folder and create new folder named as setup and then crea a file named `DBurl.js` and enter the following code inside it

```bash
module.exports = {
  URL: "mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority",
};
```

you can get the url by following the link
https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/

2. use `nodemon` commad in terminal to start the server (it automatically restarts the server whenever changes are made inside project)

## Project Usage

1. after project starts got to `http://localhost:3000/ to see the UI

2. backend server will by default on `http://localhost:5000/

3. in Home Page enter the username to enter the chat section without entering that you won't be able to enter the chat section


   <img width="682" alt="userloginwithoutusername" src="https://github.com/siddh9001/ChatAssignment/assets/86849427/42f560ca-10c6-4fd2-9195-ed149a775633">


4. If a user already exists in db then you will directly enter the chat section otherwise code will create a newuser and make you enter inside code section

5. Inside chatascreen you click in create new chat , a form will open, enter the chat name and then you have explicity add on another use
rId inside the code of `ChatScreen.js`

<img width="682" alt="newchatcreation" src="https://github.com/siddh9001/ChatAssignment/assets/86849427/ed147bd3-74a6-408b-9344-59ad7f175097">

update `senderId` and `senderUserName` in the below code with mongoDB's user \_id field

```bash
const [newchatinfo, setNewchatinfo] = useState({
    senderId: "",
    senderUserName, "",
    receiverId: userData._id,
    chatname: "",
  });
```

6. now click on `Create New Chat` button

7. Click on chats appearing on left side below `Create new Group` button to load the messages

8. enter the message in any format to see the messages displaying in receiver side

9. for the sender side open another terminal and use `npm start` to run project

10. Enter the username of sender , for now it should the same username that is added in the code above.

11. view the chats of sender and receiver and perform one to one chat.

<img width="687" alt="user6chatscreen" src="https://github.com/siddh9001/ChatAssignment/assets/86849427/dc2bfec9-22f9-4af6-b741-1505704a35c1">

<img width="686" alt="user7chatscreen" src="https://github.com/siddh9001/ChatAssignment/assets/86849427/0ffc4c36-9a3c-44f4-8b76-c77bd8f3019b">
