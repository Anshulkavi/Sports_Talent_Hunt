// src/navigation/GovtNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder screens for government official role
const GovtHomeScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="shield-checkmark" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Government Dashboard</Text>
    <Text className="text-gray-600 text-center mt-2">
      Verify talent and manage sports programs
    </Text>
  </View>
);

const VerificationScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Talent Verification</Text>
    <Text className="text-gray-600 text-center mt-2">
      Review and verify player performances
    </Text>
  </View>
);

const CertificatesScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="medal" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Certificates</Text>
    <Text className="text-gray-600 text-center mt-2">
      Issue official sports certificates
    </Text>
  </View>
);

const ProgramsScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <Ionicons name="library" size={64} color="#22c55e" />
    <Text className="text-xl font-bold text-gray-900 mt-4">Sports Programs</Text>
    <Text className="text-gray-600 text-center mt-2">
      Manage government sports initiatives
    </Text>
  </View>
);

const GovtNavigator = () => {
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
            case 'Verification':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
            case 'Certificates':
              iconName = focused ? 'medal' : 'medal-outline';
              break;
            case 'Programs':
              iconName = focused ? 'library' : 'library-outline';
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
      <Tab.Screen name="Dashboard" component={GovtHomeScreen} />
      <Tab.Screen name="Verification" component={VerificationScreen} />
      <Tab.Screen name="Certificates" component={CertificatesScreen} />
      <Tab.Screen name="Programs" component={ProgramsScreen} />
    </Tab.Navigator>
  );
};

export default GovtNavigator;