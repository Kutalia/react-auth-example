import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as faces from 'facesjs';

const initialState = {
    activeUserId: null,
    allUsers: {},
};

export const logIn = createAsyncThunk(
    'users/logIn',
    (authDetails, thunkAPI) => {
        const response = new Promise((resolve) => {
            const { getState } = thunkAPI;
            const { email, password } = authDetails;
            const users = getState().users.allUsers;
            const userIds = Object.keys(users);

            const currentUserId = userIds.filter((id) => users[id].email === email && users[id].password === password);

            if (currentUserId.length > 0) {
                resolve(currentUserId[0]);
            } else {
                resolve();
            }
        });
        return response;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signUp(state, action) {
            const id = uuidv4();
            state.allUsers[id] = { ...action.payload, face: faces.generate() };
            state.activeUserId = id;
        },
        deleteUser(state, action) {
            const id = action.payload;
            delete state.allUsers[id];

            // logging out the last user which had been recently deleted
            if (state.activeUserId === id || Object.keys(state.allUsers).length === 0) {
                state.activeUserId = null;
            }
        },
        editUser(state, action) {
            const { id, user } = action.payload;
            state.allUsers[id] = { ...state.allUsers[id], ...user };
        },
        logOut(state) {
            state.activeUserId = null;
        },
    },
    extraReducers: {
        [logIn.fulfilled]: (state, action) => {
            if (action.payload) {
                state.activeUserId = action.payload;
            }
        },
    },
});

export const getActiveUser = state => state.users.allUsers[state.users.activeUserId];

export default usersSlice.reducer;

export const { signUp, deleteUser, editUser, logOut } = usersSlice.actions;
