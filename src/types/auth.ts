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
  name: string;
  username: string;
  role: string;
  phone: string;
  address: string;
  paid: number;
  totalCost: number;
  debt: number;
  avatarUrl?: string;
  totalReceivedQuantity: number;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};
