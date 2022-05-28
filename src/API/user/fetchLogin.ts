import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const fetchLogin = createAsyncThunk(
    'user/login',
    async (form, thunkApi) => {
        try {
            let res = await client.post('')
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)