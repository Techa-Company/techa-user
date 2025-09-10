import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from "../../../api/utils/api";


export const fetchContents = createAsyncThunk(
    'docs/fetchContents',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Contents', parameters)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchContentById = createAsyncThunk(
    'docs/fetchContentById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Contents', parameters)
            console.log(res.Data.Dataset[0])
            return res.Data.Dataset[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

