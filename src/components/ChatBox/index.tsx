"use client"
import React, { useEffect, useState } from "react";
import SendMessageCmp from "../sendMessage";
import { useSelector } from "react-redux";
import { getSender } from "@/config/chatlogic";
import UpdateGroupModal from "../updateGroupModal";
import { IoCallOutline , IoVideocamOutline} from "react-icons/io5";
import { FaEllipsis } from "react-icons/fa6";
import SideCollapse from "../sideCollapse";
import Image from "next/image";

const ChatBox = () => {
  const userData: any = localStorage.getItem("userData");

  const user = JSON.parse(userData);

  const { selectedChat,socketConnection } = useSelector((state: any) => state.chat);

  const [open,setOpen] = useState<any>(false)

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
    <div className="w-full h-screen ">
    {selectedChat ?
<>
      
      {selectedChat ? (

<div className="flex gap-4 justify-between items-center shadow p-2">


        <div className="flex gap-2">

<img src='https://github.com/shadcn.png' className='rounded-full w-12 h-12'/>

          <div >

        <h1 className="capitalize font-medium text-base">
          {!selectedChat.isGroupChat
            ? getSender(user, selectedChat.users)
            : selectedChat.chatName}
        </h1>
<div className="flex items-center">

<p className="text-xs">Active Now </p>

<div className="ml-1.5 w-1.5 h-1.5 bg-green-500 rounded-full"></div>

</div>
            </div>

            {selectedChat.isGroupChat && <UpdateGroupModal />}



            </div>

<div className="flex gap-3 items-center px-4">
  
  <button>
  <IoCallOutline size={25}/>
  </button>

  <button>
  <IoVideocamOutline size={25}/>
  </button>

  <button onClick={()=>setOpen(true)}>
  <FaEllipsis size={25}/>
  </button>

</div>


</div>


      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <h3 className="text-2xl font-medium capitalize">Select Chat to start messaging</h3>
        </div>
      )}
      <div className="h-[88vh] overflow-y-scroll scrollbar-hidden pt-4 px-2">



<div className="w-1/2 my-1.5">
  <div className="flex flex-col w-fit">
<div className="flex gap-1 items-end">

<Image src={'https://github.com/shadcn.png'} alt={'pfp'} width={30} height={30} className='rounded-full' />

<div className="w-fit h-auto bg-slate-200 rounded-xl rounded-bl-none p-2.5">
<p className="text-sm text-black/80 font-medium">perspiciatis, architecto quidem provident autem rem iusto? Quia, </p>
</div>
</div>
<p className="text-text-black-/80 text-right pt-1 text-xs mt-0.5">10:00 PM</p>

</div>

</div>


<div className="flex justify-end">

<div className="w-1/2 my-1.5">
<div className="flex gap-1 items-end justify-end">

<div className="w-fit h-auto bg-blue-300 rounded-xl rounded-br-none p-2.5">
<p className="text-sm text-gray-700 font-medium"> architecto quidem provident autem rem iusto? Quia, </p>
</div>

{/* <Image src={'https://github.com/shadcn.png'} alt={'pfp'} width={30} height={30} className='rounded-full' /> */}
</div>
<p className="text-text-black-/80 text-right pt-1 text-xs mt-0.5">10:30 PM</p>
</div>




</div>



      </div>


<div className="flex items-end w-full px-2">
      <SendMessageCmp />
</div>

<SideCollapse open={open} setOpen={setOpen} />

        </>

:
<div className="flex justify-center items-center h-full w-full">
<h3 className="text-2xl font-medium capitalize">Select Chat to start messaging</h3>
</div>
  }
  </div>


    </>
  );
};

export default ChatBox;
