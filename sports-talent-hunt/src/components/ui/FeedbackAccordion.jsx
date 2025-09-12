// src/components/ui/FeedbackAccordion.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedbackAccordion = ({ feedback }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FeedbackSection = ({ title, items, icon, color = 'primary' }) => {
    const isExpanded = expandedSections[title];

    return (
      <View className="bg-white rounded-xl mb-3 overflow-hidden shadow-sm">
        <TouchableOpacity
          onPress={() => toggleSection(title)}
          className={`p-4 flex-row items-center justify-between bg-${color}-50`}
        >
          <View className="flex-row items-center flex-1">
            <View className={`bg-${color}-500 rounded-full p-2 mr-3`}>
              <Ionicons name={icon} size={16} color="white" />
            </View>
            <Text className={`text-${color}-700 font-semibold text-base`}>
              {title}
            </Text>
            <Text className={`text-${color}-500 text-sm ml-2`}>
              ({items?.length || 0})
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={`#${color === 'primary' ? '22c55e' : color === 'secondary' ? 'f97316' : 'ef4444'}`}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View className="p-4 pt-0">
            {items?.map((item, index) => (
              <View key={index} className="flex-row items-start py-2">
                <View className={`w-2 h-2 rounded-full bg-${color}-400 mt-2 mr-3`} />
                <Text className="text-gray-700 flex-1 text-sm leading-5">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-gray-900 mb-4">
        Analysis Feedback
      </Text>

      {feedback.strengths && feedback.strengths.length > 0 && (
        <FeedbackSection
          title="Strengths"
          items={feedback.strengths}
          icon="checkmark-circle"
          color="primary"
        />
      )}

      {feedback.improvements && feedback.improvements.length > 0 && (
        <FeedbackSection
          title="Areas for Improvement"
          items={feedback.improvements}
          icon="alert-circle"
          color="secondary"
        />
      )}

      {feedback.techniques && feedback.techniques.length > 0 && (
        <FeedbackSection
          title="Technique Analysis"
          items={feedback.techniques}
          icon="build"
          color="blue"
        />
      )}

      {feedback.recommendations && feedback.recommendations.length > 0 && (
        <FeedbackSection
          title="Recommendations"
          items={feedback.recommendations}
          icon="bulb"
          color="purple"
        />
      )}
    </ScrollView>
  );
};

export default FeedbackAccordion;