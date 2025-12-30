// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from "../../../api/utils/api";

export const fetchExercises = createAsyncThunk(
    'docs/fetchExercises',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Exercise_List', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const fetchContentsWithExercises = createAsyncThunk(
    'docs/fetchContentsWithExercises',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('ContentsWithExercises_List', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchExerciseById = createAsyncThunk(
    'docs/fetchExerciseById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Exercises', parameters)
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const sendExercise = createAsyncThunk(
    'docs/sendExercise',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_UserExerciseProgresses', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)