"use client"
import { baseURl } from '@/config/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '../ui/button'
import { getSender } from '@/config/chatlogic'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat, setChats, setConnectSocket, setFetchChatsAgain } from '@/redux/chatSlice'
import { io } from 'socket.io-client'

const MyChats = () => {

    const {chats,fetChatsAgain,selectedChat,socketConnection} = useSelector((state:any)=>state.chat)
    
const dispatch = useDispatch()

    const token = localStorage.getItem("token")
    const userData:any = localStorage.getItem("userData")

    let socket:any = io('http://localhost:5050') ;

    const user = JSON.parse(userData)

    useEffect(()=>{
          socket.emit('setup', { recipientId:user?.userId});
          dispatch(setConnectSocket(socket))
      },[])

      useEffect(()=>{
        socket.emit('setup', { recipientId:user?.userId});
    },[])

    const getChats = async ()=>{
        try {
            const res = await axios.get(`${baseURl}/fetchchats`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            dispatch(setChats(res?.data?.chat))
            dispatch(setFetchChatsAgain(true))
        
            return res.data.chat
        
        } catch (error) {
            console.log(error)
        }
    }
        
        const {data,isLoading,isError} = useQuery(`chats_${fetChatsAgain}`,  getChats, { enabled: !!chats || !!fetChatsAgain },)

        console.log(fetChatsAgain)



        const handleChat = async (chat: any) => {
          
            dispatch(selectChat(chat))

            socketConnection.emit("joinChat",chat?._id)
          
                }

  return (
    <div>
        {data?.map((chat:any,ind:number)=>{
return(
    <div key={chat._id}>

<button className='w-full hover:bg-slate-400 text-gray-300 hover:text-gray-800 rounded-3xl p-1 mt-2' onClick={()=>handleChat(chat)}> 

<div className='flex gap-2 items-center relative'>

    <div className="p-1 rounded-full absolute top-0 left-6 bg-green-500"></div>

<img src='https://github.com/shadcn.png' className='rounded-full w-8'/>

<p className='capitalize font-medium text-xs'>
{!chat.isGroupChat ? getSender(user,chat.users) : chat.chatName}
</p>

</div>

</button>
    </div>
)
    })}

    </div>
  )
}

export default MyChats