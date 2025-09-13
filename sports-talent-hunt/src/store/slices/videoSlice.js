// src/store/slices/videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { videoApi } from '../api/videoApi';

export const uploadVideo = createAsyncThunk(
  'video/uploadVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const response = await videoApi.upload(videoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Upload failed' });
    }
  }
);

export const fetchAnalysisResult = createAsyncThunk(
  'video/fetchAnalysisResult',
  async (analysisId, { rejectWithValue }) => {
    try {
      const response = await videoApi.getAnalysis(analysisId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch analysis' });
    }
  }
);

export const fetchUserVideos = createAsyncThunk(
  'video/fetchUserVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await videoApi.getUserVideos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch videos' });
    }
  }
);

const initialState = {
  videos: [],
  currentAnalysis: null,
  uploadProgress: 0,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetAnalysis: (state) => {
      state.currentAnalysis = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Video
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload);
        state.uploadProgress = 100;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      // Fetch Analysis
      .addCase(fetchAnalysisResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalysisResult.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnalysis = action.payload;
      })
      .addCase(fetchAnalysisResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Videos
      .addCase(fetchUserVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchUserVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUploadProgress, resetAnalysis } = videoSlice.actions;
export default videoSlice.reducer;