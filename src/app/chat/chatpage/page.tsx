"use client"
import Sidebar from '@/components/sidebar'
import { baseURl } from '@/config/api'
import axios from 'axios'
import React from 'react'
import {
    useQuery,
  } from 'react-query'


const page = () => {




  return (
    <div>
        <Sidebar/>
    </div>
  )
}

export default page