"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Smartphone, Timer, RotateCw, KeyRound } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  clearError,
  verifyOTP,
  requestOTP,
  decrementTimer,
} from "../../../features/auth/authSlice";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  otp: yup
    .string()
    .when("step", {
      is: 2,
      then: (schema) =>
        schema
          .required("کد تأیید الزامی است")
          .matches(/^\d{6}$/, "کد تأیید باید ۶ رقم باشد"),
    }),
});

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, otpSent, timer, user } = useSelector(
    (state) => state.auth
  );
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedPhone = watch("phone");

  // همگام‌سازی step با وضعیت otpSent
  useEffect(() => {
    setStep(otpSent ? 2 : 1);
  }, [otpSent]);

  // مدیریت تایمر
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer, dispatch]);

  // هدایت پس از ورود موفق
  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  // ارسال کد تأیید
  const handleSendCode = async (data) => {
    dispatch(clearError());
    const result = await dispatch(requestOTP(data.phone));
    if (!result.error) setStep(2);
  };

  // تأیید کد
  const handleVerifyCode = async (data) => {
    dispatch(clearError());
    const { phone, otp } = data;
    await dispatch(verifyOTP({ phone, code: otp }));
  };

  // ارسال مجدد کد
  const handleResendCode = async () => {
    dispatch(clearError());
    const phone = getValues("phone");
    await dispatch(requestOTP(phone));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br">
      {/* انیمیشن پس‌زمینه */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#6ACF5A] rounded-full z-0"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: 0,
            rotate: Math.random() * 360,
            opacity: 0,
          }}
          animate={{
            scale: [0, Math.random() * 0.5 + 0.5, 0],
            opacity: [0, Math.random() * 0.5 + 0.3, 0],
            y: "150vh",
            x: `${Math.random() * 30 - 15}vw`,
            rotate: Math.random() * 720 + 360,
          }}
          transition={{
            duration: Math.random() * 3 + 7,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 15,
          }}
          style={{
            filter: `blur(${Math.random() * 3}px)`,
            boxShadow: `0 0 ${Math.random() * 15 + 5}px rgba(106, 207, 90, 0.7)`,
          }}
        />
      ))}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit(step === 1 ? handleSendCode : handleVerifyCode)}
        className="bg-white/95 p-8 rounded-3xl shadow-2xl border-2 border-[#7AE36A]/30 w-full max-w-md relative z-10 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-br from-[#7AE36A] to-[#4CAF50] p-4 rounded-full shadow-lg">
            <Lock className="text-white h-8 w-8" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#7AE36A] to-[#4CAF50] bg-clip-text text-transparent">
          {step === 1 ? "ورود به حساب کاربری" : "تأیید شماره موبایل"}
        </h2>

        <div className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-gray-600 text-center">
                  لطفاً شماره موبایل خود را وارد کنید
                </p>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7AE36A]" />
                  <input
                    type="tel"
                    placeholder="0912 345 6789"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7AE36A] text-gray-700"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-gray-600 text-center">
                  کد تأیید برای شماره {watchedPhone} ارسال شد
                </p>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7AE36A]" />
                  <input
                    type="number"
                    maxLength="6"
                    inputMode="numeric"
                    placeholder="کد ۶ رقمی را وارد کنید"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7AE36A] text-gray-700 tracking-widest text-center font-mono"
                    {...register("otp")}
                  />
                </div>
                {errors.otp && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errors.otp.message}
                  </span>
                )}

                <div className="flex items-center justify-center gap-2 text-[#7AE36A]">
                  <Timer className="w-5 h-5" />
                  <span className="font-medium">
                    {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                    {timer % 60}
                  </span>
                  <span className="text-gray-500">ثانیه تا ارسال مجدد کد</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#7AE36A] to-[#4CAF50] rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            {loading
              ? step === 1
                ? "در حال ارسال کد..."
                : "در حال تأیید..."
              : step === 1
                ? "دریافت کد تأیید"
                : "تأیید و ورود"}
          </motion.button>

          {step === 2 && (
            <>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={timer > 0 || loading}
                  className="text-[#7AE36A] hover:text-[#5bbd4e] disabled:opacity-50 transition-all flex items-center justify-center mx-auto"
                >
                  <RotateCw className="ml-1 w-4 h-4" />
                  ارسال مجدد کد
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-all"
                >
                  تغییر شماره موبایل
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            با ورود به حساب کاربری، شرایط و قوانین را می‌پذیرید
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
