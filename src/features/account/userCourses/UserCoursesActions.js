import { createAsyncThunk } from "@reduxjs/toolkit";
import { SP_fetch } from "../../../api/utils/api";

export const fetchUserCourses = createAsyncThunk(
    'docs/fetchUserCourses',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('GetUserCourses', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
