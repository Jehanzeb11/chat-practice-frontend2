"use client"
import { baseURl } from '@/config/api'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Button } from '../ui/button'
import { getSender } from '@/config/chatlogic'

const MyChats = () => {
    
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
        
        return res.data.chat
        
        } catch (error) {
            console.log(error)
        }
            }
        
        const {data,isLoading,isError} = useQuery('chats',  getChats)

console.log(data)

  return (
    <div>
        {data?.map((chat:any,ind:number)=>{
return(
    <div key={chat._id}>
<Button variant={"ghost"}>{!chat.isGroupChat ? getSender(user,chat.users) : chat.chatName}</Button>
    </div>
)
        })}

    </div>
  )
}

export default MyChats