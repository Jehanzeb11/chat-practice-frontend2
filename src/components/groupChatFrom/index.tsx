"use client";
import { baseURl } from "@/config/api";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/redux/chatSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GroupChatCreate = ({ searchText }: { searchText: any }) => {
  const dispatch = useDispatch();

  const { chats } = useSelector((state: any) => state.chat);

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
    setSelectedUsers(selectedUses.filter((e: any) => e._id !== user._id));
  };

  const handleAddUser = (user: any) => {
    setSelectedUsers([...selectedUses, user]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!groupChatName || !selectedUses) {
      alert("All Fields Required");
    }

    try {
      const { data } = await axios.post(
        `${baseURl}/creategroup`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUses.map((u: any) => u._id)),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        dispatch(setChats([data?.chat, ...chats]));

        console.log("created Chat", data);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    searchText("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          type="button"
          onClick={() => setOpen(true)}
        >
          + New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[25%]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <form onSubmit={handleSubmit}>
              {selectedUses?.map((user: any, ind) => (
                <Button
                  variant={"link"}
                  type="button"
                  onClick={() => handleDeleteUser(user)}
                >
                  {user.username}
                </Button>
              ))}

              <input
                type="text"
                placeholder="Group name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <input
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
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupChatCreate;
