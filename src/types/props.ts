import { Community, Post, GitHubRepo } from '@/types/index';

export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface LeftSidebarProps {
  communities: Community[];
  stats: {
    visitorCount: number;
    runningTime: string;
  };
}

export interface PostListProps {
  posts: Post[] | null;
  total: number;
  currentPage: number;
}

export interface RightSidebarProps {
  trendingRepos: GitHubRepo[];
  golangRepos: GitHubRepo[];
}
