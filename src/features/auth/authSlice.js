import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../lib/utils/axios";
import Cookies from "js-cookie";

// =======================
// Async Thunks
// =======================

// درخواست OTP
export const requestOTP = createAsyncThunk(
    "auth/requestOTP",
    async (phone, { rejectWithValue }) => {
        try {
            const response = await api.post(`/Account/RequestOTP?MobileNumber=${phone}`);
            if (!response.data.IsSuccess) {
                return rejectWithValue(response.data.Message || "خطایی در ارسال کد رخ داده است");
            }
            return { phone };
        } catch (error) {
            return rejectWithValue(error.response?.data?.Message || "خطای شبکه رخ داده است");
        }
    }
);

// تأیید OTP
export const verifyOTP = createAsyncThunk(
    "auth/verifyOTP",
    async ({ phone, code }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/Account/LoginByOtp?MobileNumber=${phone}&OtpCode=${code}`);
            if (!response.data.IsSuccess) {
                return rejectWithValue(response.data.Message || "کد وارد شده نامعتبر است");
            }
            return response.data.Data; // شامل Token و اطلاعات کاربر
        } catch (error) {
            return rejectWithValue(error.response?.data?.Message || "خطای شبکه رخ داده است");
        }
    }
);

// =======================
// Initial State
// =======================
const initialState = {
    user: null,
    loading: false,
    error: null,
    otpSent: false,
    timer: 0,
    phone: null
};

// =======================
// Slice
// =======================
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; },
        setTimer: (state, action) => { state.timer = action.payload; },
        decrementTimer: (state) => { state.timer = Math.max(0, state.timer - 1); },
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
            state.otpSent = false;
            state.timer = 0;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.otpSent = false;
            state.timer = 0;
            Cookies.remove("token");
            Cookies.remove("user");
            Cookies.remove("otpStart");
        },
        loadUserFromCookie: (state) => {
            try {
                const userCookie = Cookies.get("user");
                if (userCookie) state.user = JSON.parse(userCookie);

                const otpStart = Cookies.get("otpStart");
                if (otpStart) {
                    const elapsed = Math.floor((Date.now() - parseInt(otpStart)) / 1000);
                    const remaining = Math.max(0, 120 - elapsed);
                    if (remaining > 0) {
                        state.timer = remaining;
                        state.otpSent = true;
                    } else {
                        Cookies.remove("otpStart");
                    }
                }
            } catch (err) {
                console.error("Error loading user or OTP timer from cookie:", err);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // requestOTP
            .addCase(requestOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.phone = action.payload.phone;
                state.timer = 120;
                Cookies.set("otpStart", Date.now().toString(), { expires: 1 });
            })
            .addCase(requestOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.otpSent = false;
            })
            // verifyOTP
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.otpSent = false;
                state.timer = 0;

                // ذخیره توکن و کاربر در کوکی
                Cookies.set("token", action.payload.Token, { expires: 7, secure: true, sameSite: "strict" });
                Cookies.set("user", JSON.stringify(action.payload), { expires: 7, secure: true, sameSite: "strict" });
                Cookies.remove("otpStart");
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    clearError,
    setTimer,
    decrementTimer,
    resetAuth,
    logout,
    loadUserFromCookie
} = authSlice.actions;

export default authSlice.reducer;
