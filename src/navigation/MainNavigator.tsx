import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';
import {RootStackParamList} from './types';
import {OnboardingScreen} from '../screens/Onboarding/OnboardingScreen';
import {AuthStack} from './authStack';
import {AppTabs} from './appTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator: React.FC = () => {
  const {isLoading, isOnboardingCompleted, user} = useAuth();
  const {theme} = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.primaryBg,
        }}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isOnboardingCompleted && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      {isOnboardingCompleted && !user && (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
      {user && <Stack.Screen name="AppTabs" component={AppTabs} />}
    </Stack.Navigator>
  );
};

