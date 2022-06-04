import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {IRegister} from "../../components/Auth/register.interface";


const fetchRegistration = createAsyncThunk(
    'user/register',
    async (form: IRegister, thunkApi) => {
        try {
            let res = await client.post('/registations')
            console.log(res)
        } catch (e: any) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default fetchRegistration