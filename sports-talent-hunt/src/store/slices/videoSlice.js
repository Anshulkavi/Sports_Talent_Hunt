// src/store/slices/videoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  currentVideo: null,
  analysisResult: null,
  uploadProgress: 0,
  isUploading: false,
  isAnalyzing: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    uploadStart: (state) => {
      state.isUploading = true;
      state.uploadProgress = 0;
      state.error = null;
    },
    uploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    uploadSuccess: (state, action) => {
      state.isUploading = false;
      state.currentVideo = action.payload;
      state.uploadProgress = 100;
    },
    uploadFailure: (state, action) => {
      state.isUploading = false;
      state.error = action.payload;
      state.uploadProgress = 0;
    },
    analysisStart: (state) => {
      state.isAnalyzing = true;
      state.error = null;
    },
    analysisSuccess: (state, action) => {
      state.isAnalyzing = false;
      state.analysisResult = action.payload;
    },
    analysisFailure: (state, action) => {
      state.isAnalyzing = false;
      state.error = action.payload;
    },
    addVideo: (state, action) => {
      state.videos.unshift(action.payload);
    },
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
      state.analysisResult = null;
      state.uploadProgress = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  uploadStart,
  uploadProgress,
  uploadSuccess,
  uploadFailure,
  analysisStart,
  analysisSuccess,
  analysisFailure,
  addVideo,
  clearCurrentVideo,
  clearError,
} = videoSlice.actions;

export default videoSlice.reducer;