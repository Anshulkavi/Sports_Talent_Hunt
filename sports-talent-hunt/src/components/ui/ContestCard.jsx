// src/components/ui/ContestCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ContestCard = ({ contest, onPress, onEnter }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return ['#22c55e', '#16a34a'];
      case 'upcoming': return ['#3b82f6', '#2563eb'];
      case 'ended': return ['#6b7280', '#4b5563'];
      default: return ['#22c55e', '#16a34a'];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active Now';
      case 'upcoming': return 'Coming Soon';
      case 'ended': return 'Ended';
      default: return status;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} className="mb-4">
      <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <LinearGradient
          colors={getStatusColor(contest.status)}
          className="h-32 justify-end p-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-lg font-bold mb-1">
                {contest.title}
              </Text>
              <Text className="text-white/90 text-sm">
                {contest.sport} • {contest.category}
              </Text>
            </View>
            <View className="bg-white/20 rounded-full px-3 py-1">
              <Text className="text-white text-xs font-medium">
                {getStatusText(contest.status)}
              </Text>
            </View>
          </View>
        </LinearGradient>
        
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#6b7280" />
              <Text className="text-gray-600 text-sm ml-2">
                {new Date(contest.deadline).toLocaleDateString()}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={16} color="#6b7280" />
              <Text className="text-gray-600 text-sm ml-2">
                {contest.participants} participants
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="trophy-outline" size={16} color="#f97316" />
              <Text className="text-gray-900 font-semibold text-sm ml-2">
                {contest.prize}
              </Text>
            </View>
            
            {contest.status === 'active' && onEnter && (
              <TouchableOpacity
                onPress={onEnter}
                className="bg-primary-500 rounded-full px-4 py-2"
              >
                <Text className="text-white font-medium text-sm">Enter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContestCard;