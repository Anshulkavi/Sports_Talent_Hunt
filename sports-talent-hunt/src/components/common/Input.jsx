// src/components/common/Input.jsx

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  icon,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-gray-700 text-sm font-medium mb-2">{label}</Text>
      )}
      <View className="relative">
        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          {icon && (
            <View className="mr-3">
              {icon}
            </View>
          )}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            className={`flex-1 text-gray-900 text-base ${inputClassName}`}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="ml-3"
            >
              <Ionicons
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;