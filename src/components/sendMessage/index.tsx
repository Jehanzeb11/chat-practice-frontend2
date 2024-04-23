import React, { FormEvent } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SendMessageCmp = () => {

const handleSubmit = (e:FormEvent)=>{
e.preventDefault()
}

  return (
    <div className='w-full h-full p-2'>
      <form className='w-full flex h-full gap-2 justify-center mb-2 items-end' onSubmit={handleSubmit}>

<Input placeholder='Message' className='w-full'/>

<Button type='submit'>Send</Button>

      </form>
    </div>
  )
}

export default SendMessageCmp
