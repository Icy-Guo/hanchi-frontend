import Link from 'next/link';
import { Github } from 'lucide-react';
import UserAvatar from '@/components/layout/UserAvatar';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm mb-6">
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-3 transition-all hover:scale-105"
        >
          <Github className="h-8 w-8 text-primary transition-colors group-hover:text-primary/80" />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text text-transparent transition-all">
            Golang论坛
          </span>
        </Link>

        {/* 用户头像/登录注册按钮 */}
        <UserAvatar />
      </div>
    </nav>
  );
}
