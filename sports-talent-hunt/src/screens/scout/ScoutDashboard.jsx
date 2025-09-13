// src/screens/scout/ScoutDashboard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import PlayerCard from '../../components/ui/PlayerCard';

const ScoutDashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['all']);

  const [stats] = useState({
    playersWatched: 156,
    shortlisted: 23,
    recommended: 8,
    contacted: 12
  });

  const [topTalents] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      sport: 'Cricket',
      age: 17,
      location: 'Mumbai',
      score: 92,
      videos: 8,
      rank: 5,
      achievements: ['State Champion', 'Best Bowler 2023'],
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Patel',
      sport: 'Basketball',
      age: 19,
      location: 'Delhi',
      score: 89,
      videos: 12,
      rank: 8,
      achievements: ['Regional MVP', 'Top Scorer'],
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Arjun Singh',
      sport: 'Football',
      age: 16,
      location: 'Bangalore',
      score: 87,
      videos: 6,
      rank: 12,
      achievements: ['District Winner'],
      lastActive: '3 hours ago'
    }
  ]);

  const filters = [
    { id: 'all', label: 'All Sports', icon: 'fitness' },
    { id: 'cricket', label: 'Cricket', icon: 'fitness' },
    { id: 'football', label: 'Football', icon: 'football' },
    { id: 'basketball', label: 'Basketball', icon: 'basketball' },
    { id: 'high-potential', label: 'High Potential', icon: 'star' }
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handlePlayerMessage = (playerId) => {
    // Navigate to messaging or show contact modal
    console.log('Message player:', playerId);
  };

  return (
    <SafeAreaWrapper>
      <Header 
        title="Scout Dashboard" 
        subtitle="Talent Discovery"
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
            colors={['#3b82f6', '#2563eb']}
            className="rounded-2xl p-6 mb-6"
          >
            <Text className="text-white text-2xl font-bold mb-4">
              Scouting Overview
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.playersWatched}</Text>
                <Text className="text-white/80 text-sm">Watched</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.shortlisted}</Text>
                <Text className="text-white/80 text-sm">Shortlisted</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">{stats.contacted}</Text>
                <Text className="text-white/80 text-sm">Contacted</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Search Bar */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row items-center">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search players by name, sport, or location..."
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row space-x-3">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setSelectedFilters([filter.id])}
                  className={`px-4 py-2 rounded-full flex-row items-center ${
                    selectedFilters.includes(filter.id) ? 'bg-blue-500' : 'bg-gray-100'
                  }`}
                >
                  <Ionicons
                    name={filter.icon}
                    size={16}
                    color={selectedFilters.includes(filter.id) ? 'white' : '#6b7280'}
                  />
                  <Text className={`ml-2 font-medium ${
                    selectedFilters.includes(filter.id) ? 'text-white' : 'text-gray-600'
                  }`}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Top Talents */}
          <Text className="text-gray-900 font-bold text-lg mb-4">Top Talents</Text>
          {topTalents.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onPress={() => navigation.navigate('PlayerDetail', { playerId: player.id })}
              onMessage={() => handlePlayerMessage(player.id)}
            />
          ))}

          {/* Quick Actions */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="bg-white rounded-xl p-4 shadow-sm flex-1 mr-2 items-center"
            >
              <Ionicons name="search-circle" size={32} color="#3b82f6" />
              <Text className="text-gray-900 font-medium text-sm mt-2">Advanced Search</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Shortlist')}
              className="bg-white rounded-xl p-4 shadow-sm flex-1 ml-2 items-center"
            >
              <Ionicons name="bookmark" size={32} color="#f59e0b" />
              <Text className="text-gray-900 font-medium text-sm mt-2">My Shortlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ScoutDashboard;