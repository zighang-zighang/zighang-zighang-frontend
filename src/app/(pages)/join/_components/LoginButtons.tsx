"use client";

import LoginButton from "./LoginButton";

function buildAuthorizeUrl(provider: "kakao" | "naver" | "google"): string {
  const isBrowser = typeof window !== "undefined";
  const devRedirectOrigin = "http://localhost:3000";
  const prodRedirectOrigin = process.env.NEXT_PUBLIC_REDIRECT_ORIGIN;

  const currentOrigin = isBrowser ? window.location.origin : "";
  const isDev = isBrowser
    ? currentOrigin.includes("localhost:3000")
    : process.env.NODE_ENV !== "production";

  const redirectOrigin = isDev
    ? devRedirectOrigin
    : prodRedirectOrigin || currentOrigin;

  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  const redirectParam = encodeURIComponent(`${redirectOrigin}/`);
  const path = `/oauth2/authorization/${provider}?redirect_uri=${redirectParam}`;

  if (
    base &&
    (base.startsWith("http://") ||
      base.startsWith("https://") ||
      base.startsWith("/"))
  ) {
    return `${base}${path}`;
  }
  return path;
}

export default function LoginButtons() {
  const handleKakaoLogin = () => {
    const url = buildAuthorizeUrl("kakao");
    window.location.href = url;
  };

  const handleNaverLogin = () => {
    const url = buildAuthorizeUrl("naver");
    window.location.href = url;
  };

  const handleGoogleLogin = () => {
    const url = buildAuthorizeUrl("google");
    window.location.href = url;
  };

  return (
    <div className="flex w-full flex-col items-center gap-2 px-7 md:gap-3 md:px-24">
      <LoginButton provider="kakao" onClick={handleKakaoLogin} />
      <LoginButton provider="naver" onClick={handleNaverLogin} />
      <LoginButton provider="google" onClick={handleGoogleLogin} />
    </div>
  );
}
