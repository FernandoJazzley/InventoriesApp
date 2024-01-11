import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: null
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined; 
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        messageWelcome: ( state, {payload} ) => {
            state.status = 'welcome';
            state.user = payload;
        },
        messageRegister: ( state , {payload}) => {
            state.status = 'register'
            state.user = payload;  
        },
        clearErrorMessage: ( state ) =>{
            state.errorMessage = undefined
        },
        onRecovery: (state) => {
            state.status = 'recovery';
            state.user = {};
            state.errorMessage = undefined;
        },
    }
});

// Action creators are generated for each case reducer function

export const { onChecking, onLogin, onLogout, clearErrorMessage, messageWelcome, messageRegister ,onRecovery} = authSlice.actions;