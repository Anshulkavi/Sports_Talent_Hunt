// src/screens/player/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import { fetchUserStats } from '../../store/slices/userSlice';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { stats, loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserStats());
    setRefreshing(false);
  };

  const quickStats = [
    { label: 'Videos Uploaded', value: stats?.totalVideos || 0, icon: 'videocam', color: 'primary' },
    { label: 'Average Score', value: stats?.averageScore || 0, icon: 'trophy', color: 'secondary' },
    { label: 'Contests Joined', value: stats?.contestsJoined || 0, icon: 'flag', color: 'blue' },
    { label: 'Current Rank', value: stats?.currentRank || 'N/A', icon: 'trending-up', color: 'purple' }
  ];

  const recentActivities = [
    { title: 'Video Analysis Complete', subtitle: 'Cricket Bowling Technique - Score: 85/100', time: '2h ago', icon: 'analytics' },
    { title: 'Contest Entry Submitted', subtitle: 'Under-18 Football Challenge', time: '1d ago', icon: 'trophy' },
    { title: 'New Achievement Unlocked', subtitle: 'Consistency Master - 10 uploads', time: '3d ago', icon: 'medal' }
  ];

  return (
    <SafeAreaWrapper>
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-white px-4 py-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-gray-600 text-sm">Welcome back,</Text>
              <Text className="text-gray-900 text-xl font-bold">{user?.name || 'Athlete'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              className="bg-gray-100 rounded-full p-3"
            >
              <Ionicons name="notifications-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload CTA */}
        <View className="px-4 mb-6">
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            className="rounded-2xl p-6"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-2">
                  Ready for Analysis?
                </Text>
                <Text className="text-white/90 text-sm mb-4">
                  Upload your latest performance video and get instant AI feedback
                </Text>
                <Button
                  title="Upload Video"
                  variant="ghost"
                  onPress={() => navigation.navigate('Upload')}
                  className="bg-white/20 self-start"
                  icon={<Ionicons name="videocam" size={20} color="white" />}
                />
              </View>
              <View className="bg-white/20 rounded-full p-4">
                <Ionicons name="cloud-upload" size={32} color="white" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Journey Progress */}
        <View className="px-4 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-gray-900 font-bold text-lg mb-4">Your Journey Progress</Text>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Current Stage: AI Analysis</Text>
              <Text className="text-primary-600 font-semibold">Step 2/6</Text>
            </View>
            <ProgressBar progress={33} className="mb-3" />
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              className="flex-row items-center justify-center py-2"
            >
              <Text className="text-primary-600 font-medium mr-1">View Full Roadmap</Text>
              <Ionicons name="arrow-forward" size={16} color="#22c55e" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="px-4 mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">Performance Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            {quickStats.map((stat, index) => (
              <View key={index} className="bg-white rounded-xl p-4 shadow-sm w-[48%] mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Ionicons name={stat.icon} size={20} color="#22c55e" />
                  <Text className="text-2xl font-bold text-gray-900">{stat.value}</Text>
                </View>
                <Text className="text-gray-600 text-sm">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">Recent Activity</Text>
          <View className="bg-white rounded-2xl shadow-sm">
            {recentActivities.map((activity, index) => (
              <View key={index} className={`p-4 ${index !== recentActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <View className="flex-row items-start">
                  <View className="bg-primary-100 rounded-full p-2 mr-3">
                    <Ionicons name={activity.icon} size={16} color="#22c55e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-sm mb-1">
                      {activity.title}
                    </Text>
                    <Text className="text-gray-600 text-xs mb-2">
                      {activity.subtitle}
                    </Text>
                    <Text className="text-gray-400 text-xs">{activity.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-8">
          <Text className="text-gray-900 font-bold text-lg mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => navigation.navigate('Contests')}
              className="bg-white rounded-xl p-4 shadow-sm flex-1 mr-2 items-center"
            >
              <Ionicons name="trophy" size={24} color="#f97316" />
              <Text className="text-gray-900 font-medium text-sm mt-2">Contests</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Community')}
              className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1 items-center"
            >
              <Ionicons name="people" size={24} color="#3b82f6" />
              <Text className="text-gray-900 font-medium text-sm mt-2">Community</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              className="bg-white rounded-xl p-4 shadow-sm flex-1 ml-2 items-center"
            >
              <Ionicons name="person" size={24} color="#8b5cf6" />
              <Text className="text-gray-900 font-medium text-sm mt-2">Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;