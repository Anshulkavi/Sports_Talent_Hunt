/ src/screens/player/UploadScreen.jsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import VideoPlayer from '../../components/ui/VideoPlayer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { uploadVideo } from '../../store/slices/videoSlice';

const UploadScreen = ({ navigation }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSport, setSelectedSport] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: 'fitness' },
    { id: 'football', name: 'Football', icon: 'football' },
    { id: 'basketball', name: 'Basketball', icon: 'basketball' },
    { id: 'tennis', name: 'Tennis', icon: 'tennisball' },
    { id: 'badminton', name: 'Badminton', icon: 'fitness' },
    { id: 'athletics', name: 'Athletics', icon: 'walk' }
  ];

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need camera roll permissions to select videos.');
      return false;
    }
    return true;
  };

  const pickVideoFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      duration: 60
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
    }
  };

  const recordVideo = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need camera permissions to record videos.');
      return;
    }
    setShowCamera(true);
  };

  const handleVideoRecord = async () => {
    if (cameraRef.current) {
      try {
        const video = await cameraRef.current.recordAsync();
        setSelectedVideo({ uri: video.uri });
        setShowCamera(false);
      } catch (error) {
        console.error('Error recording video:', error);
        showMessage({
          message: 'Failed to record video',
          type: 'danger'
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedVideo) {
      showMessage({
        message: 'Please select or record a video',
        type: 'warning'
      });
      return;
    }

    if (!selectedSport) {
      showMessage({
        message: 'Please select a sport',
        type: 'warning'
      });
      return;
    }

    setUploading(true);
    try {
      const uploadData = {
        video: selectedVideo,
        sport: selectedSport,
        description: description.trim()
      };

      const result = await dispatch(uploadVideo(uploadData)).unwrap();
      
      showMessage({
        message: 'Video uploaded successfully!',
        type: 'success'
      });

      navigation.navigate('AnalysisResult', { analysisId: result.id });
    } catch (error) {
      showMessage({
        message: error.message || 'Upload failed',
        type: 'danger'
      });
    } finally {
      setUploading(false);
    }
  };

  if (showCamera) {
    return (
      <SafeAreaWrapper>
        <Camera ref={cameraRef} className="flex-1">
          <View className="flex-1 justify-end p-6">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => setShowCamera(false)}
                className="bg-black/50 rounded-full p-4"
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleVideoRecord}
                className="bg-red-500 rounded-full p-6"
              >
                <Ionicons name="videocam" size={32} color="white" />
              </TouchableOpacity>
              
              <View className="w-16" />
            </View>
          </View>
        </Camera>
      </SafeAreaWrapper>
    );
  }

  if (uploading) {
    return <LoadingSpinner overlay />;
  }

  return (
    <SafeAreaWrapper>
      <Header title="Upload Video" subtitle="Share your sports performance" />
      
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Video Selection */}
        <View className="mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">Select Video</Text>
          
          {selectedVideo ? (
            <View className="mb-4">
              <VideoPlayer
                uri={selectedVideo.uri}
                className="h-48 rounded-2xl overflow-hidden"
              />
              <TouchableOpacity
                onPress={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-2"
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row space-x-3 mb-4">
              <TouchableOpacity
                onPress={recordVideo}
                className="flex-1 bg-white rounded-2xl p-6 shadow-sm items-center"
              >
                <Ionicons name="videocam" size={32} color="#22c55e" />
                <Text className="text-gray-900 font-semibold mt-2">Record Video</Text>
                <Text className="text-gray-600 text-sm text-center">
                  Use camera to record
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={pickVideoFromGallery}
                className="flex-1 bg-white rounded-2xl p-6 shadow-sm items-center"
              >
                <Ionicons name="images" size={32} color="#f97316" />
                <Text className="text-gray-900 font-semibold mt-2">Choose from Gallery</Text>
                <Text className="text-gray-600 text-sm text-center">
                  Select existing video
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Sport Selection */}
        <View className="mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">Select Sport</Text>
          <View className="flex-row flex-wrap">
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                onPress={() => setSelectedSport(sport.id)}
                className={`mr-3 mb-3 px-4 py-3 rounded-xl border-2 flex-row items-center ${
                  selectedSport === sport.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Ionicons
                  name={sport.icon}
                  size={16}
                  color={selectedSport === sport.id ? '#22c55e' : '#6b7280'}
                />
                <Text
                  className={`ml-2 font-medium ${
                    selectedSport === sport.id ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  {sport.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Description (Optional)
          </Text>
          <View className="bg-white rounded-xl border border-gray-200 p-4">
            <Text
              className="text-gray-700 text-base"
              onChangeText={setDescription}
              placeholder="Describe your performance, technique focus, or specific areas you want feedback on..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            >
              {description}
            </Text>
          </View>
        </View>

        {/* Upload Button */}
        <Button
          title="Upload & Analyze"
          onPress={handleUpload}
          disabled={!selectedVideo || !selectedSport}
          className="mb-8"
          icon={<Ionicons name="cloud-upload" size={20} color="white" />}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default UploadScreen;