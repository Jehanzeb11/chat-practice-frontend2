import { baseURl } from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const initialState:any ={
  chats: [],
  selectedChat: null,
  socketConnection:null,
  fetChatsAgain: false,
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

  setFetchChatsAgain(state, action) {

    console.log("action of etch chats again",action.payload)

     state.fetChatsAgain = action.payload

},



setConnectSocket(state, action) {

  console.log("socket connection",action.payload)

   state.socketConnection = action.payload

},


  },
});

export const {selectChat,setChats,setFetchChatsAgain,setConnectSocket} = chatSlice.actions;

export default chatSlice.reducer;
