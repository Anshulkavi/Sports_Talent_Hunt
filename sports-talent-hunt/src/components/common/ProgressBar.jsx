// src/components/common/ProgressBar.jsx

import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({ progress = 0, height = 8, color = ['#22c55e', '#16a34a'] }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View 
      className="bg-gray-200 rounded-full overflow-hidden"
      style={{ height }}
    >
      <Animated.View style={{ width }}>
        <LinearGradient
          colors={color}
          className="h-full rounded-full"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

export default ProgressBar;
