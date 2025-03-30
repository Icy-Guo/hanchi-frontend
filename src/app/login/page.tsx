'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { LoginResponse, UserData } from '@/types/login';
import { useUser } from '@/contexts/UserContext';

export default function Login() {
  const router = useRouter();
  const { setUserData } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const saveUserData = (data: LoginResponse['data']) => {
    const userData: UserData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      userId: data.user_id,
      userName: data.user_name,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData); // 更新 Context 中的状态
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:8081/api/v1/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.code === 1000) {
        saveUserData(response.data.data);
        toast.success('登录成功');
        router.push('/'); // 登录成功后跳转到首页
      } else {
        toast.error(response.data.message || '登录失败');
      }
    } catch (error) {
      console.error('登录失败', error);
      toast.error('登录失败，请检查用户名和密码');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">登录</h1>
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium">
                <span className="text-red-500 mr-1">*</span>
                用户名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors placeholder:text-gray-400"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                <span className="text-red-500 mr-1">*</span>
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors placeholder:text-gray-400"
                placeholder="请输入密码"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-500/80 transition-colors duration-200 text-lg font-medium"
          >
            登录
          </button>

          <div className="text-center text-sm text-gray-600">
            还没有账号？
            <a
              href="/signup"
              className="text-orange-500 hover:text-orange-600 font-medium ml-1"
            >
              立即注册
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
