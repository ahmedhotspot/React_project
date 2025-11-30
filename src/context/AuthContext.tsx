import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginPayload, Tokens, User} from '../types/auth.models';
import {AuthService} from '../services/api/auth';

type AuthContextValue = {
  user: User | null;
  tokens: Tokens | null;
  isLoading: boolean;
  isOnboardingCompleted: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  user: '@hotspot/user',
  tokens: '@hotspot/tokens',
  onboarding: '@hotspot/onboarding-complete',
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [[, storedUser], [, storedTokens], [, onboardingFlag]] =
          await AsyncStorage.multiGet([
            STORAGE_KEYS.user,
            STORAGE_KEYS.tokens,
            STORAGE_KEYS.onboarding,
          ]);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedTokens) {
          setTokens(JSON.parse(storedTokens));
        }
        setIsOnboardingCompleted(onboardingFlag === 'true');
      } catch (error) {
        console.warn('Failed to restore session', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const persistSession = useCallback(
    async (nextUser: User, nextTokens: Tokens) => {
      setUser(nextUser);
      setTokens(nextTokens);

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.user, JSON.stringify(nextUser)],
        [STORAGE_KEYS.tokens, JSON.stringify(nextTokens)],
      ]);
    },
    [],
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      const result = await AuthService.login(payload);
      await persistSession(result.user, result.tokens);
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    setUser(null);
    setTokens(null);
    await AsyncStorage.multiRemove([STORAGE_KEYS.user, STORAGE_KEYS.tokens]);
  }, []);

  const completeOnboarding = useCallback(async () => {
    setIsOnboardingCompleted(true);
    await AsyncStorage.setItem(STORAGE_KEYS.onboarding, 'true');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      tokens,
      isLoading,
      isOnboardingCompleted,
      login,
      logout,
      completeOnboarding,
    }),
    [
      completeOnboarding,
      isLoading,
      isOnboardingCompleted,
      login,
      logout,
      tokens,
      user,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

