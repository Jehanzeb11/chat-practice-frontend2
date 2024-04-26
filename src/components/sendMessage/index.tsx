"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import io from 'socket.io-client';
import { selectChat } from '@/redux/chatSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseURl } from '@/config/api';
import { TiLocationArrow } from "react-icons/ti";
import { MdAddCircle } from "react-icons/md";
import { FaCamera,FaFile } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SendMessageCmp = () => {

  const {selectedChat,socketConnection} = useSelector((state:any)=>state.chat)

const user:any = localStorage.getItem("userData")
const token:any = localStorage.getItem("token")

const userData = JSON.parse(user)

const [message,setMessage] = useState('')
const [position, setPosition] = useState("bottom")


console.log(user)


const handleSubmit = async (e:FormEvent)=>{
e.preventDefault()

try {
  const {data}  = await axios.post(`${baseURl}/sendmessage`,{
content:message,
chatId:selectedChat._id
  },{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  socketConnection.emit("newMessage",data)

console.log(data)

} catch (error) {
  console.log(error)
}


}

// const messageChange = (e:any) =>{

//   if (e.target.value.startsWith("https://") || e.target.value.startsWith("http://")) {
    
//   }
  
//   setMessage(e.target.value)
// }

  return (
    <div className='w-full'>
      <form className='w-full flex h-full gap-2 justify-center items-center' onSubmit={handleSubmit}>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button><MdAddCircle size={30} /></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-10">
        {/* <DropdownMenuLabel></DropdownMenuLabel> */}
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Image" className='text-base'> <label htmlFor="camera" className='flex'> Media <span className='ml-3'> <FaCamera size={20} color="green"/></span></label> <input type="file" id='camera' name="camera" className='hidden'/></DropdownMenuRadioItem>
        <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="file" className='text-base'>Files  <span className='ml-3'> <FaFile size={20} color="#9042f5"/></span></DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

<Input placeholder='Message' className={`w-full rounded-full ${message?.startsWith("https://") || message?.startsWith("http://") || message?.endsWith(".com") ? "text-blue-500 underline" : ""}`}value={message} onChange={(e)=>setMessage(e.target.value)}/>

<Button type='submit' className='rounded-full' disabled={message ? false : true} ><TiLocationArrow color='#f5f5f5' size={25}/></Button>

      </form>
    </div>
  )
}

export default SendMessageCmp
