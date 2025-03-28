import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Hash } from 'lucide-react';
import { Community } from '@/types';
import Link from 'next/link';

interface LeftSidebarProps {
  communities: Community[];
  stats: {
    visitorCount: number;
    runningTime: string;
  };
}

export function LeftSidebar({ communities, stats }: LeftSidebarProps) {
  return (
    <div className="space-y-6 w-full">
      {/* 网站统计信息 */}
      <Card className="bg-white/50 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            网站信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">
              访问人数：
              <span className="font-medium">{stats.visitorCount}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">
              运行时间：<span className="font-medium">{stats.runningTime}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 分区列表 */}
      <Card className="bg-white/50 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            分区导航
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {communities.map((community) => (
              <Link
                key={community.community_id}
                href={`/community/${community.community_id}`}
                className="w-full"
              >
                <div className="rounded-lg border p-3 transition-all hover:border-orange-500 hover:bg-orange-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Hash className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 hover:text-orange-500 truncate">
                        {community.community_name}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-600 flex-shrink-0 ml-2"
                    >
                      {community.introduction?.length || 0} 篇
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
