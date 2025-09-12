// src/screens/player/AnalysisResultScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import ScoreCard from '../../components/ui/ScoreCard';
import FeedbackAccordion from '../../components/ui/FeedbackAccordion';
import VideoPlayer from '../../components/ui/VideoPlayer';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fetchAnalysisResult } from '../../store/slices/videoSlice';

const AnalysisResultScreen = ({ route, navigation }) => {
  const { analysisId } = route.params;
  const [showRecommendations, setShowRecommendations] = useState(false);
  const dispatch = useDispatch();
  const { currentAnalysis, loading } = useSelector(state => state.video);

  useEffect(() => {
    if (analysisId) {
      dispatch(fetchAnalysisResult(analysisId));
    }
  }, [analysisId, dispatch]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I got a score of ${currentAnalysis.score}/100 on my sports analysis! Check out Sports TalentHunt app.`,
        title: 'My Sports Analysis Result'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRetry = () => {
    showMessage({
      message: 'Ready for another attempt!',
      type: 'info'
    });
    navigation.navigate('Upload');
  };

  const handleEnterContest = () => {
    if (currentAnalysis.score >= 70) {
      navigation.navigate('Contests');
    } else {
      showMessage({
        message: 'Improve your score to enter contests!',
        type: 'info'
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentAnalysis) {
    return (
      <SafeAreaWrapper>
        <Header title="Analysis Result" />
        <View className="flex-1 items-center justify-center px-4">
          <Ionicons name="alert-circle" size={64} color="#ef4444" />
          <Text className="text-gray-900 text-lg font-semibold mt-4 mb-2">
            Analysis Not Found
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            The analysis result could not be loaded.
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaWrapper>
    );
  }

  const recommendations = [
    {
      title: "Practice Drill: Ball Control",
      description: "Focus on close ball control for 15 minutes daily",
      video: "https://youtube.com/watch?v=example1",
      duration: "15 min"
    },
    {
      title: "Technique: Shooting Stance",
      description: "Work on body positioning during shots",
      video: "https://youtube.com/watch?v=example2",
      duration: "10 min"
    }
  ];

  return (
    <SafeAreaWrapper>
      <Header 
        title="Analysis Complete" 
        subtitle="Your performance breakdown"
        rightComponent={
          <TouchableOpacity onPress={handleShare} className="p-2">
            <Ionicons name="share-outline" size={24} color="#374151" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Video */}
        {currentAnalysis.videoUrl && (
          <View className="px-4 mb-6">
            <VideoPlayer
              uri={currentAnalysis.videoUrl}
              className="h-48 rounded-2xl overflow-hidden"
            />
          </View>
        )}

        {/* Score Card */}
        <ScoreCard
          score={currentAnalysis.score}
          title="Overall Performance"
          subtitle={`${currentAnalysis.sport} Analysis`}
        />

        {/* Key Metrics */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Key Metrics
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            {currentAnalysis.metrics?.map((metric, index) => (
              <View key={index} className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">{metric.name}</Text>
                  <Text className="text-gray-600 text-sm">{metric.description}</Text>
                </View>
                <View className="items-end">
                  <Text className={`text-lg font-bold ${metric.score >= 80 ? 'text-green-600' : metric.score >= 60 ? 'text-orange-500' : 'text-red-500'}`}>
                    {metric.score}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Feedback */}
        <FeedbackAccordion feedback={currentAnalysis.feedback} />

        {/* Recommendations */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Recommendations
            </Text>
            <TouchableOpacity
              onPress={() => setShowRecommendations(!showRecommendations)}
              className="p-1"
            >
              <Ionicons
                name={showRecommendations ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>

          {showRecommendations && (
            <View className="bg-white rounded-2xl shadow-sm">
              {recommendations.map((rec, index) => (
                <View key={index} className={`p-4 ${index !== recommendations.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="text-gray-900 font-semibold text-base flex-1">
                      {rec.title}
                    </Text>
                    <View className="bg-primary-100 rounded-full px-2 py-1">
                      <Text className="text-primary-600 text-xs font-medium">
                        {rec.duration}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-600 text-sm mb-3">
                    {rec.description}
                  </Text>
                  <TouchableOpacity className="flex-row items-center">
                    <Ionicons name="play-circle" size={16} color="#22c55e" />
                    <Text className="text-primary-600 font-medium text-sm ml-1">
                      Watch Tutorial
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View className="px-4 mb-8 space-y-3">
          {currentAnalysis.score >= 70 && (
            <Button
              title="Enter Contest"
              onPress={handleEnterContest}
              icon={<Ionicons name="trophy" size={20} color="white" />}
            />
          )}
          
          <Button
            title="Try Again"
            onPress={handleRetry}
            variant="outline"
            icon={<Ionicons name="refresh" size={20} color="#22c55e" />}
          />

          {currentAnalysis.score >= 80 && (
            <View className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
              <View className="flex-row items-center mb-2">
                <Ionicons name="star" size={20} color="#f59e0b" />
                <Text className="text-yellow-700 font-semibold text-base ml-2">
                  Excellent Performance!
                </Text>
              </View>
              <Text className="text-yellow-600 text-sm mb-3">
                Your score qualifies you for government evaluation and potential scholarships.
              </Text>
              <TouchableOpacity className="bg-yellow-500 rounded-lg px-4 py-2 self-start">
                <Text className="text-white font-medium">Request Evaluation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AnalysisResultScreen;