import { createSlice } from "@reduxjs/toolkit";

// Define type for message objects (optional but recommended)
interface Message {
  content: string; // Add other message properties as needed
}

const initialState: {
  chats: []; // Replace with actual chat data structure
  selectedChat: null;
  socketConnection: null;
  fetchChatsAgain: false;
  loading: false;
  error: false;
  newMessages: Message[]; // Use Message interface for type safety
} = {
  chats: [],
  selectedChat: null,
  socketConnection: null,
  fetchChatsAgain: false,
  loading: false,
  error: false,
  newMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setFetchChatsAgain(state, action) {
      state.fetchChatsAgain = action.payload;
    },
    setConnectSocket(state, action) {
      state.socketConnection = action.payload;
    },
    sendMessage(state, action) {
      // Assuming synchronous message sending for now
      state.newMessages.push(action.payload); // Use spread operator for immutability
    },
    clearNewMessages(state) {
      state.newMessages = []; // Reset new messages on chat change or send
    },
  },
});

export const {
  selectChat,
  setChats,
  setFetchChatsAgain,
  setConnectSocket,
  sendMessage,
  clearNewMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
