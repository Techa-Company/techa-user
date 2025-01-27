"use client";

import dynamic from "next/dynamic";
import React from "react";
const ReactArea = dynamic(() => import("../../_components/ReactAreaNew"), {
  ssr: false,
});
const Page = () => {
  return <ReactArea />;
};

export default Page;
