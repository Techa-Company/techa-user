// components/ConditionalSidebar.js
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function ConditionalSidebar() {
    const pathname = usePathname();

    // بررسی اینکه مسیر exercises باشه
    const hideSidebar = pathname?.includes("/exercises");

    if (hideSidebar) return null;

    return <Sidebar />;
}
