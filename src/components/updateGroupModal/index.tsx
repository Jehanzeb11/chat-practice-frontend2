"use client";
import { baseURl } from "@/config/api";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setChats } from "@/redux/chatSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

const UpdateGroupModal = () => {

    const userData: any = localStorage.getItem("userData");

    const loggedInUser = JSON.parse(userData);

  const dispatch = useDispatch();

  const { selectedChat } = useSelector((state: any) => state.chat);

  const token = localStorage.getItem("token");


  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUses, setSelectedUsers] = useState<object[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = async (query: string) => {
    setSearch(query);

    if (!query) {
      return;
    }

    try {
      const { data } = await axios.get(`${baseURl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search,
        },
      });

      console.log(data);

      if (data) {
        setSearchResults(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = (user: any) => {

    if (selectedChat?.groupAdmin?._id !== loggedInUser?.userId && user._id !== loggedInUser?.userId) {
        alert("Only Admin Can Remove user")
        return;
    }

    try {
        const {data}:any = axios.put(`${baseURl}/removetogroup`,{
            chatId:selectedChat._id,
            userId:user._id
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })


        user._id === loggedInUser?.userId_id ? selectChat(null) : ""

        console.log(data)

    } catch (error) {
        console.log(error)
    }

  };

  const handleAddUser = (user: any) => {

    if (selectedChat?.users?.find((c:any)=>c._id === user?.userId)) {
        alert("User Already In Group")
        return;
    }

    if (selectedChat?.groupAdmin?._id !== loggedInUser?.userId) {
        alert("Only Admin Can Add user")
        return;
    }

    try {
        const {data}:any = axios.put(`${baseURl}/addtogroup`,{
            chatId:selectedChat._id,
            userId:user._id
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }

  };


useEffect(()=>{
    if (selectedChat) {   
        setGroupChatName(selectedChat?.chatName)
    }
},[selectedChat])


const handleRename = ()=>{
    try {
        const {data} : any = axios.put(`${baseURl}/renamegroup`,{
            chatId:selectedChat?._id,
chatName:groupChatName
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

console.log(data)

    } catch (error) {
        console.log(error)
    }
}

  return   <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button
      variant={"secondary"}
      type="button"
      onClick={() => setOpen(true)}
    >
    Update Group
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[25%]">
    <DialogHeader>
      <DialogTitle>{selectedChat?.chatName}</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="flex gap-4 py-4 w-full">
      <div>
          {selectedChat?.users?.map((user: any) => (
            <Button
              variant={"link"}
              type="button"
              key={user._id}
              className="mx-2"
              onClick={() => handleDeleteUser(user)}
            >
              {user.username}
            </Button>
          ))}

<div className=" flex justify-between items-center gap-2">
          <Input
            type="text"
            placeholder="Group name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button onClick={handleRename}>Rename</Button>

            </div>

          <br />
          <Input
            type="text"
            placeholder="User name"
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className="p-2">
            {searchResults?.slice(0, 4)?.map((user: any, index) => (
              <Button
                variant={"outline"}
                type="button"
                key={index}
                onClick={() => handleAddUser(user)}
              >
                {user.username}
              </Button>
            ))}
          </div>

          <DialogFooter>
            <Button variant={"destructive"}>Leave Group</Button>
          </DialogFooter>
      </div>
    </div>
  </DialogContent>
</Dialog>;
};

export default UpdateGroupModal;
