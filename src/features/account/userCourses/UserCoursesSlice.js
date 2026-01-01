// src/features/docs/userCoursesSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchUserById, fetchUserCourses, updateUser, updateUserSocialMedia } from './UserCoursesActions'

const initialState = {
    courses: null,
    loading: false,
    error: null,
}


const userCoursesSlice = createSlice({
    name: 'userCourses',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserCourses.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserCourses.fulfilled, (state, action) => {
                state.loading = false
                state.courses = action.payload
            })
            .addCase(fetchUserCourses.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    },
})

export default userCoursesSlice.reducer
