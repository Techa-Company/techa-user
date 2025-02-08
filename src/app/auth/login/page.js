"use client";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../../components/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
const schema = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { login } = useAuth();

  const onFormDataChange = (e) => {
    const { name, value } = e.target; // Use `name` instead of `localName`
    switch (name) {
      case "username":
        setFormData((prev) => ({ ...prev, username: value }));
        break;
      case "password":
        setFormData((prev) => ({ ...prev, password: value }));
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    const result = await login({
      Password: formData.password,
      UserName: formData.username,
    });
    if (result == true) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } else {
      alert(result.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.form
        initial="hidden"
        animate="visible"
        variants={formVariants}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#7AE36A]/30 w-full max-w-md"
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
          ورود به حساب
        </h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7AE36A]" />
                <input
                  type="text"
                  placeholder="نام کاربری"
                  name="username"
                  value={formData.username}
                  onChangeCapture={onFormDataChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-[#7AE36A]/30 focus:outline-none text-gray-700 placeholder-gray-300"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <span className="text-red-400 text-sm mt-2 block">
                  {errors.username.message}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7AE36A]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  name="password"
                  value={formData.password}
                  onChangeCapture={onFormDataChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 rounded-xl border border-[#7AE36A]/30 focus:outline-none text-gray-700 placeholder-gray-300"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7AE36A] hover:text-[#66d15e]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-sm mt-2 block">
                  {errors.password.message}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="flex items-center gap-2 text-[#7AE36A] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 form-checkbox accent-[#7AE36A]"
              />
              <span>مرا به خاطر بسپار</span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-[#7AE36A] hover:text-[#66d15e]"
            >
              فراموشی رمز عبور؟
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#7AE36A] to-[#4CAF50] rounded-xl text-white font-semibold hover:shadow-lg transition-all relative overflow-hidden"
          >
            {isSubmitting && (
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
            )}
            {isSubmitting ? "در حال پردازش..." : "ورود"}
          </motion.button>

          <motion.div
            className="text-center mt-4 text-[#7AE36A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            حساب کاربری ندارید؟{" "}
            <Link
              href="/auth/register"
              className="font-bold hover:text-[#66d15e]"
            >
              ثبت نام
            </Link>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
