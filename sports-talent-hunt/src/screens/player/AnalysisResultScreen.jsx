// src/screens/player/AnalysisResultScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
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
  const { currentAnalysis, loading } = useSelector((state) => state.video);

  useEffect(() => {
    if (analysisId) {
      dispatch(fetchAnalysisResult(analysisId));
    }
  }, [analysisId, dispatch]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I got a score of ${currentAnalysis?.score}/100 on my sports analysis! Check out Sports TalentHunt app.`,
        title: 'My Sports Analysis Result',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRetry = () => {
    showMessage({
      message: 'Ready for another attempt!',
      type: 'info',
    });
    navigation.navigate('Upload');
  };

  const handleEnterContest = () => {
    if (currentAnalysis?.eligibleForContest) {
      navigation.navigate('Contests');
    } else {
      showMessage({
        message: 'Improve your score to enter the contest.',
        type: 'warning',
      });
    }
  };

  if (loading || !currentAnalysis) {
    return (
      <SafeAreaWrapper>
        <LoadingSpinner text="Fetching Analysis..." />
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <Header title="Analysis Result" showBack onBack={() => navigation.goBack()} />

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        {/* Video */}
        {currentAnalysis?.videoUrl && (
          <View className="mb-6">
            <VideoPlayer videoUrl={currentAnalysis.videoUrl} />
          </View>
        )}

        {/* Score */}
        <ScoreCard
          score={currentAnalysis.score}
          total={100}
          label="Performance Score"
          className="mb-6"
        />

        {/* Feedback */}
        <FeedbackAccordion
          title="Detailed Feedback"
          feedbackItems={currentAnalysis.feedback}
          className="mb-6"
        />

        {/* Recommendations */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
          onPress={() => setShowRecommendations(!showRecommendations)}
        >
          <Text className="text-base font-medium text-gray-800">
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </Text>
          <Ionicons
            name={showRecommendations ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#4B5563"
          />
        </TouchableOpacity>

        {showRecommendations && (
          <View className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            {currentAnalysis?.recommendations?.length > 0 ? (
              currentAnalysis.recommendations.map((rec, index) => (
                <Text key={index} className="text-gray-700 mb-2">
                  • {rec}
                </Text>
              ))
            ) : (
              <Text className="text-gray-500">No recommendations available.</Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <Button
          title="Share Result"
          onPress={handleShare}
          icon={<Ionicons name="share-social-outline" size={20} color="white" />}
          className="mb-4"
        />

        <Button
          title="Try Again"
          onPress={handleRetry}
          icon={<Ionicons name="refresh-outline" size={20} color="white" />}
          className="mb-4"
        />

        <Button
          title="Enter Contest"
          onPress={handleEnterContest}
          icon={<Ionicons name="trophy-outline" size={20} color="white" />}
          disabled={!currentAnalysis?.eligibleForContest}
          className="mb-10"
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AnalysisResultScreen;
