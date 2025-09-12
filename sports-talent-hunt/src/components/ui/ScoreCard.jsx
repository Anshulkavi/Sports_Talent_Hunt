// src/components/ui/ScoreCard.jsx

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ScoreCard = ({ score, title, subtitle, icon = 'trophy' }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: score,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return ['#22c55e', '#16a34a']; // Green
    if (score >= 60) return ['#f97316', '#ea580c']; // Orange
    return ['#ef4444', '#dc2626']; // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleValue }] }}
      className="mx-4 mb-6"
    >
      <LinearGradient
        colors={getScoreColor(score)}
        className="rounded-2xl p-6 items-center"
      >
        <View className="bg-white/20 rounded-full p-4 mb-4">
          <Ionicons name={icon} size={32} color="white" />
        </View>
        
        <Text className="text-white text-2xl font-bold mb-2">{title}</Text>
        {subtitle && (
          <Text className="text-white/80 text-sm mb-4">{subtitle}</Text>
        )}
        
        <View className="items-center">
          <Animated.Text className="text-white text-6xl font-bold">
            {animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0', score.toString()],
              extrapolate: 'clamp',
            })}
          </Animated.Text>
          <Text className="text-white text-lg font-medium">
            / 100
          </Text>
          <Text className="text-white/90 text-sm font-medium mt-2">
            {getScoreLabel(score)}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default ScoreCard;