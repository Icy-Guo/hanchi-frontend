export interface LoginResponse {
  code: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user_id: string;
    user_name: string;
  };
}

export interface UserData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}
