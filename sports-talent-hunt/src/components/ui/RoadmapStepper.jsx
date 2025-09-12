// src/components/ui/RoadmapStepper.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RoadmapStepper = ({ currentStep = 0, steps = [] }) => {
  const defaultSteps = [
    { title: 'Upload Video', description: 'Record your sports performance', icon: 'videocam' },
    { title: 'AI Analysis', description: 'Get instant feedback', icon: 'analytics' },
    { title: 'Govt Verification', description: 'Official validation', icon: 'shield-checkmark' },
    { title: 'Contest Entry', description: 'Participate in competitions', icon: 'trophy' },
    { title: 'Rankings', description: 'Climb the leaderboard', icon: 'trending-up' },
    { title: 'National Selection', description: 'Academy invitations', icon: 'flag' }
  ];

  const roadmapSteps = steps.length > 0 ? steps : defaultSteps;

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepColors = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-primary-500',
          text: 'text-white',
          border: 'border-primary-500',
          line: 'bg-primary-500'
        };
      case 'active':
        return {
          bg: 'bg-primary-100',
          text: 'text-primary-600',
          border: 'border-primary-500',
          line: 'bg-gray-300'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-400',
          border: 'border-gray-300',
          line: 'bg-gray-300'
        };
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="px-4">
      <Text className="text-xl font-bold text-gray-900 mb-6">
        Your Journey to National Team
      </Text>
      
      {roadmapSteps.map((step, index) => {
        const status = getStepStatus(index);
        const colors = getStepColors(status);
        const isLast = index === roadmapSteps.length - 1;

        return (
          <View key={index} className="flex-row mb-6">
            <View className="items-center mr-4">
              <View
                className={`w-12 h-12 rounded-full items-center justify-center border-2 ${colors.bg} ${colors.border}`}
              >
                <Ionicons
                  name={status === 'completed' ? 'checkmark' : step.icon}
                  size={20}
                  color={status === 'completed' ? 'white' : status === 'active' ? '#22c55e' : '#9ca3af'}
                />
              </View>
              {!isLast && (
                <View className={`w-0.5 h-8 mt-2 ${colors.line}`} />
              )}
            </View>
            
            <View className="flex-1">
              <Text
                className={`font-semibold text-base mb-1 ${
                  status === 'completed' ? 'text-primary-600' : 
                  status === 'active' ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.title}
              </Text>
              <Text
                className={`text-sm ${
                  status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {step.description}
              </Text>
              {step.status && (
                <Text className="text-primary-500 text-xs font-medium mt-1">
                  {step.status}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default RoadmapStepper;