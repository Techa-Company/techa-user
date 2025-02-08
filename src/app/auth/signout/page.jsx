"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Adjust according to your router
import { useAuth } from "../../../components/contexts/AuthContext";

const Page = () => {
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
        // Handle logout failure if needed
        console.error("Logout failed");
      }
    };

    handleLogout();
  }, [redirect, logout, router]);

  return <p>Signing out...</p>;
};

export default Page;
