import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/utils/axios";

// Request OTP
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

// Login With OTP
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