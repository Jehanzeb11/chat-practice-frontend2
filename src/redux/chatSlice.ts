import { baseURl } from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const initialState:any ={
  chats: [],
  selectedChat: null,
  loading: false,
  error: false,
}
const chatSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectChat(state: any, action) {

        console.log("action.payload",action.payload)

        state.selectedChat = action.payload

    },
    setChats(state, action) {

      console.log("action.payload",action.payload)

       state.chats = [...action.payload]

  },
  },
});

export const {selectChat,setChats} = chatSlice.actions;

export default chatSlice.reducer;
