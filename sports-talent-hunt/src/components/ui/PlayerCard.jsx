// src/components/ui/PlayerCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlayerCard = ({ player, onPress, onMessage }) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-start">
        <View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center mr-4">
          {player.avatar ? (
            <Image source={{ uri: player.avatar }} className="w-full h-full rounded-full" />
          ) : (
            <Text className="text-primary-600 font-bold text-lg">
              {player.name.charAt(0)}
            </Text>
          )}
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-900 font-semibold text-base">
              {player.name}
            </Text>
            <View className="bg-primary-100 rounded-full px-2 py-1">
              <Text className="text-primary-600 text-xs font-medium">
                #{player.rank}
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-600 text-sm mb-2">
            {player.sport} • Age {player.age} • {player.location}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <Ionicons name="trophy" size={14} color="#f97316" />
                <Text className="text-gray-700 text-sm ml-1 font-medium">
                  {player.score}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="play-circle" size={14} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">
                  {player.videos} videos
                </Text>
              </View>
            </View>
            
            {onMessage && (
              <TouchableOpacity
                onPress={onMessage}
                className="bg-primary-50 rounded-full p-2"
              >
                <Ionicons name="chatbubble" size={16} color="#22c55e" />
              </TouchableOpacity>
            )}
          </View>
          
          {player.achievements && player.achievements.length > 0 && (
            <View className="flex-row flex-wrap mt-2">
              {player.achievements.slice(0, 3).map((achievement, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1">
                  <Text className="text-gray-600 text-xs">{achievement}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerCard;