"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { baseURl } from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { loginUser } from '@/redux/userSlice'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const router = useRouter()

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    
    const {user,loading,error,token} = useSelector((state:any)=>state.auth)

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        dispatch(loginUser({email,password}));
        
            }

            useEffect(()=>{

const user = localStorage.getItem("userData")

if (user) {
    router.push("/chat/chatpage")
}

            },[])

  return (
    <form className='flex justify-center items-center flex-col gap-4' onSubmit={handleSubmit}>
        
<input type="email" className='p-1.5 border border-slate-300' placeholder="email" required onChange={(e)=>setEmail(e.target.value)}/>
<input type="password" className='p-1.5 border border-slate-300' placeholder="passsword" required onChange={(e)=>setPassword(e.target.value)}/>

<Button>Submit</Button>

    </form>
  )
}

export default LoginForm