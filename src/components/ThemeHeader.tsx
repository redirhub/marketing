"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function ThemeHeader() {
  const pathname = usePathname();

  const hideHeaderAndFooter = pathname.includes("/rate");
  const isLightModePages = pathname.includes("/legal");

  if (hideHeaderAndFooter) return null;

  return <Header mode={isLightModePages ? "light" : "dark"} />;
}
