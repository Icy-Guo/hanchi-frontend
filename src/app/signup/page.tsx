'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: 1, // 1: 男, 2: 女
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error('两次输入的密码不一致');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success('注册成功');
        router.push('/login');
      }
    } catch (error) {
      console.error('注册失败', error);
      toast.error('注册失败，请稍后重试');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">注册</h1>
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
                placeholder="用户名"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                <span className="text-red-500 mr-1">*</span>
                邮箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors placeholder:text-gray-400"
                placeholder="请输入邮箱"
                value={formData.email}
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
                placeholder="密码"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                <span className="text-red-500 mr-1">*</span>
                确认密码
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors placeholder:text-gray-400"
                placeholder="确认密码"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500 mr-1">*</span>
                性别
              </label>
              <div className="flex gap-8">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={formData.gender === 1}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2">男</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="2"
                    checked={formData.gender === 2}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2">女</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-500/80 transition-colors duration-200 text-lg font-medium"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  );
}
