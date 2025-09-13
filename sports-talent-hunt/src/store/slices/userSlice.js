// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserStats = createAsyncThunk(
  'user/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      const mockStats = {
        totalVideos: 12,
        averageScore: 78,
        contestsJoined: 3,
        currentRank: 25,
        improvementRate: 15,
        lastAnalysis: new Date().toISOString()
      };
      
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: mockStats }), 1000);
      }).then(response => response.data);
    } catch (error) {
      return rejectWithValue({ message: 'Failed to fetch user stats' });
    }
  }
);

const initialState = {
  stats: null,
  achievements: [],
  progress: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;