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

  const { selectedChat,socketConnection,newMessages } = useSelector((state: any) => state.chat);

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

console.log("messages == >>>  ",newMessages)

  return (
      <>
    <div className="w-full h-screen ">
    {selectedChat ?
          <div className="h-[100vh] overflow-y-scroll scrollbar-hidden relative top-0 flex flex-col">

<>
      
      {selectedChat ? (

<div className="flex gap-4 justify-between items-center shadow p-2 sticky top-0 z-50 bg-white">


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

<div className="px-1.5 pt-1 pb-5">


<div className="w-1/2 my-1.5">
  <div className="flex flex-col w-fit">
<div className="flex gap-1 items-end">

<Image src={'https://github.com/shadcn.png'} alt={'pfp'} width={30} height={30} className='rounded-full' />

<div className="w-fit h-auto bg-slate-200 rounded-xl rounded-bl-none p-2.5">
<p className="text-sm text-black/80 font-medium">perspiciatis, architecto quidem provident autem rem iusto? Quia, perspiciatis, architecto quidem provident autem rem iusto? Quia, </p>
</div>
</div>
<p className="text-text-black-/80 text-right pt-1 text-xs mt-0.5">10:00 PM</p>

</div>

</div>



{
  newMessages?.map((msg:string,ind:number)=>(
<div className="flex justify-end w-full" key={ind}>


<div className="w-2/3 my-1.5" >
<div className="flex gap-1 items-end justify-end">

<div className="max-w-full h-auto bg-blue-300 rounded-xl rounded-br-none p-2.5">
<p className="text-sm text-gray-700 font-medium">{msg}</p>
</div>

{/* <Image src={'https://github.com/shadcn.png'} alt={'pfp'} width={30} height={30} className='rounded-full' /> */}
</div>
<p className="text-text-black-/80 text-right pt-1 text-xs mt-0.5">10:30 PM</p>
</div>

</div>
))
}

</div>




<SideCollapse open={open} setOpen={setOpen} />

        </>
<div className="flex items-end w-full px-2 sticky bottom-1 mt-auto left-0 z-50">
      <SendMessageCmp />
</div>
        </div>

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
