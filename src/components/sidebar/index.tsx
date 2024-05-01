"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import MyChats from '../MyChats'
import axios from 'axios'
import { baseURl } from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import { selectChat, setChats, setFetchChatsAgain } from '@/redux/chatSlice'
import GroupChatCreate from '../groupChatFrom'
import { BiHomeCircle, BiSearch } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";
import { RiWechatFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { ModeToggle } from '../toggleTheme/ToggleTheme'

const Sidebar = () => {
    const token = localStorage.getItem("token")

    const dispatch = useDispatch()

const {selectedChat,chats,loading,error} = useSelector((state:any)=>state.chat)

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false);

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
        <aside className='w-96 z-10 p-2 dark:bg-my-gradient max-h-[100vh] overflow-y-scroll sticky top-0 left-0 scrollbar-hidden border-r-[1px] border-gray-500'>

<div className='flex items-start gap-2 h-full '>

    <div className='blurSidebarbg h-full w-16 p-1 rounded'>

    <Button className='cursor-pointer my-1 bg-transparent hover:bg-indigo-900' onClick={()=>setOpen(true)}>
<IoMdAddCircle size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <Button className='cursor-pointer my-1 bg-transparent hover:bg-indigo-900'>
<BiHomeCircle size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <Button className='cursor-pointer my-1 bg-transparent hover:bg-indigo-900'>
<MdOutlineMessage size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <Button className='cursor-pointer my-1 bg-transparent hover:bg-indigo-900'>
<RiWechatFill size={20} className='p-0 m-0' color='#f5f5f5'/>
    </Button>

    <ModeToggle />

</div>

<div>

<div>

<div className="text-white mb-2">
    <h4 className='text-base'>Messages (20)</h4>
</div>

            <form className='flex gap-2 w-full dark:blurSidebarbg  rounded px-2 py-1'>
                <input type="text" required placeholder='search User' className='w-full rounded bg-transparent border-0 outline-none text-gray-300 text-sm' onChange={(e) => setSearch(e.target.value)} />
                <Button className='bg-transparent hover:bg-transparent p-0'><BiSearch size={20}/></Button>
            </form>

</div>

<div className='h-full w-full'>

<div className="mt-3 w-full flex justify-end">

<GroupChatCreate open={open} setOpen={setOpen} />

</div>

<div>
            {search && users?.map((user: any, ind: number) => {
                return (
                    <div key={user._id}>

                    <button className='w-full bg-transparent hover:bg-indigo-500 text-gray-300 rounded p-1 mt-2' > 
                    
                    <div className='flex gap-2 items-center relative'>
                    
                        <div className="p-1 rounded-full absolute top-0 left-6 bg-green-500"></div>
                    
                    <img src='https://github.com/shadcn.png' className='rounded-full w-8'/>
                    
                    <p className='capitalize font-semibold text-xs'>
                    Jehanzeb Siddiqui
                    </p>
                    
                    </div>
                    
                    </button>
                        </div>
                )
            })}

{search &&(
    <p className='text-center text-gray-200'>{users?.length} Results Found</p>
)}

</div>




</div>
           {!search && <div className='mt-3 w-full'>
                <MyChats />
            </div>}
</div>



</div>




        </aside>
    )
}

export default Sidebar