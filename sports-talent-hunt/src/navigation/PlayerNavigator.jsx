// src/navigation/PlayerNavigator.jsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import HomeScreen from '../screens/player/HomeScreen';
import UploadScreen from '../screens/player/UploadScreen';
import AnalysisResultScreen from '../screens/player/AnalysisResultScreen';
import ProfileScreen from '../screens/player/ProfileScreen';
import ContestsScreen from '../screens/player/ContestsScreen';
import CommunityScreen from '../screens/common/CommunityScreen';
import LeaderboardScreen from '../screens/common/LeaderboardScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ name, color, size, focused }) => (
  <View className={`items-center justify-center ${focused ? 'transform scale-110' : ''}`}>
    <Ionicons name={name} size={size} color={color} />
    {focused && <View className="w-1 h-1 bg-primary-500 rounded-full mt-1" />}
  </View>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Upload" component={UploadScreen} />
    <Stack.Screen name="AnalysisResult" component={AnalysisResultScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const ContestsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ContestsMain" component={ContestsScreen} />
    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
  </Stack.Navigator>
);

const PlayerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Contests':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Community':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <TabIcon 
              name={iconName} 
              color={color} 
              size={size} 
              focused={focused} 
            />
          );
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Contests" 
        component={ContestsStack}
        options={{ tabBarLabel: 'Contests' }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{ tabBarLabel: 'Community' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default PlayerNavigator;