'use client';

import { useState } from 'react';
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
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();
const Editor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export default function PublishPage() {
  const router = useRouter();
  const [communityId, setCommunityId] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (
    file: File
  ): Promise<{ url: string; alt: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const userData = localStorage.getItem('userData');
      if (!userData) {
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
      return {
        url: data.url,
        alt: file.name,
      };
    } catch (error) {
      console.error('图片上传失败:', error);
      throw new Error('图片上传失败');
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const userData = localStorage.getItem('userData');
      if (!userData) {
        alert('请先登录');
        router.push('/login');
        return;
      }

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

      alert('发布成功！');
      router.push('/');
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败，请重试');
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
            <SelectItem value="1">Go社区</SelectItem>
            <SelectItem value="2">Python社区</SelectItem>
            <SelectItem value="3">Java社区</SelectItem>
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
            className="bg-orange-500 hover:bg-orange-600"
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
