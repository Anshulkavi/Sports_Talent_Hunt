// src/screens/coach/CoachDashboard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';

const CoachDashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalPlayers: 24,
    activeTraining: 8,
    completedSessions: 156,
    avgImprovement: 23
  });

  const [myPlayers] = useState([
    {
      id: 1,
      name: 'Arjun Kumar',
      sport: 'Cricket',
      level: 'Intermediate',
      lastSession: '2024-03-01',
      progress: 78,
      nextSession: '2024-03-03'
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      sport: 'Tennis',
      level: 'Advanced',
      lastSession: '2024-02-29',
      progress: 89,
      nextSession: '2024-03-02'
    },
    {
      id: 3,
      name: 'Rohit Sharma',
      sport: 'Football',
      level: 'Beginner',
      lastSession: '2024-02-28',
      progress: 65,
      nextSession: '2024-03-04'
    }
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    { title: 'My Players', icon: 'people', screen: 'Players', count: stats.totalPlayers },
    { title: 'Training Plans', icon: 'fitness', screen: 'Training', count: 12 },
    { title: 'Schedule', icon: 'calendar', screen: 'Schedule', count: 5 },
    { title: 'Progress Reports', icon: 'analytics', screen: 'Reports', count: 3 }
  ];

  return (
    <SafeAreaWrapper>
      <Header 
        title="Coach Dashboard" 
        subtitle="Training Management"
        showBack={false}
      />

      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        <View className="px-4 py-6">
          <LinearGradient
            colors={['#f97316', '#ea580c']}
            className="rounded-2xl p-6 mb-6"
          >
            <Text className="text-white text-2xl font-bold mb-4">
              Training Overview
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.totalPlayers}</Text>
                <Text className="text-white/80 text-sm">Players</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.activeTraining}</Text>
                <Text className="text-white/80 text-sm">Active</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.avgImprovement}%</Text>
                <Text className="text-white/80 text-sm">Avg Growth</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions */}
          <Text className="text-gray-900 font-bold text-lg mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between mb-6">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.screen)}
                className="bg-white rounded-2xl p-4 shadow-sm w-[48%] mb-3"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Ionicons name={action.icon} size={24} color="#f97316" />
                  {action.count > 0 && (
                    <View className="bg-orange-100 rounded-full px-2 py-1">
                      <Text className="text-orange-600 text-xs font-bold">{action.count}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-900 font-semibold text-sm">{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Players */}
          <Text className="text-gray-900 font-bold text-lg mb-4">My Players</Text>
          <View className="bg-white rounded-2xl shadow-sm">
            {myPlayers.map((player, index) => (
              <TouchableOpacity
                key={player.id}
                className={`p-4 ${index !== myPlayers.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-base">{player.name}</Text>
                    <Text className="text-gray-600 text-sm">
                      {player.sport} • {player.level}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                      Next: {new Date(player.nextSession).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="items-end">
                    <View className="bg-orange-100 rounded-full px-3 py-1 mb-2">
                      <Text className="text-orange-600 text-xs font-medium">
                        {player.progress}% Progress
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default CoachDashboard;