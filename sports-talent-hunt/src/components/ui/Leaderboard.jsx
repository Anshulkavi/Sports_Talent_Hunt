// src/components/ui/LeaderboardItem.jsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LeaderboardItem = ({ player, rank, showMedals = true }) => {
  const getMedalColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return null;
    }
  };

  const getRankBadge = (rank) => {
    if (showMedals && rank <= 3) {
      return (
        <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: getMedalColor(rank) }}>
          <Ionicons name="medal" size={16} color="white" />
        </View>
      );
    }
    
    return (
      <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
        <Text className="text-gray-600 font-bold text-sm">#{rank}</Text>
      </View>
    );
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-2 shadow-sm flex-row items-center">
      {getRankBadge(rank)}
      
      <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center ml-3 mr-3">
        {player.avatar ? (
          <Image source={{ uri: player.avatar }} className="w-full h-full rounded-full" />
        ) : (
          <Text className="text-primary-600 font-bold">
            {player.name.charAt(0)}
          </Text>
        )}
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base">
          {player.name}
        </Text>
        <Text className="text-gray-600 text-sm">
          {player.sport} • {player.location}
        </Text>
      </View>
      
      <View className="items-end">
        <View className="flex-row items-center">
          <Ionicons name="trophy" size={16} color="#f97316" />
          <Text className="text-gray-900 font-bold text-lg ml-1">
            {player.score}
          </Text>
        </View>
        {player.change && (
          <View className={`flex-row items-center mt-1 ${player.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
            <Ionicons 
              name={player.change > 0 ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={player.change > 0 ? '#16a34a' : '#dc2626'} 
            />
            <Text className={`text-xs ml-1 ${player.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {Math.abs(player.change)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LeaderboardItem;