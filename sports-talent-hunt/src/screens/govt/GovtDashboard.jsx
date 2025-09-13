// src/screens/govt/GovtDashboard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';

const GovtDashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    pendingVerifications: 45,
    verifiedPlayers: 1234,
    activeCertificates: 567,
    monthlyApplications: 123
  });

  const [recentApplications] = useState([
    {
      id: 1,
      playerName: 'Rahul Sharma',
      sport: 'Cricket',
      score: 89,
      location: 'Mumbai',
      submittedDate: '2024-03-01',
      status: 'pending'
    },
    {
      id: 2,
      playerName: 'Priya Patel',
      sport: 'Basketball',
      score: 92,
      location: 'Delhi',
      submittedDate: '2024-02-28',
      status: 'pending'
    },
    {
      id: 3,
      playerName: 'Arjun Singh',
      sport: 'Football',
      score: 85,
      location: 'Bangalore',
      submittedDate: '2024-02-27',
      status: 'pending'
    }
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    {
      title: 'Verify Applications',
      icon: 'checkmark-circle',
      color: 'primary',
      count: stats.pendingVerifications,
      screen: 'Verification'
    },
    {
      title: 'Issue Certificates',
      icon: 'medal',
      color: 'secondary',
      count: stats.activeCertificates,
      screen: 'Certificates'
    },
    {
      title: 'Manage Programs',
      icon: 'library',
      color: 'blue',
      count: 8,
      screen: 'Programs'
    },
    {
      title: 'View Reports',
      icon: 'analytics',
      color: 'purple',
      count: 12,
      screen: 'Reports'
    }
  ];

  return (
    <SafeAreaWrapper>
      <Header 
        title="Government Dashboard" 
        subtitle="Sports Authority Portal"
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
            colors={['#8b5cf6', '#7c3aed']}
            className="rounded-2xl p-6 mb-6"
          >
            <Text className="text-white text-2xl font-bold mb-2">
              Monthly Overview
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-white text-3xl font-bold">
                  {stats.pendingVerifications}
                </Text>
                <Text className="text-white/80 text-sm">Pending</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-3xl font-bold">
                  {stats.verifiedPlayers}
                </Text>
                <Text className="text-white/80 text-sm">Verified</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-3xl font-bold">
                  {stats.activeCertificates}
                </Text>
                <Text className="text-white/80 text-sm">Certificates</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions */}
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between mb-6">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.screen)}
                className="bg-white rounded-2xl p-4 shadow-sm w-[48%] mb-3"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Ionicons name={action.icon} size={24} color="#8b5cf6" />
                  {action.count > 0 && (
                    <View className="bg-red-500 rounded-full px-2 py-1">
                      <Text className="text-white text-xs font-bold">
                        {action.count}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-900 font-semibold text-sm">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Applications */}
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Recent Applications
          </Text>
          <View className="bg-white rounded-2xl shadow-sm">
            {recentApplications.map((app, index) => (
              <TouchableOpacity
                key={app.id}
                className={`p-4 ${index !== recentApplications.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                      {app.playerName}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {app.sport} • Score: {app.score} • {app.location}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                      Submitted: {new Date(app.submittedDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="items-center">
                    <View className="bg-orange-100 rounded-full px-3 py-1">
                      <Text className="text-orange-600 text-xs font-medium">
                        {app.status}
                      </Text>
                    </View>
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

export default GovtDashboard;