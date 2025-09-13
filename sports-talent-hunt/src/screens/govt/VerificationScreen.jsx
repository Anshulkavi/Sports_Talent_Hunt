// src/screens/govt/VerificationScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import VideoPlayer from '../../components/ui/VideoPlayer';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const VerificationScreen = ({ navigation }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const [applications] = useState([
    {
      id: 1,
      playerName: 'Rahul Sharma',
      sport: 'Cricket',
      score: 89,
      aiConfidence: 92,
      videoUrl: 'https://example.com/video1.mp4',
      location: 'Mumbai, Maharashtra',
      age: 17,
      submittedDate: '2024-03-01',
      priority: 'high',
      metrics: [
        { name: 'Technique', score: 90 },
        { name: 'Timing', score: 88 },
        { name: 'Accuracy', score: 89 },
        { name: 'Power', score: 89 }
      ]
    },
    {
      id: 2,
      playerName: 'Priya Patel',
      sport: 'Basketball',
      score: 92,
      aiConfidence: 95,
      videoUrl: 'https://example.com/video2.mp4',
      location: 'Delhi',
      age: 19,
      submittedDate: '2024-02-28',
      priority: 'high',
      metrics: [
        { name: 'Shooting', score: 94 },
        { name: 'Dribbling', score: 90 },
        { name: 'Defense', score: 91 },
        { name: 'Teamwork', score: 93 }
      ]
    }
  ]);

  const handleVerify = (applicationId, status, rating) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to ${status} this application with rating ${rating}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // Handle verification logic here
            setShowDetailsModal(false);
            setSelectedApplication(null);
            Alert.alert('Success', `Application ${status} successfully!`);
          }
        }
      ]
    );
  };

  const DetailsModal = () => (
    <Modal
      visible={showDetailsModal}
      onClose={() => setShowDetailsModal(false)}
      title="Application Details"
      size="xl"
    >
      {selectedApplication && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              {selectedApplication.playerName}
            </Text>
            <Text className="text-gray-600 mb-4">
              {selectedApplication.sport} • Age {selectedApplication.age} • {selectedApplication.location}
            </Text>

            {/* Video Player */}
            <VideoPlayer
              uri={selectedApplication.videoUrl}
              className="h-48 rounded-xl mb-4"
            />

            {/* Scores */}
            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <Text className="font-semibold text-gray-900 mb-3">Performance Metrics</Text>
              {selectedApplication.metrics.map((metric, index) => (
                <View key={index} className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-700">{metric.name}</Text>
                  <Text className="font-bold text-gray-900">{metric.score}%</Text>
                </View>
              ))}
            </View>

            {/* AI Analysis */}
            <View className="bg-blue-50 rounded-xl p-4 mb-4">
              <Text className="font-semibold text-blue-900 mb-2">AI Analysis</Text>
              <Text className="text-blue-700">
                Overall Score: {selectedApplication.score}/100
              </Text>
              <Text className="text-blue-700">
                AI Confidence: {selectedApplication.aiConfidence}%
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="space-y-3">
              <Button
                title="Approve with High Rating (90-100)"
                onPress={() => handleVerify(selectedApplication.id, 'approved', 'high')}
                className="bg-green-500"
              />
              <Button
                title="Approve with Good Rating (70-89)"
                onPress={() => handleVerify(selectedApplication.id, 'approved', 'good')}
                variant="outline"
                className="border-green-500"
              />
              <Button
                title="Request Additional Information"
                onPress={() => handleVerify(selectedApplication.id, 'pending', 'info')}
                variant="outline"
                className="border-orange-500"
              />
              <Button
                title="Reject Application"
                onPress={() => handleVerify(selectedApplication.id, 'rejected', 'low')}
                variant="outline"
                className="border-red-500"
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );

  return (
    <SafeAreaWrapper>
      <Header title="Talent Verification" subtitle="Review player applications" />

      {/* Filter Tabs */}
      <View className="px-4 py-4 bg-white">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {['all', 'high-priority', 'cricket', 'football', 'basketball'].map((filterType) => (
              <TouchableOpacity
                key={filterType}
                onPress={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-full ${
                  filter === filterType ? 'bg-purple-500' : 'bg-gray-100'
                }`}
              >
                <Text className={`font-medium capitalize ${
                  filter === filterType ? 'text-white' : 'text-gray-600'
                }`}>
                  {filterType.replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {applications.map((app) => (
          <TouchableOpacity
            key={app.id}
            onPress={() => {
              setSelectedApplication(app);
              setShowDetailsModal(true);
            }}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-gray-900 font-semibold text-base mr-2">
                    {app.playerName}
                  </Text>
                  {app.priority === 'high' && (
                    <View className="bg-red-100 rounded-full px-2 py-1">
                      <Text className="text-red-600 text-xs font-medium">Priority</Text>
                    </View>
                  )}
                </View>
                
                <Text className="text-gray-600 text-sm mb-2">
                  {app.sport} • Age {app.age} • {app.location}
                </Text>
                
                <View className="flex-row items-center space-x-4">
                  <View className="flex-row items-center">
                    <Ionicons name="trophy" size={14} color="#f97316" />
                    <Text className="text-gray-700 text-sm ml-1">{app.score}/100</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="analytics" size={14} color="#3b82f6" />
                    <Text className="text-gray-700 text-sm ml-1">{app.aiConfidence}% AI</Text>
                  </View>
                </View>
              </View>
              
              <View className="items-end">
                <Text className="text-gray-400 text-xs mb-2">
                  {new Date(app.submittedDate).toLocaleDateString()}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <DetailsModal />
    </SafeAreaWrapper>
  );
};

export default VerificationScreen;