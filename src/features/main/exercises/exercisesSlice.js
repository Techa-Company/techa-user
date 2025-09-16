import { createSlice } from '@reduxjs/toolkit'
import { fetchExerciseById, fetchExercises, sendExercise } from './exercisesActions'

const initialState = {
    exercises: [],
    singleExercise: null,
    loading: false,
    error: null,
}

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchExercises.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.loading = false
                state.exercises = action.payload
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExerciseById.fulfilled, (state, action) => {
                state.loading = false
                state.singleExercise = action.payload
            })
            .addCase(fetchExerciseById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(sendExercise.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendExercise.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(sendExercise.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default exercisesSlice.reducer
