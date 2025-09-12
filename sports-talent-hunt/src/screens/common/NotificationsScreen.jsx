// src/screens/common/NotificationsScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';

const NotificationsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'analysis_complete',
      title: 'Video Analysis Complete',
      message: 'Your cricket bowling video has been analyzed. Score: 85/100',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionable: true,
      actionText: 'View Results'
    },
    {
      id: 2,
      type: 'contest_reminder',
      title: 'Contest Deadline Approaching',
      message: 'Under-18 Football Challenge ends in 2 days. Submit your entry now!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false,
      actionable: true,
      actionText: 'Enter Contest'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Consistency Master - You\'ve uploaded 10 videos this month',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionable: false
    },
    {
      id: 4,
      type: 'govt_verification',
      title: 'Government Verification Update',
      message: 'Your performance has been reviewed by sports officials. Check your profile for details.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      actionable: true,
      actionText: 'View Profile'
    },
    {
      id: 5,
      type: 'social',
      title: 'New Follower',
      message: 'Raj Patel started following you',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      actionable: false
    }
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'analysis_complete':
        return { name: 'analytics', color: '#22c55e' };
      case 'contest_reminder':
        return { name: 'trophy', color: '#f97316' };
      case 'achievement':
        return { name: 'medal', color: '#f59e0b' };
      case 'govt_verification':
        return { name: 'shield-checkmark', color: '#8b5cf6' };
      case 'social':
        return { name: 'people', color: '#3b82f6' };
      default:
        return { name: 'notifications', color: '#6b7280' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const handleNotificationAction = (notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'analysis_complete':
        // Navigate to analysis result
        // navigation.navigate('AnalysisResult', { analysisId: notification.analysisId });
        break;
      case 'contest_reminder':
        navigation.navigate('Contests');
        break;
      case 'govt_verification':
        navigation.navigate('Profile');
        break;
      default:
        break;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaWrapper>
      <Header 
        title="Notifications" 
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
        rightComponent={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllAsRead} className="p-2">
              <Text className="text-primary-600 font-medium">Mark all read</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const icon = getNotificationIcon(notification.type);
            
            return (
              <TouchableOpacity
                key={notification.id}
                onPress={() => markAsRead(notification.id)}
                className={`bg-white rounded-2xl p-4 mb-3 shadow-sm ${
                  !notification.read ? 'border-l-4 border-primary-500' : ''
                }`}
              >
                <View className="flex-row items-start">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    !notification.read ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <Ionicons name={icon.name} size={20} color={icon.color} />
                  </View>
                  
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className={`font-semibold text-base ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <View className="w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                    </View>
                    
                    <Text className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </Text>
                    
                    <View className="flex-row items-center justify-between">
                      <Text className="text-gray-400 text-xs">
                        {formatTimestamp(notification.timestamp)}
                      </Text>
                      
                      {notification.actionable && (
                        <TouchableOpacity
                          onPress={() => handleNotificationAction(notification)}
                          className="bg-primary-50 rounded-lg px-3 py-1.5"
                        >
                          <Text className="text-primary-600 font-medium text-xs">
                            {notification.actionText}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 text-lg font-medium mt-4">
              No notifications yet
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              We'll notify you when something important happens
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default NotificationsScreen;