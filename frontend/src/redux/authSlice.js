import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: 'auth',
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false
        },
        register:{
            isFetching: false,
            error:false,
            suscess: false
        }
    },
    reducers:{
        loginStart: (state) =>{
            state.login.isFetching= true
        },
        loginSuccess: (state, action)=>{
            state.login.isFetching = false,
            state.login.currentUser = action.payload,
            state.login.error = false
        },
        loginFailed: (state)=>{
            state.login.isFetching = false,
            state.login.error = true
        },
        registerStart: (state) =>{
            state.register.isFetching= true
        },
        registerSuccess: (state)=>{
            state.register.isFetching = false,
            state.register.error = false,
            state.register.suscess= true
        },
        registerFailed: (state)=>{
            state.register.isFetching = false,
            state.register.error = true,
            state.register.suscess =false
        }
        
    }
})
export const{
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed
} = authSlice.actions
export default authSlice.reducer