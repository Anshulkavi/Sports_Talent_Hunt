// src/store/slices/contestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contestApi } from '../api/contestApi';

export const fetchContests = createAsyncThunk(
  'contest/fetchContests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contestApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch contests' });
    }
  }
);

export const enterContest = createAsyncThunk(
  'contest/enterContest',
  async (contestId, { rejectWithValue }) => {
    try {
      const response = await contestApi.enter(contestId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to enter contest' });
    }
  }
);

export const fetchContestDetails = createAsyncThunk(
  'contest/fetchContestDetails',
  async (contestId, { rejectWithValue }) => {
    try {
      const response = await contestApi.getDetails(contestId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch contest details' });
    }
  }
);

const initialState = {
  contests: [
    {
      id: 1,
      title: 'Under-18 Cricket Championship',
      sport: 'Cricket',
      category: 'Under-18',
      status: 'active',
      deadline: '2024-04-15',
      participants: 156,
      prize: '₹50,000 + Sports Kit',
      description: 'National level cricket championship for under-18 players',
      isEntered: false
    },
    {
      id: 2,
      title: 'Football Skills Challenge',
      sport: 'Football',
      category: 'Open',
      status: 'active',
      deadline: '2024-04-20',
      participants: 89,
      prize: 'Academy Training',
      description: 'Show off your football skills and win training opportunities',
      isEntered: true
    },
    {
      id: 3,
      title: 'Basketball Shooting Contest',
      sport: 'Basketball',
      category: 'Under-21',
      status: 'upcoming',
      deadline: '2024-05-01',
      participants: 0,
      prize: '₹25,000',
      description: 'Test your shooting accuracy in this exciting contest',
      isEntered: false
    }
  ],
  currentContest: null,
  loading: false,
  error: null,
};

const contestSlice = createSlice({
  name: 'contest',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contests
      .addCase(fetchContests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload;
      })
      .addCase(fetchContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Enter Contest
      .addCase(enterContest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enterContest.fulfilled, (state, action) => {
        state.loading = false;
        // Mark contest as entered
        const contest = state.contests.find(c => c.id === action.payload.contestId);
        if (contest) {
          contest.isEntered = true;
          contest.participants += 1;
        }
      })
      .addCase(enterContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Contest Details
      .addCase(fetchContestDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContestDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContest = action.payload;
      })
      .addCase(fetchContestDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = contestSlice.actions;
export default contestSlice.reducer;