// src/screens/player/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import RoadmapStepper from '../../components/ui/RoadmapStepper';
import Button from '../../components/common/Button';
import { fetchUserProfile, logoutUser } from '../../store/slices/authSlice';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [userStats, setUserStats] = useState({
    videosUploaded: 12,
    averageScore: 78,
    contestsWon: 3,
    currentRank: 25,
    achievements: [
      { name: 'First Upload', icon: 'videocam', date: '2024-01-15' },
      { name: 'Score Master', icon: 'trophy', date: '2024-02-01' },
      { name: 'Consistent Player', icon: 'medal', date: '2024-02-15' }
    ],
    recentVideos: [
      { id: 1, sport: 'Cricket', score: 85, date: '2024-03-01', thumbnail: null },
      { id: 2, sport: 'Football', score: 72, date: '2024-02-28', thumbnail: null },
      { id: 3, sport: 'Basketball', score: 90, date: '2024-02-25', thumbnail: null }
    ]
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const tabs = [
    { id: 'roadmap', label: 'Journey', icon: 'map' },
    { id: 'videos', label: 'Videos', icon: 'videocam' },
    { id: 'achievements', label: 'Achievements', icon: 'trophy' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roadmap':
        return <RoadmapStepper currentStep={2} />;
      
      case 'videos':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Recent Videos
            </Text>
            {userStats.recentVideos.map((video) => (
              <View key={video.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                      {video.sport} Performance
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {new Date(video.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="items-end">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={16} color="#f97316" />
                      <Text className="text-gray-900 font-bold text-lg ml-1">
                        {video.score}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'achievements':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Achievements
            </Text>
            {userStats.achievements.map((achievement, index) => (
              <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <View className="flex-row items-center">
                  <View className="bg-yellow-100 rounded-full p-3 mr-4">
                    <Ionicons name={achievement.icon} size={20} color="#f59e0b" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                      {achievement.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          className="px-4 pt-12 pb-6"
        >
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity
              onPress={() => {}} // Edit profile
              className="bg-white/20 rounded-full p-2"
            >
              <Ionicons name="create-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="items-center">
            <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4">
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} className="w-full h-full rounded-full" />
              ) : (
                <Text className="text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </Text>
              )}
            </View>
            <Text className="text-white text-xl font-bold mb-1">
              {user?.name || 'User Name'}
            </Text>
            <Text className="text-white/90 text-sm mb-4">
              {user?.email || 'user@example.com'}
            </Text>
            
            {/* Quick Stats */}
            <View className="flex-row space-x-6">
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">
                  {userStats.videosUploaded}
                </Text>
                <Text className="text-white/80 text-xs">Videos</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">
                  {userStats.averageScore}
                </Text>
                <Text className="text-white/80 text-xs">Avg Score</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">
                  #{userStats.currentRank}
                </Text>
                <Text className="text-white/80 text-xs">Rank</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Tabs */}
        <View className="bg-white px-4 py-4 shadow-sm">
          <View className="flex-row justify-between">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-1 items-center py-3 mx-1 rounded-xl ${
                  activeTab === tab.id ? 'bg-primary-100' : 'bg-gray-50'
                }`}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={activeTab === tab.id ? '#22c55e' : '#6b7280'}
                />
                <Text
                  className={`mt-1 font-medium text-sm ${
                    activeTab === tab.id ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tab Content */}
        <View className="flex-1 py-6">
          {renderTabContent()}
        </View>

        {/* Settings */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Settings
          </Text>
          <View className="bg-white rounded-2xl shadow-sm">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="person-circle-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 font-medium ml-3">Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 font-medium ml-3">Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 font-medium ml-3">Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center p-4"
            >
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text className="text-red-500 font-medium ml-3">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;