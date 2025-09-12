// src/components/ui/VideoPlayer.jsx
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const VideoPlayer = ({ uri, style, className = '', resizeMode = 'contain' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const togglePlayback = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View className={`relative ${className}`} style={style}>
      <Video
        ref={videoRef}
        source={{ uri }}
        className="w-full h-full"
        resizeMode={resizeMode}
        shouldPlay={false}
        onPlaybackStatusUpdate={(status) => {
          setIsPlaying(status.isPlaying);
        }}
      />
      
      {showControls && (
        <TouchableOpacity
          onPress={togglePlayback}
          className="absolute inset-0 items-center justify-center bg-black/20"
          onPressIn={() => setShowControls(false)}
          onPressOut={() => setTimeout(() => setShowControls(true), 2000)}
        >
          <View className="bg-black/50 rounded-full p-4">
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={32}
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoPlayer;