// src/hooks/useVideo.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { uploadVideo, fetchAnalysisResult, fetchUserVideos } from '../store/slices/videoSlice';

export const useVideo = () => {
  const dispatch = useDispatch();
  const { videos, currentAnalysis, uploadProgress, loading, error } = useSelector(state => state.video);

  const upload = useCallback(async (videoData) => {
    return dispatch(uploadVideo(videoData));
  }, [dispatch]);

  const getAnalysis = useCallback(async (analysisId) => {
    return dispatch(fetchAnalysisResult(analysisId));
  }, [dispatch]);

  const getUserVideos = useCallback(async () => {
    return dispatch(fetchUserVideos());
  }, [dispatch]);

  return {
    videos,
    currentAnalysis,
    uploadProgress,
    loading,
    error,
    upload,
    getAnalysis,
    getUserVideos,
  };
};
