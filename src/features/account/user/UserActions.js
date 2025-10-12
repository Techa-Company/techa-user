import { createAsyncThunk } from "@reduxjs/toolkit";
import { SP_fetch } from "../../../api/utils/api";

export const fetchUserById = createAsyncThunk(
    'docs/fetchUserById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Users', parameters)
            console.log(res.Data.Dataset[0])
            return res.Data.Dataset[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const updateUser = createAsyncThunk(
    'docs/updateUser',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Users', parameters)
            console.log(res)
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)