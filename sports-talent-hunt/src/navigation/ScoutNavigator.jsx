// src/navigation/ScoutNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import CommunityScreen from '../screens/common/CommunityScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens for scout role
const ScoutHomeScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="search" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Scout Dashboard</Text>
    <Text className="text-gray-600 text-center mt-2">
      Discover and evaluate talented players
    </Text>
  </View>
);

const TalentSearchScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="search-circle" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Talent Search</Text>
    <Text className="text-gray-600 text-center mt-2">
      Find players based on performance metrics
    </Text>
  </View>
);

const EvaluationsScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="clipboard" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Evaluations</Text>
    <Text className="text-gray-600 text-center mt-2">
      Review and rate player performances
    </Text>
  </View>
);

const ScoutProfileScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="person" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Scout Profile</Text>
    <Text className="text-gray-600 text-center mt-2">
      Manage your scouting profile
    </Text>
  </View>
);

const ScoutNavigator = () => {
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
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Evaluations':
              iconName = focused ? 'clipboard' : 'clipboard-outline';
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
      <Tab.Screen name="Dashboard" component={ScoutHomeScreen} />
      <Tab.Screen name="Search" component={TalentSearchScreen} />
      <Tab.Screen name="Evaluations" component={EvaluationsScreen} />
      <Tab.Screen name="Profile" component={ScoutProfileScreen} />
    </Tab.Navigator>
  );
};

export default ScoutNavigator;