"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import MyChats from '../MyChats'
import axios from 'axios'
import { baseURl } from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat, setChats, setFetchChatsAgain } from '@/redux/chatSlice'
import GroupChatCreate from '../groupChatFrom'
import { BiHomeCircle } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";
import { RiWechatFill } from "react-icons/ri";
import { Input } from '../ui/input'

const Sidebar = () => {
    const token = localStorage.getItem("token")

    const dispatch = useDispatch()

const {selectedChat,chats,loading,error} = useSelector((state:any)=>state.chat)

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const searchUser = async () => {
        try {
            const user = await axios.get(`${baseURl}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    search,
                }
            })
            console.log(user.data)
            if (user.data) {
                setUsers(user.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (search) {

            searchUser()
        }

    }, [search])


    const handleChat = async (userId: number) => {
try {
    const {data} = await axios.post(`${baseURl}/accesschat`,{userId},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

if (chats.find((c:any)=>c._id === data._id ) ){
    dispatch(setChats([data,...chats]))    
}

dispatch(setFetchChatsAgain(true))

console.log(data)

dispatch(selectChat(data?.chat))
setSearch("")

} catch (error) {
    console.log(error)
}
    }

    return (
        <aside className='w-96 z-10 p-2 bg-[#2B2D31] max-h-[100vh] overflow-y-scroll sticky top-0 left-0 scrollbar-hidden'>

<div className='flex items-start gap-2 h-full'>

    <div className='bg-[#3a3c41] h-full w-16 p-1 rounded'>

    <Button variant={"ghost"} className='cursor-pointer'>
<BiHomeCircle size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <Button variant={"ghost"} className='cursor-pointer'>
<MdOutlineMessage size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <Button variant={"ghost"} className='cursor-pointer'>
<RiWechatFill size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>
</div>

<div>


            <form className='flex gap-2 w-full'>
                <Input type="text" required placeholder='search User' className='p-1 w-full rounded bg-[#383741] border-none outline-none text-gray-300 text-sm' onChange={(e) => setSearch(e.target.value)} />
                <Button variant={"myBtn"}>Search</Button>
            </form>

<div className='h-full w-full'>

<div className="mt-3 w-full flex justify-end">

<GroupChatCreate searchText={setSearch} />

</div>

<div>
            {users?.map((user: any, ind: number) => {
                return (
                    <div key={ind}>
                        <Button variant={"outline"} className='my-1.5' onClick={() => handleChat(user._id)}>{user.username}</Button>
                    </div>
                )
            })}
</div>

</div>
            <div className='mt-3 w-full'>
                <MyChats />
            </div>
</div>



</div>




        </aside>
    )
}

export default Sidebar