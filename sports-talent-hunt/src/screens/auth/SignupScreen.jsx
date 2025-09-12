// src/screens/auth/SignupScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { registerUser } from '../../store/slices/authSlice';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage({
        message: 'Please fill in all fields',
        type: 'warning',
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'warning',
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: 'Password must be at least 6 characters',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(registerUser(formData)).unwrap();
      showMessage({
        message: 'Account created successfully!',
        type: 'success',
      });
      navigation.navigate('RoleSelection'); // Or any next screen
    } catch (error) {
      showMessage({
        message: error.message || 'Registration failed',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaWrapper className="bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6 pt-8">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="person-add" size={32} color="#22c55e" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </Text>
              <Text className="text-gray-600 text-center">
                Join the sports talent community
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                icon={<Ionicons name="person-outline" size={20} color="#6b7280" />}
              />

              <Input
                label="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Ionicons name="mail-outline" size={20} color="#6b7280" />}
              />

              <Input
                label="Phone Number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                icon={<Ionicons name="call-outline" size={20} color="#6b7280" />}
              />

              <Input
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Create a password"
                secureTextEntry
                icon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
              />

              <Input
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm your password"
                secureTextEntry
                icon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
              />
            </View>

            {/* Sign Up Button */}
            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              className="mb-6"
            />

            {/* Login Link */}
            <View className="flex-row items-center justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary-500 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
