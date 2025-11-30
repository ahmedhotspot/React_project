export type Tokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type LoginPayload = {
  email?: string;
  iqama?: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
