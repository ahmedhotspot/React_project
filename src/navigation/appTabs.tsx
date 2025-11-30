import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {AppTabParamList} from './types';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {ApplicationsScreen} from '../screens/Applications/ApplicationsScreen';
import {OffersScreen} from '../screens/Offers/OffersScreen';
import {TicketsScreen} from '../screens/Tickets/TicketsScreen';
import {ProfileScreen} from '../screens/Profile/ProfileScreen';
import {useTheme} from '../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppTabs: React.FC = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: theme.primary,
    tabBarInactiveTintColor: theme.disableText,
    tabBarStyle: {
      backgroundColor: theme.tabNavBg,
      borderTopColor: 'transparent',
      paddingTop: 4,
      paddingBottom: 8,
      height: 64,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600' as const,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home'),
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{
          title: t('applications'),
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <Icon name="layers" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          title: t('offers'),
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          title: t('my_tickets'),
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <Icon name="message-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('profile'),
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

