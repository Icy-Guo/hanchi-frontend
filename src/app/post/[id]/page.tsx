'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

interface PostDetail {
  id: number;
  post_id: string;
  title: string;
  content: string;
  author_id: string;
  author_name?: string;
  community_id: number;
  community?: {
    community_id: number;
    community_name: string;
  };
  vote_num?: number;
  create_time: string;
  update_time: string;
  status: number;
}

// 格式化时间的辅助函数
function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) {
    return '未知时间';
  }

  try {
    // 直接使用Date对象解析ISO格式的时间字符串
    const date = new Date(dateStr);

    // 格式化输出
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('时间格式化错误:', error, '原始时间字符串:', dateStr);
    return '时间格式错误';
  }
}

export default function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (!userData) {
          throw new Error('请先登录');
        }
        const { accessToken } = JSON.parse(userData);

        const response = await fetch(
          `http://localhost:8081/api/v1/post/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('获取帖子失败');
        }

        const data = await response.json();
        // 打印完整的响应数据
        console.log('完整的响应数据:', data);
        console.log('data字段:', data.data);
        if (data.data) {
          console.log('帖子ID:', data.data.post_id);
          console.log('帖子标题:', data.data.title);
          console.log('创建时间:', data.data.create_time);
          Object.keys(data.data).forEach((key) => {
            console.log(`${key}:`, data.data[key]);
          });
        }
        setPost(data.data);
      } catch (error) {
        console.error('获取帖子失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center text-gray-500">加载中...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center text-gray-500">
              帖子不存在或已被删除
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {post.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-600"
            >
              <ThumbsUp className="mr-1 h-3 w-3" />
              {post.vote_num || 0}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>作者ID：{post.author_id}</span>
            <span>分区：{post.community_id}</span>
            <span>发布时间：{formatDate(post.create_time)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: mdParser.render(post.content),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
