import {LoginPayload, Tokens, User} from '../../types/auth.models';

type LoginResponse = {
  tokens: Tokens;
  user: User;
};

export const AuthService = {
  // TODO: Replace mock with real API integration
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          tokens: {
            access_token: 'mock-access-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
          },
          user: {
            id: payload.email ?? 'guest',
            name: 'Hotspot User',
            email: payload.email ?? 'user@hotspot.co',
          },
        });
      }, 800);
    });
  },
};

