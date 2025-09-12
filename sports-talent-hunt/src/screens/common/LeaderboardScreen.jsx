// src/screens/common/LeaderboardScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import LeaderboardItem from '../../components/ui/LeaderboardItem';

const LeaderboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('overall');
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock leaderboard data
  const [leaderboardData, setLeaderboardData] = useState({
    overall: [
      { id: 1, name: 'Rahul Sharma', sport: 'Cricket', location: 'Mumbai', score: 95, avatar: null, change: 2 },
      { id: 2, name: 'Priya Patel', sport: 'Basketball', location: 'Delhi', score: 92, avatar: null, change: -1 },
      { id: 3, name: 'Arjun Singh', sport: 'Football', location: 'Bangalore', score: 89, avatar: null, change: 1 },
      { id: 4, name: 'Sneha Reddy', sport: 'Tennis', location: 'Hyderabad', score: 87, avatar: null, change: 0 },
      { id: 5, name: 'Vikram Kumar', sport: 'Athletics', location: 'Chennai', score: 85, avatar: null, change: 3 }
    ],
    cricket: [
      { id: 1, name: 'Rahul Sharma', sport: 'Cricket', location: 'Mumbai', score: 95, avatar: null, change: 1 },
      { id: 6, name: 'Rohit Gupta', sport: 'Cricket', location: 'Pune', score: 88, avatar: null, change: 0 },
      { id: 7, name: 'Sachin More', sport: 'Cricket', location: 'Nashik', score: 84, avatar: null, change: 2 }
    ],
    football: [
      { id: 3, name: 'Arjun Singh', sport: 'Football', location: 'Bangalore', score: 89, avatar: null, change: 1 },
      { id: 8, name: 'Kiran Joshi', sport: 'Football', location: 'Goa', score: 82, avatar: null, change: -1 },
      { id: 9, name: 'Suresh Nair', sport: 'Football', location: 'Kerala', score: 79, avatar: null, change: 3 }
    ]
  });

  const filters = [
    { id: 'overall', label: 'Overall', icon: 'trophy' },
    { id: 'cricket', label: 'Cricket', icon: 'fitness' },
    { id: 'football', label: 'Football', icon: 'football' },
    { id: 'basketball', label: 'Basketball', icon: 'basketball' },
    { id: 'tennis', label: 'Tennis', icon: 'tennisball' }
  ];

  const timeFilters = [
    { id: 'all', label: 'All Time' },
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' }
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getCurrentRankings = () => {
    return leaderboardData[activeFilter] || leaderboardData.overall;
  };

  return (
    <SafeAreaWrapper>
      <Header 
        title="Leaderboard" 
        subtitle="Top performers nationwide"
      />

      {/* Sport Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4 bg-white"
      >
        <View className="flex-row space-x-3">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full flex-row items-center ${
                activeFilter === filter.id
                  ? 'bg-primary-500'
                  : 'bg-gray-100'
              }`}
            >
              <Ionicons
                name={filter.icon}
                size={16}
                color={activeFilter === filter.id ? 'white' : '#6b7280'}
              />
              <Text
                className={`ml-2 font-medium ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Time Filters */}
      <View className="px-4 pb-4 bg-white">
        <View className="flex-row justify-center space-x-2">
          {timeFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setTimeFilter(filter.id)}
              className={`px-3 py-1.5 rounded-lg ${
                timeFilter === filter.id
                  ? 'bg-secondary-100'
                  : 'bg-gray-50'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  timeFilter === filter.id
                    ? 'text-secondary-600'
                    : 'text-gray-600'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Rankings */}
      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Top 3 Podium */}
        {getCurrentRankings().slice(0, 3).length === 3 && (
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Top Performers</Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-end justify-center space-x-4">
                {/* Second Place */}
                <View className="items-center flex-1">
                  <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-2">
                    <Text className="text-gray-700 font-bold text-lg">
                      {getCurrentRankings()[1]?.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="bg-gray-400 w-8 h-16 rounded-t-lg items-center justify-start pt-2 mb-2">
                    <Text className="text-white font-bold text-xs">2</Text>
                  </View>
                  <Text className="text-gray-900 font-semibold text-sm text-center">
                    {getCurrentRankings()[1]?.name}
                  </Text>
                  <Text className="text-gray-600 text-xs">{getCurrentRankings()[1]?.score}</Text>
                </View>

                {/* First Place */}
                <View className="items-center flex-1">
                  <View className="w-20 h-20 bg-yellow-100 rounded-full items-center justify-center mb-2">
                    <Text className="text-yellow-600 font-bold text-xl">
                      {getCurrentRankings()[0]?.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="bg-yellow-500 w-10 h-20 rounded-t-lg items-center justify-start pt-2 mb-2">
                    <Ionicons name="crown" size={16} color="white" />
                  </View>
                  <Text className="text-gray-900 font-bold text-base text-center">
                    {getCurrentRankings()[0]?.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">{getCurrentRankings()[0]?.score}</Text>
                </View>

                {/* Third Place */}
                <View className="items-center flex-1">
                  <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-2">
                    <Text className="text-orange-600 font-bold text-lg">
                      {getCurrentRankings()[2]?.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="bg-orange-400 w-8 h-12 rounded-t-lg items-center justify-start pt-2 mb-2">
                    <Text className="text-white font-bold text-xs">3</Text>
                  </View>
                  <Text className="text-gray-900 font-semibold text-sm text-center">
                    {getCurrentRankings()[2]?.name}
                  </Text>
                  <Text className="text-gray-600 text-xs">{getCurrentRankings()[2]?.score}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Full Rankings */}
        <View className="mb-8">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            {activeFilter === 'overall' ? 'All Rankings' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Rankings`}
          </Text>
          {getCurrentRankings().map((player, index) => (
            <LeaderboardItem
              key={player.id}
              player={player}
              rank={index + 1}
              showMedals={index < 3}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LeaderboardScreen;