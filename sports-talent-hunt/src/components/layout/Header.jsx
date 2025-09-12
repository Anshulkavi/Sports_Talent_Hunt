// src/components/layout/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ 
  title, 
  subtitle, 
  showBack = true, 
  rightComponent, 
  onBack,
  className = '' 
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className={`bg-white px-4 py-3 flex-row items-center justify-between shadow-sm ${className}`}>
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={handleBack} className="mr-3 p-1">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-600 text-sm">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {rightComponent && (
        <View className="ml-3">
          {rightComponent}
        </View>
      )}
    </View>
  );
};

export default Header;