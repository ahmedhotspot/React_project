import React, {useMemo} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {LocalizationProvider} from './context/LocalizationContext';
import {ThemeProvider, useTheme} from './context/ThemeContext';
import {AuthProvider} from './context/AuthContext';
import {MainNavigator} from './navigation/MainNavigator';
import './i18n';

const ThemedNavigation: React.FC = () => {
  const {theme} = useTheme();

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.primary,
        background: theme.primaryBg,
        card: theme.tabNavBg,
        text: theme.primaryText,
        border: theme.applicationCardBorder,
        notification: theme.primary,
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <LocalizationProvider>
          <ThemeProvider>
            <AuthProvider>
              <ThemedNavigation />
            </AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

