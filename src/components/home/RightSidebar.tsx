'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Code, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RightSidebarProps } from '@/types/props';

export function RightSidebar({
  trendingRepos,
  golangRepos,
}: RightSidebarProps) {
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllGolang, setShowAllGolang] = useState(false);

  const displayedTrendingRepos = showAllTrending
    ? trendingRepos
    : trendingRepos.slice(0, 3);
  const displayedGolangRepos = showAllGolang
    ? golangRepos
    : golangRepos.slice(0, 3);

  return (
    <div className="space-y-6 w-full">
      {/* GitHub 趋势榜 */}
      <Card className="bg-white/50 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            GitHub 趋势榜（2025）
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-4">
            {displayedTrendingRepos.map((repo, index) => (
              <Link
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group w-full"
              >
                <div className="rounded-lg border p-3 transition-all hover:border-orange-500 hover:bg-orange-50 w-full">
                  <div className="flex items-start space-x-3 w-full">
                    <Image
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      width={24}
                      height={24}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-orange-500 truncate">
                        {repo.full_name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 flex-wrap">
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="mr-1 h-3 w-3" />
                          {repo.stargazers_count}
                        </div>
                        {repo.language && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Code className="mr-1 h-3 w-3" />
                            {repo.language}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-600 flex-shrink-0"
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
            {trendingRepos.length > 3 && (
              <Button
                variant="ghost"
                className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                onClick={() => setShowAllTrending(!showAllTrending)}
              >
                <ChevronDown
                  className={`h-4 w-4 mr-2 transition-transform ${
                    showAllTrending ? 'rotate-180' : ''
                  }`}
                />
                {showAllTrending ? '收起' : '显示更多'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Golang 热门项目 */}
      <Card className="bg-white/50 backdrop-blur-sm w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Golang 热门项目（历史最受关注）
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-4">
            {displayedGolangRepos.map((repo, index) => (
              <Link
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group w-full"
              >
                <div className="rounded-lg border p-3 transition-all hover:border-orange-500 hover:bg-orange-50 w-full">
                  <div className="flex items-start space-x-3 w-full">
                    <Image
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      width={24}
                      height={24}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-orange-500 truncate">
                        {repo.full_name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 flex-wrap">
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="mr-1 h-3 w-3" />
                          {repo.stargazers_count}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-600 flex-shrink-0"
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
            {golangRepos.length > 3 && (
              <Button
                variant="ghost"
                className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                onClick={() => setShowAllGolang(!showAllGolang)}
              >
                <ChevronDown
                  className={`h-4 w-4 mr-2 transition-transform ${
                    showAllGolang ? 'rotate-180' : ''
                  }`}
                />
                {showAllGolang ? '收起' : '显示更多'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
