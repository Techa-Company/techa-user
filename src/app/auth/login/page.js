"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Smartphone, Timer, RotateCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

const Login = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(Array(5).fill(""));
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputsRef = useRef([]);

  // تایمر
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // مدیریت کد و auto-tab
  const handleCodeChange = (value, index) => {
    const newCode = [...code];

    // فقط اعداد مجاز
    if (!/^\d*$/.test(value)) return;

    newCode[index] = value;
    setCode(newCode);

    // حرکت به جلو
    if (value.length === 1 && index < 4) {
      inputsRef.current[index + 1].focus();
    }

    // حرکت به عقب هنگام پاک کردن
    if (value.length === 0 && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ارسال کد
  const sendCode = async (data) => {
    // منطق ارسال کد به سرور
    setStep(2);
    setTimer(120);
    setIsResendDisabled(true);
  };

  // تایید کد
  // const verifyCode = async () => {
  //   const fullCode = code.join("");
  //   if (fullCode.length === 5) {
  //     // منطق تایید کد
  //     const result = await login({ phone: "09xxxxxxxxx" });
  //     if (result) {
  //       router.push(redirect || "/");
  //     }
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden ">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#6ACF5A] rounded-full z-50 backdrop-blur-sm"
          initial={{
            top: `${Math.random() * -20 - 10}%`,
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
            duration: Math.random() * 3 + 7, // 7 تا 10 ثانیه
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 15, // تأخیر بیشتر برای پراکندگی بهتر
          }}
          style={{
            filter: `blur(${Math.random() * 3}px)`,
            boxShadow: `0 0 ${Math.random() * 15 + 5}px rgba(255,255,255,0.7)`,
          }}
        />
      ))}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit(sendCode)}
        className="bg-white/95 p-8 rounded-3xl shadow-2xl border-2 border-[#7AE36A]/30 w-full max-w-md relative z-10 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-[#7AE36A] p-4 rounded-full">
            <Lock className="text-white h-8 w-8" />
          </div>
        </motion.div>

        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#7AE36A] to-[#4CAF50] bg-clip-text text-transparent">
          {step === 1 ? "ورود با شماره موبایل" : "تایید کد یکبار مصرف"}
        </h2>

        <div className="space-y-6">
          {/* مرحله 1 - شماره موبایل */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7AE36A]" />
                  <input
                    type="tel"
                    placeholder="شماره موبایل"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-[#7AE36A]/30 focus:outline-none text-gray-700 placeholder-gray-300"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-400 text-sm mt-2 block">
                    {errors.phone.message}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* مرحله 2 - کد تایید */}
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="code-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="number"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(e.target.value, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-12 h-12 text-center text-2xl border-2 border-[#7AE36A]/30 rounded-xl focus:outline-none focus:border-[#7AE36A]"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 text-[#7AE36A]">
                  <Timer className="w-5 h-5" />
                  <span>
                    {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                    {timer % 60}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* دکمه اقدام */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type={step === 1 ? "submit" : "button"}
            // onClick={step === 2 ? true : null}
            disabled={isSubmitting || (step === 2 && isResendDisabled)}
            className="w-full py-3 bg-gradient-to-r from-[#7AE36A] to-[#4CAF50] rounded-xl text-white font-semibold hover:shadow-lg transition-all relative overflow-hidden"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            ) : step === 1 ? (
              "ارسال کد"
            ) : (
              "تایید کد"
            )}
          </motion.button>

          {/* دکمه ارسال مجدد */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <button
                type="button"
                onClick={handleSubmit(sendCode)}
                disabled={isResendDisabled}
                className="text-[#7AE36A] hover:text-[#66d15e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCw className="inline-block ml-1 w-4 h-4" />
                ارسال مجدد کد
              </button>
            </motion.div>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Login;