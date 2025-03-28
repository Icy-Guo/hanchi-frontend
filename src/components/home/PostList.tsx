'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThumbsUp } from 'lucide-react';

interface PostListProps {
  posts: Post[] | null;
  total: number;
  currentPage: number;
}

export function PostList({ posts, total, currentPage }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / 5); // 每页5条

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
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
                <Link
                  key={post.post_id}
                  href={`/post/${post.post_id}`}
                  className="block group w-full"
                >
                  <div className="rounded-lg border p-4 transition-all hover:border-orange-500 hover:bg-orange-50 w-full">
                    <div className="flex items-start justify-between w-full">
                      <div className="space-y-2 flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-500 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                          <span>作者：{post.author_name}</span>
                          <span>分区：{post.community.community_name}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-600"
                        >
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          {post.vote_num}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">暂无帖子</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 分页 */}
      {posts && posts.length > 0 && (
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
          </div>
        </div>
      )}
    </div>
  );
}
