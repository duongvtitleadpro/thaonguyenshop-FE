export type SignUpBody = {
  username: string;
  password: string;
};

export type SignInBody = SignUpBody;

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type SignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: number;
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
};
