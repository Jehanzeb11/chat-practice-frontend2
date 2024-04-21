import { baseURl } from '@/config/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const registerUser = createAsyncThunk("register/user", async ({username,email,password}:{username:string,email:string,password:string}) => {
        try {
            const { data } = await axios.post(`${baseURl}/register`, {username,email,password});
            console.log(data);
if (data) {   
    JSON.stringify(localStorage.setItem("token",data?.token))
}

            return data;
        } catch (error: any) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk("login/user", async ({email,password}:{email:string,password:string}) => {
    try {
        const { data } = await axios.post(`${baseURl}/login`, {email,password});

        const decodedData:any = jwtDecode(data.token)
        console.log(decodedData);
if (data && decodedData) {
localStorage.setItem("token",data?.token)
localStorage.setItem("userData",JSON.stringify(decodedData))
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
        token: null,
        loading: false,
        error: false,
    },
    reducers: {
        loadUser(state:any) {
            const token = state.token;

            if (token) {
                try {
                    const user = jwtDecode(token);
                    return { ...state, token:user };
                } catch (error) {
                    console.error('Invalid token:', error);
                    return state; // Or handle the error differently
                }
            }

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload) {
                    // Consider using a secure storage library instead of localStorage
                    state.token = action.payload.token;
                    // Optionally, decode the token here for user information
                }

                return state;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });



            builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.token = action.payload.token;
                }

                return state;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });






    },
});

export const { loadUser } = authSlice.actions;

export default authSlice.reducer;