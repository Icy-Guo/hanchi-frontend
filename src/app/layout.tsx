import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golang论坛',
  description: '一个专注于Golang技术交流的社区',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className} style={{ backgroundColor: '#f3f4f6' }}>
        <UserProvider>
          <Navbar />
          <div>{children}</div>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
