// src/components/common/LoadingSpinner.jsx

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingSpinner = ({ size = 'large', color = '#22c55e', overlay = false }) => {
  if (overlay) {
    return (
      <View className="absolute inset-0 bg-black/50 flex-1 items-center justify-center z-50">
        <View className="bg-white rounded-2xl p-6 items-center">
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    );
  }

   return (
    <LinearGradient
      colors={['#f0fdf4', '#dcfce7']}
      className="flex-1 items-center justify-center"
    >
      <ActivityIndicator size={size} color={color} />
    </LinearGradient>
  );
};

export default LoadingSpinner;