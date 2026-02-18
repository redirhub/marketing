"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import {
  FERNAND_APP_ID,
  APP_URL,
} from "@/lib/utils/constants";
import { useLocalePath } from "@/lib/hooks/useLocalePath";

declare global {
  interface Window {
    Fernand: ((...args: unknown[]) => void) & { q: unknown[][] };
  }
}

export default function FernandWidget() {
  const { t } = useTranslation();
  const localePath = useLocalePath();

  useEffect(() => {
    if (typeof window.Fernand !== "function") {
      const f = Object.assign(
        function (...args: unknown[]) {
          f.q[args[0] === "set" ? "unshift" : "push"](args);
        },
        { q: [] as unknown[][] }
      );
      window.Fernand = f;
    }

    window.Fernand("init", {
      appId: FERNAND_APP_ID,
      show: true,
      open: false,
      theme: "light",
      defaultTab: "home",
      language: "auto",
      links: [
        {
          icon: "guides",
          title: t("nav.setup-redirect", "Setting Up Your First URL Redirect"),
          url: APP_URL + localePath("/support/setting-up-url-redirects"),
          target: "_blank",
        },
        {
          icon: "link",
          title: t("nav.support", "Support"),
          url: APP_URL + localePath("/support"),
          target: "_blank",
        },
        {
          icon: "calendar",
          title: t("nav.request-demo", "Request a demo"),
          url: APP_URL + localePath("/enterprise"),
          target: "_blank",
        },
      ],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Script
      src="https://messenger.getfernand.com/client.js"
      strategy="afterInteractive"
    />
  );
}
