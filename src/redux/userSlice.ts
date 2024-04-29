// import { baseURl } from '@/config/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie"

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const token = localStorage.getItem("token")

export const loginUser = createAsyncThunk("login/user", async ({email,password,router}:{email:string,password:string,router:any}) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {email,password});
       
if (response.status === 200) {
    Cookies.set('token', JSON.stringify(true))
    localStorage.setItem("token",response?.data?.token)
    router.push("/chat/chatpage")
}

        return response?.data;
    } catch (error: any) {
        console.log(error);
    }
}
);

export const getUser = createAsyncThunk("get/user", async ({router}:{router:any}) => {

    try {
        const { data } = await axios.post(`${BASE_URL}/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });

if (data.status === "Authorization Token not found") {
    localStorage.clear()
    Cookies.remove("token")
   return
}else{
    console.log(data)
    router.push("/chat/chatpage")
}
        return data;
    } catch (error: any) {
        console.log(error);
    }
}
);

const authSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        token: token ? token : null,
        loading: false,
        error: false,
    },
    reducers: {
        },

        extraReducers: (builder) => {
            builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                
                console.log(action.payload)
                    state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });


            // getting loggedin user 


            builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {

                console.log(action.payload)
                    state.token = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });



    },
});


export default authSlice.reducer;