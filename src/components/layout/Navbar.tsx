import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

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

        {/* 右侧按钮组 */}
        <div className="flex items-center space-x-6">
          <Link href="/login">
            <Button
              variant="outline"
              className="min-w-[100px] border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-md transition-all"
            >
              登录
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="min-w-[100px] bg-orange-500 text-white hover:bg-orange-500/80 hover:shadow-md transition-all">
              注册
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
