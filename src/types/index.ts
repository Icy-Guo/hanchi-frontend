export interface Community {
  community_id: number;
  community_name: string;
  introduction?: string;
  create_time?: string;
}

export interface SiteStats {
  visitorCount: number;
  runningTime: string;
}

export interface Post {
  post_id: string;
  author_id: number;
  community_id: number;
  status: number;
  title: string;
  content: string;
  community: Community;
  author_name: string;
  vote_num: number;
}

export interface PostListResponse {
  code: number;
  message: string;
  data: {
    page: {
      total: number;
      page: number;
      size: number;
    };
    list: Post[];
  };
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
