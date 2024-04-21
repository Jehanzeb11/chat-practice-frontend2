import { baseURl } from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const registerUser = createAsyncThunk(
  "register/user",
  async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post(`${baseURl}/register`, {
        username,
        email,
        password,
      });
      console.log(data);
      if (data) {
        JSON.stringify(localStorage.setItem("token", data?.token));
      }

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(`${baseURl}/login`, {
        email,
        password,
      });

      const decodedData: any = jwtDecode(data.token);
      console.log(decodedData);
      if (data && decodedData) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userData", JSON.stringify(decodedData));
      }

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

const chatSlice = createSlice({
  name: "users",
  initialState: {
    chats: null,
    selectedChat: null,
    loading: false,
    error: false,
  },
  reducers: {
    selectChat(state: any, action) {

        console.log("action.payload",action.payload)

        return state.selectedChat = action.payload

    },
    setChats(state: any, action) {

      console.log("action.payload",action.payload)

      return state.chats = action.payload

  },
  },
});

export const {selectChat,setChats} = chatSlice.actions;

export default chatSlice.reducer;
