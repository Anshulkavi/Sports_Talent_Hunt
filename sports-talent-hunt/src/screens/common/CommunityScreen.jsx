// src/screens/common/CommunityScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import VideoPlayer from '../../components/ui/VideoPlayer';

const CommunityScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Mock community data
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Raj Patel', avatar: null, sport: 'Cricket', rank: 15 },
      content: 'Just improved my bowling technique! Check out this delivery 🏏',
      video: null,
      image: null,
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      user: { name: 'Priya Singh', avatar: null, sport: 'Basketball', rank: 8 },
      content: 'Finally nailed that three-pointer! Practice makes perfect 🏀',
      video: null,
      image: null,
      timestamp: '4 hours ago',
      likes: 42,
      comments: 15,
      shares: 7
    },
    {
      id: 3,
      user: { name: 'Arjun Kumar', avatar: null, sport: 'Football', rank: 12 },
      content: 'Training session highlights from today. Working on ball control and passing accuracy ⚽',
      video: null,
      image: null,
      timestamp: '1 day ago',
      likes: 38,
      comments: 12,
      shares: 5
    }
  ]);

  const challenges = [
    { id: 1, title: 'Cricket Bowling Challenge', participants: 156, timeLeft: '3 days', prize: 'Sports Kit' },
    { id: 2, title: 'Football Free Kick Challenge', participants: 89, timeLeft: '5 days', prize: '₹5000' },
    { id: 3, title: 'Basketball Shooting Challenge', participants: 203, timeLeft: '1 week', prize: 'Academy Training' }
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const PostCard = ({ post }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* User Header */}
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-3">
          {post.user.avatar ? (
            <Image source={{ uri: post.user.avatar }} className="w-full h-full rounded-full" />
          ) : (
            <Text className="text-primary-600 font-bold">
              {post.user.name.charAt(0)}
            </Text>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-semibold mr-2">{post.user.name}</Text>
            <View className="bg-primary-100 rounded-full px-2 py-0.5">
              <Text className="text-primary-600 text-xs font-medium">#{post.user.rank}</Text>
            </View>
          </View>
          <Text className="text-gray-600 text-sm">{post.user.sport} • {post.timestamp}</Text>
        </View>
        <TouchableOpacity className="p-1">
          <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text className="text-gray-900 text-base mb-3">{post.content}</Text>

      {/* Media */}
      {post.video && (
        <VideoPlayer uri={post.video} className="h-48 rounded-xl mb-3" />
      )}
      {post.image && (
        <Image source={{ uri: post.image }} className="w-full h-48 rounded-xl mb-3" />
      )}

      {/* Actions */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
        <TouchableOpacity
          onPress={() => handleLike(post.id)}
          className="flex-row items-center"
        >
          <Ionicons
            name={likedPosts.has(post.id) ? "heart" : "heart-outline"}
            size={20}
            color={likedPosts.has(post.id) ? "#ef4444" : "#6b7280"}
          />
          <Text className={`ml-1 text-sm ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-600'}`}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-600">{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="share-outline" size={20} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-600">{post.shares}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ChallengeCard = ({ challenge }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-900 font-semibold text-base flex-1">
          {challenge.title}
        </Text>
        <View className="bg-secondary-100 rounded-full px-2 py-1">
          <Text className="text-secondary-600 text-xs font-medium">
            {challenge.timeLeft}
          </Text>
        </View>
      </View>
      
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="people" size={16} color="#6b7280" />
          <Text className="text-gray-600 text-sm ml-1">
            {challenge.participants} participants
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="trophy" size={16} color="#f97316" />
          <Text className="text-secondary-600 font-medium text-sm ml-1">
            {challenge.prize}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const tabs = [
    { id: 'feed', label: 'Feed', icon: 'home' },
    { id: 'challenges', label: 'Challenges', icon: 'trophy' },
    { id: 'trending', label: 'Trending', icon: 'trending-up' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ScrollView>
        );
      
      case 'challenges':
        return (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-gray-900 font-bold text-lg mb-4">Active Challenges</Text>
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </ScrollView>
        );
      
      case 'trending':
        return (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-gray-900 font-bold text-lg mb-4">Trending Now</Text>
            {posts.slice().reverse().map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaWrapper>
      <Header 
        title="Community" 
        subtitle="Connect with athletes"
        showBack={false}
        rightComponent={
          <TouchableOpacity className="p-2">
            <Ionicons name="add-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        }
      />

      {/* Tabs */}
      <View className="bg-white px-4 py-4 shadow-sm">
        <View className="flex-row justify-between">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`flex-1 items-center py-3 mx-1 rounded-xl ${
                activeTab === tab.id ? 'bg-primary-100' : 'bg-gray-50'
              }`}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={activeTab === tab.id ? '#22c55e' : '#6b7280'}
              />
              <Text
                className={`mt-1 font-medium text-sm ${
                  activeTab === tab.id ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 py-4">
        {renderContent()}
      </View>
    </SafeAreaWrapper>
  );
};

export default CommunityScreen;