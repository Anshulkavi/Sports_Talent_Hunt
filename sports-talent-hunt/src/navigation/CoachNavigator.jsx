// src/navigation/CoachNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import CommunityScreen from '../screens/common/CommunityScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens for coach role
const CoachHomeScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="school" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Coach Dashboard</Text>
    <Text className="text-gray-600 text-center mt-2">
      Manage your players and training programs
    </Text>
  </View>
);

const PlayersScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="people" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">My Players</Text>
    <Text className="text-gray-600 text-center mt-2">
      Track player progress and performance
    </Text>
  </View>
);

const TrainingScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="fitness" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Training Plans</Text>
    <Text className="text-gray-600 text-center mt-2">
      Create and manage training programs
    </Text>
  </View>
);

const CoachProfileScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="person" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Coach Profile</Text>
    <Text className="text-gray-600 text-center mt-2">
      Manage your coaching profile
    </Text>
  </View>
);

const CoachNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Players':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Training':
              iconName = focused ? 'fitness' : 'fitness-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -5 },
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
      <Tab.Screen name="Dashboard" component={CoachHomeScreen} />
      <Tab.Screen name="Training" component={TrainingScreen} />
      <Tab.Screen name="Profile" component={CoachProfileScreen} />
    </Tab.Navigator>
  );
};

export default CoachNavigator;