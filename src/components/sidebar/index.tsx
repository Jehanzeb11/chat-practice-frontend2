"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import MyChats from '../MyChats'
import axios from 'axios'
import { baseURl } from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat, setChats } from '@/redux/chatSlice'
import GroupChatCreate from '../groupChatFrom'

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

console.log(data)

dispatch(selectChat(data?.chat))
setSearch("")

} catch (error) {
    console.log(error)
}
    }

    return (
        <aside className='w-96 p-2 bg-slate-400 h-screen'>

            <form className='flex gap-3 justify-center items-center '>
                <input type="text" required placeholder='search User' className='p-1 rounded' onChange={(e) => setSearch(e.target.value)} />
                <Button>Search</Button>
            </form>

<div className="mt-3 w-full flex justify-end">

<GroupChatCreate searchText={setSearch} />

</div>

            {users?.map((user: any, ind: number) => {
                return (
                    <div key={ind}>
                        <Button variant={"outline"} className='my-1.5' onClick={() => handleChat(user._id)}>{user.username}</Button>
                    </div>
                )
            })}

            <div className='mt-3'>
                <MyChats />
            </div>

        </aside>
    )
}

export default Sidebar