import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import io from 'socket.io-client';
import { selectChat } from '@/redux/chatSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseURl } from '@/config/api';

const SendMessageCmp = () => {

  const {selectedChat,socketConnection} = useSelector((state:any)=>state.chat)

const user:any = localStorage.getItem("userData")
const token:any = localStorage.getItem("token")

const userData = JSON.parse(user)

const [message,setMessage] = useState('')


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

  return (
    <div className='w-full'>
      <form className='w-full flex h-full gap-2 justify-center items-end' onSubmit={handleSubmit}>

<Input placeholder='Message' className='w-full' onChange={(e)=>setMessage(e.target.value)} required/>

<Button type='submit'>Send</Button>

      </form>
    </div>
  )
}

export default SendMessageCmp
