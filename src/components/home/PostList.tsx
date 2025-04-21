'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThumbsUp, ThumbsDown, Flame } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface PostListProps {
  posts: Post[] | null;
  total: number;
  currentPage: number;
}

export function PostList({ posts, total, currentPage }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / 5); // 每页5条
  const [jumpPage, setJumpPage] = useState('');

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpPage);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      toast.error(`请输入1-${totalPages}之间的页码`);
      return;
    }
    handlePageChange(pageNum);
    setJumpPage('');
  };

  const handleVote = async (postId: string, direction: number) => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error('请先登录');
        router.push('/login');
        return;
      }

      const { accessToken } = JSON.parse(userData);

      const response = await fetch('http://localhost:8081/api/v1/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          post_id: postId,
          direction: direction,
        }),
      });

      const data = await response.json();

      if (data.code === 1000) {
        toast.success('投票成功');
      } else {
        switch (data.code) {
          case 1009:
            toast.error('请勿重复投票');
            break;
          case 1010:
            toast.error('投票时间已过');
            break;
          default:
            toast.error('投票失败，请重试');
        }
        return;
      }

      // 刷新页面以更新投票数
      router.refresh();
    } catch (error) {
      console.error('投票失败:', error);
      toast.error('投票失败，请重试');
    }
  };

  return (
    <div className="space-y-6">
      {/* 帖子列表 */}
      <Card className="bg-white/50 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            最新帖子
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.post_id}
                  className="rounded-lg border p-4 transition-all hover:border-orange-500 w-full"
                >
                  <div className="flex items-start justify-between w-full">
                    <Link
                      href={`/post/${post.post_id}`}
                      className="block group flex-1"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-500 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                          <span>作者：{post.author_name}</span>
                          <span>分区：{post.community.community_name}</span>
                          <span>发布时间：{formatDate(post.create_time)}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-600"
                      >
                        <Flame className="mr-1 h-3 w-3" />
                        {post.vote_num}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(post.post_id, 1);
                        }}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        赞同
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-600 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(post.post_id, -1);
                        }}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        反对
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">暂无帖子</div>
            )}
          </div>
        </CardContent>

        {/* 分页 - 移到卡片内部 */}
        {posts && posts.length > 0 && (
          <div className="px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">共 {total} 条帖子</div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  上一页
                </Button>
                <span className="text-sm text-gray-500">
                  第 {currentPage} 页 / 共 {totalPages} 页
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  下一页
                </Button>
                <div className="flex items-center space-x-2 ml-2">
                  <Input
                    type="number"
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    placeholder="页码"
                    className="w-18 h-8 text-sm"
                    min={1}
                    max={totalPages}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleJumpToPage}
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    跳转
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
