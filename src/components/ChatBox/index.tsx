import React, { useEffect } from "react";
import SendMessageCmp from "../sendMessage";
import { useSelector } from "react-redux";
import { getSender } from "@/config/chatlogic";
import UpdateGroupModal from "../updateGroupModal";

const ChatBox = () => {
  const userData: any = localStorage.getItem("userData");

  const user = JSON.parse(userData);

  const { selectedChat,socketConnection } = useSelector((state: any) => state.chat);


useEffect(()=>{
  socketConnection?.on("messageRecieved",(message:any)=>{

if (!selectedChat || selectedChat._id !== message.chat._id) {
  return;
}else{
  console.log("realtime message",message)
}


  })
})

  return (
      <>
    {/* {selectedChat ? */}
    <div className="w-full h-screen p-3">

      <div className="h-[94vh]">
      {selectedChat ? (
        <>
          {selectedChat.isGroupChat && <UpdateGroupModal />}
        <h1>
          {!selectedChat.isGroupChat
            ? getSender(user, selectedChat.users)
            : selectedChat.chatName}
        </h1>
            </>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <h3 className="text-2xl font-medium capitalize">Select Chat to start messaging</h3>
        </div>
      )}
      </div>

<div className="flex items-end w-full">

      <SendMessageCmp />
</div>


    </div>
    {/* :
    <div className="select chat to continue"></div>
  } */}
    </>
  );
};

export default ChatBox;
