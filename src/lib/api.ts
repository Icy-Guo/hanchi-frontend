import axios from 'axios';
import { Community, PostListResponse, GitHubRepo } from '@/types';

const API_BASE_URL = 'http://localhost:8081/api/v1';
const GITHUB_API_URL = 'https://api.github.com';

// 创建 GitHub API 客户端
const githubClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export async function getCommunities(): Promise<Community[]> {
  const response = await axios.get(`${API_BASE_URL}/community`);
  return response.data.data;
}

export async function getPosts(
  size: number = 5,
  page: number = 1
): Promise<PostListResponse> {
  const response = await axios.get(`${API_BASE_URL}/posts2`, {
    params: {
      size,
      page,
      order: 'time',
    },
  });
  return response.data;
}

// 模拟数据，实际项目中应该从后端获取
export function getSiteStats() {
  return {
    visitorCount: 1127,
    runningTime: '30天',
  };
}

export async function getTrendingRepos(): Promise<GitHubRepo[]> {
  const response = await githubClient.get('/search/repositories', {
    params: {
      q: 'created:>2024-01-01',
      sort: 'stars',
      order: 'desc',
      per_page: 5,
    },
  });
  return response.data.items;
}

export async function getGolangRepos(): Promise<GitHubRepo[]> {
  const response = await githubClient.get('/search/repositories', {
    params: {
      q: 'language:go',
      sort: 'stars',
      order: 'desc',
      per_page: 5,
    },
  });
  return response.data.items;
}
