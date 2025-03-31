'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
export default function UserAvatar() {
  const { userData, setUserData } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    setShowLogoutDialog(false);
    router.push('/');
  };

  if (!userData) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-6">
        <Link href="/login">
          <Button
            variant="outline"
            className="min-w-[80px] sm:min-w-[100px] border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-md transition-all text-sm sm:text-base"
          >
            登录
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="min-w-[80px] sm:min-w-[100px] bg-orange-500 text-white hover:bg-orange-500/80 hover:shadow-md transition-all text-sm sm:text-base">
            注册
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <button className="focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-500/80 transition-colors">
              <span className="text-black text-lg">
                {userData.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-36 p-0 shadow-none bg-white rounded-lg mt-2 border-gray-200 border"
          sideOffset={0}
          align="end"
        >
          <div className="px-4 py-2 text-sm text-gray-700 border-b-gray-200 border-b">
            {userData.userName}
          </div>
          <button
            onClick={() => {
              setShowLogoutDialog(true);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            退出登录
          </button>
        </PopoverContent>
      </Popover>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认退出登录</DialogTitle>
            <DialogDescription>您确定要退出登录吗？</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="bg-white hover:bg-gray-100"
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              确认退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
