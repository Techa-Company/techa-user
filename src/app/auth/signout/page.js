"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../../components/contexts/AuthContext";

const SignoutContent = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  useEffect(() => {
    const handleLogout = async () => {
      const success = await logout();
      if (success) {
        router.push(`/auth/login?redirect=${encodeURIComponent(redirect)}`);
      } else {
        console.error("Logout failed");
      }
    };
    handleLogout();
  }, [redirect, logout, router]);

  return <p>در حال خروج...</p>;
};

const Page = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <SignoutContent />
  </Suspense>
);

export default Page;