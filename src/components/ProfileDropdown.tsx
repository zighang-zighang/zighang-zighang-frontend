"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
  onLogout,
}: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-[126px] bg-white rounded-[8px] border border-gray-200 z-50"
    >
      <Link
        href="/mypage"
        className="block p-4 text-Heading6-12sb hover:bg-gray-100 rounded-t-[8px]"
        onClick={onClose}
      >
        프로필
      </Link>
      <Link
        href="/memos"
        className="block p-4 text-Heading6-12sb hover:bg-gray-100"
        onClick={onClose}
      >
        메모장
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left p-4 text-Heading6-12sb hover:bg-gray-100 rounded-b-[8px]"
      >
        로그아웃
      </button>
    </div>
  );
}
