// src/hooks/usePermissions.js (COMPLETED)
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Alert, Linking } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const usePermissions = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      setLoading(true);
      
      // Check camera permission
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status);

      // Check media library permission
      const mediaStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      setMediaLibraryPermission(mediaStatus.status);

      // Check audio recording permission
      const audioStatus = await Camera.getMicrophonePermissionsAsync();
      setAudioPermission(audioStatus.status);
      
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Sports TalentHunt needs camera access to record your sports videos for analysis. Please enable camera permission in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => Linking.openSettings(),
              style: 'default'
            }
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  };

  const requestMediaLibraryPermission = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setMediaLibraryPermission(status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Media Library Permission Required',
          'Sports TalentHunt needs access to your media library to select videos for analysis. Please enable media library permission in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => Linking.openSettings(),
              style: 'default'
            }
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting media library permission:', error);
      return false;
    }
  };

  const requestAudioPermission = async () => {
    try {
      const { status } = await Camera.requestMicrophonePermissionsAsync();
      setAudioPermission(status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Microphone Permission Required',
          'Sports TalentHunt needs microphone access to record audio with your videos. This helps provide better analysis feedback.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => Linking.openSettings(),
              style: 'default'
            }
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting audio permission:', error);
      return false;
    }
  };

  const requestAllPermissions = async () => {
    const cameraGranted = await requestCameraPermission();
    const mediaLibraryGranted = await requestMediaLibraryPermission();
    const audioGranted = await requestAudioPermission();
    
    return {
      camera: cameraGranted,
      mediaLibrary: mediaLibraryGranted,
      audio: audioGranted,
      allGranted: cameraGranted && mediaLibraryGranted && audioGranted
    };
  };

  const openAppSettings = () => {
    Alert.alert(
      'Enable Permissions',
      'To use all features of Sports TalentHunt, please enable Camera, Media Library, and Microphone permissions in your device settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Settings', 
          onPress: () => Linking.openSettings(),
          style: 'default'
        }
      ]
    );
  };

  const getPermissionStatus = () => {
    return {
      camera: cameraPermission,
      mediaLibrary: mediaLibraryPermission,
      audio: audioPermission,
      allPermissionsGranted: 
        cameraPermission === 'granted' && 
        mediaLibraryPermission === 'granted' && 
        audioPermission === 'granted'
    };
  };

  return {
    // Permission states
    cameraPermission,
    mediaLibraryPermission,
    audioPermission,
    loading,
    
    // Permission checkers
    hasCameraPermission: cameraPermission === 'granted',
    hasMediaLibraryPermission: mediaLibraryPermission === 'granted',
    hasAudioPermission: audioPermission === 'granted',
    hasAllPermissions: cameraPermission === 'granted' && 
                      mediaLibraryPermission === 'granted' && 
                      audioPermission === 'granted',
    
    // Permission requesters
    requestCameraPermission,
    requestMediaLibraryPermission,
    requestAudioPermission,
    requestAllPermissions,
    
    // Utility functions
    checkPermissions,
    openAppSettings,
    getPermissionStatus
  };
};

// Additional hook for video recording functionality
export const useVideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [maxDuration] = useState(60); // 60 seconds max
  const permissions = usePermissions();

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(duration => {
          if (duration >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return duration + 1;
        });
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, maxDuration]);

  const startRecording = async () => {
    if (!permissions.hasAllPermissions) {
      await permissions.requestAllPermissions();
      return false;
    }
    
    setIsRecording(true);
    setRecordingDuration(0);
    return true;
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingDuration(0);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = () => {
    return maxDuration - recordingDuration;
  };

  const isMaxDurationReached = () => {
    return recordingDuration >= maxDuration;
  };

  return {
    isRecording,
    recordingDuration,
    maxDuration,
    formatDuration: () => formatDuration(recordingDuration),
    getRemainingTime,
    isMaxDurationReached,
    startRecording,
    stopRecording,
    ...permissions
  };
};