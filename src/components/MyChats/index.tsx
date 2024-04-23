"use client"
import { baseURl } from '@/config/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '../ui/button'
import { getSender } from '@/config/chatlogic'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat, setChats } from '@/redux/chatSlice'

const MyChats = () => {

    const {chats} = useSelector((state:any)=>state.chat)
    
const dispatch = useDispatch()

    const token = localStorage.getItem("token")
    const userData:any = localStorage.getItem("userData")


    const user = JSON.parse(userData)

    const getChats = async ()=>{
        try {
            const res = await axios.get(`${baseURl}/fetchchats`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            dispatch(setChats(res?.data?.chat))
        
            return res.data.chat
        
        } catch (error) {
            console.log(error)
        }
            }
        
        const {data,isLoading,isError} = useQuery(`chats_${chats}`,  getChats, { enabled: !!chats || !!selectChat })

        console.log(chats)



        const handleChat = async (chat: any) => {
          
            dispatch(selectChat(chat))
          
                }

  return (
    <div>
        {data?.map((chat:any,ind:number)=>{
return(
    <div key={chat._id}>
<Button variant={"ghost"} onClick={()=>handleChat(chat)}>{!chat.isGroupChat ? getSender(user,chat.users) : chat.chatName}</Button>
    </div>
)
    })}

    </div>
  )
}

export default MyChats