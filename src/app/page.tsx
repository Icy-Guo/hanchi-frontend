import { LeftSidebar } from '@/components/home/LeftSidebar';
import { PostList } from '@/components/home/PostList';
import { RightSidebar } from '@/components/home/RightSidebar';
import {
  getCommunities,
  getSiteStats,
  getPosts,
  getTrendingRepos,
  getGolangRepos,
} from '@/lib/api';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const page = searchParams?.page ? Number(await searchParams.page) : 1;
  const communities = await getCommunities();
  const stats = getSiteStats();
  const postsData = await getPosts(page);
  const trendingRepos = await getTrendingRepos();
  const golangRepos = await getGolangRepos();

  return (
    <div className="w-full">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 左侧信息栏 - 20% */}
          <div className="md:col-span-1">
            <LeftSidebar communities={communities} stats={stats} />
          </div>

          {/* 中间内容区域 - 60% */}
          <div className="md:col-span-2">
            <PostList
              posts={postsData?.data?.list || null}
              total={postsData?.data?.page?.total || 0}
              currentPage={page}
            />
          </div>

          {/* 右侧边栏 - 20% */}
          <div className="md:col-span-1">
            <RightSidebar
              trendingRepos={trendingRepos}
              golangRepos={golangRepos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
