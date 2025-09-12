// src/screens/auth/RoleSelectionScreen.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Button from '../../components/common/Button';
import { setUserRole } from '../../store/slices/authSlice';

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roles = [
    {
      id: 'player',
      title: 'Player',
      description: 'Upload videos, get AI feedback, participate in contests',
      icon: 'fitness',
      color: 'primary',
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Train players, provide guidance, track progress',
      icon: 'school',
      color: 'secondary',
    },
    {
      id: 'scout',
      title: 'Scout',
      description: 'Discover talent, recruit players, evaluate performance',
      icon: 'search',
      color: 'blue',
    },
    {
      id: 'govt',
      title: 'Government Official',
      description: 'Verify talent, issue certificates, manage programs',
      icon: 'shield-checkmark',
      color: 'purple',
    },
  ];

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      showMessage({
        message: 'Please select your role',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(setUserRole(selectedRole)).unwrap();
      showMessage({
        message: 'Welcome to Sports TalentHunt!',
        type: 'success',
      });
      navigation.navigate('Home'); // Change to your actual target screen
    } catch (error) {
      showMessage({
        message: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      primary: {
        border: isSelected ? 'border-primary-500' : 'border-gray-200',
        bg: isSelected ? 'bg-primary-50' : 'bg-white',
        icon: '#22c55e',
        text: isSelected ? 'text-primary-600' : 'text-gray-600',
      },
      secondary: {
        border: isSelected ? 'border-secondary-500' : 'border-gray-200',
        bg: isSelected ? 'bg-secondary-50' : 'bg-white',
        icon: '#f97316',
        text: isSelected ? 'text-secondary-600' : 'text-gray-600',
      },
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-gray-200',
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        icon: '#3b82f6',
        text: isSelected ? 'text-blue-600' : 'text-gray-600',
      },
      purple: {
        border: isSelected ? 'border-purple-500' : 'border-gray-200',
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        icon: '#8b5cf6',
        text: isSelected ? 'text-purple-600' : 'text-gray-600',
      },
    };
    return colors[color];
  };

  return (
    <SafeAreaWrapper className="bg-white">
      <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="people" size={32} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</Text>
          <Text className="text-gray-600 text-center">
            Select how you want to use Sports TalentHunt
          </Text>
        </View>

        {/* Role Options */}
        <View className="mb-8">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            const colors = getColorClasses(role.color, isSelected);

            return (
              <TouchableOpacity
                key={role.id}
                onPress={() => setSelectedRole(role.id)}
                className={`p-4 rounded-2xl border-2 mb-4 ${colors.border} ${colors.bg}`}
              >
                <View className="flex-row items-start">
                  <View className="mr-4">
                    <Ionicons name={role.icon} size={24} color={colors.icon} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-lg mb-1">
                      {role.title}
                    </Text>
                    <Text className={`text-sm ${colors.text}`}>{role.description}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.icon} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <Button
          title="Continue"
          onPress={handleRoleSelection}
          loading={loading}
          disabled={!selectedRole}
          className="mb-6"
        />

        {/* Back Link */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="items-center">
          <Text className="text-gray-500">Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default RoleSelectionScreen;
