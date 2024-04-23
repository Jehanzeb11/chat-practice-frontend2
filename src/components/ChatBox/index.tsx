import React from "react";
import SendMessageCmp from "../sendMessage";
import { useSelector } from "react-redux";
import { getSender } from "@/config/chatlogic";
import UpdateGroupModal from "../updateGroupModal";

const ChatBox = () => {
  const userData: any = localStorage.getItem("userData");

  const user = JSON.parse(userData);

  const { selectedChat } = useSelector((state: any) => state.chat);

  console.log("selectedChat === ", selectedChat?._id);

  return (
    <div className="w-full h-screen">

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
        <div>
          <p>Select Chat to start messaging</p>
        </div>
      )}

      <SendMessageCmp />
    </div>
  );
};

export default ChatBox;
