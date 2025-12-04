// utils/api.ts
import axios from "axios";
import Cookies from "js-cookie";

// -----------------------------
// تایپ پارامترهای ورودی برای SP
// -----------------------------
interface SPParameters {
  [key: `@${string}`]: string | number | boolean;
}

// -----------------------------
// تایپ خروجی نهایی
// -----------------------------
export interface SPResponse<T = any> {
  IsSuccess: boolean;
  StatusCode: number;
  Message: string;
  Data: T[];
}

// -----------------------------
// Axios Instance
// -----------------------------
const api = axios.create({
  baseURL: "https://pool.techa.me/api/ExecuteTSql",
  headers: { "Content-Type": "application/json" },
});

// -----------------------------
// Interceptor برای اضافه کردن توکن
// -----------------------------
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -----------------------------
// تابع اجرای Stored Procedure
// خروجی: Dataset + وضعیت درخواست
// -----------------------------
export async function SP_fetch<T = any>(
  procedureName: string,
  parameters: SPParameters = {},
  hasDataTable: boolean = true
): Promise<SPResponse<T>> {
  const body: any = {
    ProcedureName: procedureName,
    ProjectId: process.env.PROJECT_ID ?? 1016,
    HasDataTable: hasDataTable,
    Parameters: Object.fromEntries(
      Object.entries(parameters).map(([k, v]) => [k.startsWith("@") ? k : `@${k}`, String(v)])
    ),
  };

  try {
    const { data } = await api.post("/ExecuteStoredProcedure", body);

    let dataset: T[] = [];
    if (typeof data.Data === "string") {
      try { dataset = JSON.parse(data.Data); } catch { }
    } else if (Array.isArray(data.Data)) {
      dataset = data.Data;
    }

    return {
      IsSuccess: data.IsSuccess ?? false,
      StatusCode: data.StatusCode ?? -1,
      Message: data.Message ?? "",
      Data: Array.isArray(dataset) ? dataset : [],
    };
  } catch (error: any) {
    const errData = error?.response?.data;

    let msg = error.message;

    // اگر API پیام SP را ارسال کرده باشد
    if (errData?.Message) msg = errData.Message;
    if (typeof errData?.Data === "string") {
      try {
        const parsed = JSON.parse(errData.Data);
        if (parsed?.Message) msg = parsed.Message;
      } catch { }
    }

    return {
      IsSuccess: false,
      StatusCode: errData?.StatusCode ?? -1,
      Message: msg,
      Data: [],
    };
  }
}

