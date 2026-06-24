"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, LayoutDashboard, AppWindow, Zap } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-sm group-hover:shadow-violet-200 transition-all duration-200">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-gray-900">
            MetaForge
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              isActive("/")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Editor
          </Link>

          <Link
            href="/apps"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              isActive("/apps")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <AppWindow className="h-3.5 w-3.5" />
            My Apps
          </Link>
        </nav>

        {/* Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 ring-1 ring-inset ring-violet-200">
            <Layers className="h-3 w-3" />
            v0.1.0
          </span>
        </div>
      </div>
    </header>
  );
}
