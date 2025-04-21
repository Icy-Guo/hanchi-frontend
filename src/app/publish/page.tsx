'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import 'react-markdown-editor-lite/lib/index.css';
import { Community } from '@/types/index';

// 配置markdown-it
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // 允许加载图片
  breaks: true,
});

const Editor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export default function PublishPage() {
  const router = useRouter();
  const [communityId, setCommunityId] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);

  // 获取社区列表
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/community');
        if (!response.ok) {
          throw new Error('获取社区列表失败');
        }
        const data = await response.json();
        if (data.code === 1000 && Array.isArray(data.data)) {
          setCommunities(data.data);
        }
      } catch (error) {
        console.error('获取社区列表失败:', error);
        toast.error('获取社区列表失败');
      }
    };

    fetchCommunities();
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error('请先登录');
        throw new Error('请先登录');
      }
      const { accessToken } = JSON.parse(userData);

      const response = await fetch('http://localhost:8081/api/v1/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      toast.success('图片上传成功');
      // 直接返回图片URL，编辑器会自动处理成Markdown格式
      return data.url;
    } catch (error) {
      console.error('图片上传失败:', error);
      toast.error('图片上传失败');
      throw new Error('图片上传失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error('请先登录');
        router.push('/login');
        return;
      }

      setIsSubmitting(true);
      const { accessToken } = JSON.parse(userData);

      const response = await fetch('http://localhost:8081/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          community_id: communityId,
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('发布失败');
      }

      toast.success('发布成功！');
      router.push('/');
    } catch (error) {
      console.error('发布失败:', error);
      toast.error('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-4">
      <div className="space-y-4">
        <Select
          onValueChange={(value: string) => setCommunityId(Number(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择社区" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {communities.map((community) => (
              <SelectItem
                key={community.community_id}
                value={community.community_id.toString()}
              >
                {community.community_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="请输入标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          style={{ height: '400px' }}
          value={content}
          onChange={({ text }: { text: string }) => setContent(text)}
          onImageUpload={handleImageUpload}
          renderHTML={(text) => mdParser.render(text)}
        />

        <div className="flex justify-end">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !content}
          >
            {isSubmitting ? '发布中...' : '发布'}
          </Button>
        </div>
      </div>
    </div>
  );
}
