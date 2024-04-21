"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/redux/userSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'

const RegisterForm = () => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    
    const {user,loading,error,token} = useSelector((state:any)=>state.auth)

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()

        console.log({username,email,password})
        dispatch(registerUser({username,email,password}));
    }

  return (
    <form className='flex justify-center items-center flex-col gap-4' onSubmit={handleSubmit}>
        
<input type="text" className='p-1.5 border border-slate-300' placeholder="username" required onChange={(e)=>setUsername(e.target.value)}/>
<input type="email" className='p-1.5 border border-slate-300' placeholder="email" required onChange={(e)=>setEmail(e.target.value)}/>
<input type="password" className='p-1.5 border border-slate-300' placeholder="passsword" required onChange={(e)=>setPassword(e.target.value)}/>

<Button type='submit'>Submit</Button>

    </form>
  )
}

export default RegisterForm