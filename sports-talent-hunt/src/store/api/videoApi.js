// src/store/api/videoApi.js (COMPLETED)
import { API_BASE_URL } from '../../utils/constants';

export const videoApi = {
  upload: async (videoData) => {
    // Mock video upload with analysis
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (videoData.video && videoData.sport) {
          const mockAnalysis = {
            id: Math.floor(Math.random() * 1000),
            videoUrl: videoData.video.uri,
            sport: videoData.sport,
            description: videoData.description || '',
            score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
            uploadDate: new Date().toISOString(),
            status: 'completed',
            processingTime: 3000,
            metrics: [
              { 
                name: 'Technique', 
                description: 'Body posture and form analysis', 
                score: Math.floor(Math.random() * 30) + 70,
                details: 'Analyzed stance, grip, and movement execution'
              },
              { 
                name: 'Timing', 
                description: 'Movement coordination and rhythm', 
                score: Math.floor(Math.random() * 30) + 65,
                details: 'Evaluated sequence timing and coordination'
              },
              { 
                name: 'Accuracy', 
                description: 'Precision and target control', 
                score: Math.floor(Math.random() * 25) + 75,
                details: 'Measured precision and consistency'
              },
              { 
                name: 'Power', 
                description: 'Force generation and transfer', 
                score: Math.floor(Math.random() * 35) + 60,
                details: 'Analyzed power generation and delivery'
              }
            ],
            feedback: {
              strengths: [
                'Good balance throughout the movement',
                'Consistent follow-through technique',
                'Strong foundation and stance',
                'Proper body alignment during execution',
                'Good eye-hand coordination visible'
              ],
              improvements: [
                'Work on shoulder rotation for better power generation',
                'Improve foot positioning during setup phase',
                'Focus on hip alignment for better energy transfer',
                'Increase flexibility for extended range of motion',
                'Work on consistency in release timing'
              ],
              techniques: [
                'Practice slow-motion repetitions to build muscle memory',
                'Use mirror for real-time form correction',
                'Record from multiple angles for complete analysis',
                'Focus on single-component drills before combining',
                'Use weighted equipment for strength building'
              ],
              recommendations: [
                'Daily practice sessions of 30-45 minutes',
                'Focus on flexibility and mobility exercises',
                'Seek coach guidance for advanced technique refinement',
                'Join local training groups for peer learning',
                'Set specific improvement targets for next month'
              ]
            },
            aiConfidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
            governmentEligible: Math.random() > 0.3, // 70% chance of being eligible
            contestRecommendations: [
              'Under-18 Regional Championship',
              'State Level Skills Contest',
              'National Talent Hunt Program'
            ]
          };
          resolve({ data: mockAnalysis });
        } else {
          reject({ 
            response: { 
              data: { 
                message: 'Invalid video data - video file and sport selection required',
                code: 'INVALID_DATA'
              } 
            } 
          });
        }
      }, 3000); // Simulate AI analysis processing time
    });
  },

  getAnalysis: async (analysisId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (analysisId) {
          const mockAnalysis = {
            id: analysisId,
            videoUrl: 'https://example.com/video.mp4',
            thumbnailUrl: 'https://example.com/thumbnail.jpg',
            sport: 'Cricket',
            score: 85,
            uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            status: 'completed',
            processingTime: 2800,
            metrics: [
              { 
                name: 'Technique', 
                description: 'Body posture and form analysis', 
                score: 88,
                trend: '+3', // improvement from last video
                details: 'Excellent stance and grip technique observed'
              },
              { 
                name: 'Timing', 
                description: 'Movement coordination and rhythm', 
                score: 82,
                trend: '+1',
                details: 'Good coordination with minor timing adjustments needed'
              },
              { 
                name: 'Accuracy', 
                description: 'Precision and target control', 
                score: 87,
                trend: '+5',
                details: 'Significant improvement in target precision'
              },
              { 
                name: 'Power', 
                description: 'Force generation and transfer', 
                score: 83,
                trend: '-2',
                details: 'Slight decrease in power - focus on strength training'
              }
            ],
            feedback: {
              strengths: [
                'Excellent balance and control throughout the motion',
                'Good technique execution with proper form',
                'Strong fundamental skills clearly visible',
                'Consistent performance across multiple attempts',
                'Good adaptation to environmental conditions'
              ],
              improvements: [
                'Work on follow-through consistency for better results',
                'Improve reaction time in dynamic situations',
                'Focus on footwork positioning during setup',
                'Enhance core stability for better balance',
                'Work on mental focus and concentration'
              ],
              techniques: [
                'Practice specific drills for muscle memory development',
                'Use video analysis tools for self-improvement',
                'Regular form check sessions with mirrors',
                'Break down complex movements into components',
                'Implement progressive training methodology'
              ],
              recommendations: [
                'Increase practice frequency to 5 days per week',
                'Work with a certified coach for advanced techniques',
                'Join skill development programs in your area',
                'Focus on strength and conditioning workouts',
                'Participate in local competitions for experience'
              ]
            },
            comparisonData: {
              previousScore: 82,
              improvement: 3,
              avgPeerScore: 79,
              nationalAverage: 75,
              percentile: 78
            },
            aiConfidence: 92,
            governmentEligible: true,
            contestRecommendations: [
              'State Level Cricket Championship',
              'National Under-21 Selection Trials',
              'Regional Sports Authority Screening'
            ],
            nextSteps: [
              'Submit for government verification',
              'Enter upcoming state championship',
              'Schedule advanced coaching session'
            ]
          };
          resolve({ data: mockAnalysis });
        } else {
          reject({ 
            response: { 
              data: { 
                message: 'Analysis not found - invalid or expired analysis ID',
                code: 'ANALYSIS_NOT_FOUND'
              } 
            } 
          });
        }
      }, 1500);
    });
  },

  getUserVideos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockVideos = [
          {
            id: 1,
            sport: 'Cricket',
            title: 'Bowling Technique Analysis',
            score: 85,
            uploadDate: '2024-03-01T10:30:00Z',
            thumbnail: null,
            duration: 45,
            status: 'completed',
            viewCount: 23,
            governmentVerified: true
          },
          {
            id: 2,
            sport: 'Football',
            title: 'Free Kick Practice Session',
            score: 72,
            uploadDate: '2024-02-28T15:45:00Z',
            thumbnail: null,
            duration: 38,
            status: 'completed',
            viewCount: 15,
            governmentVerified: false
          },
          {
            id: 3,
            sport: 'Basketball',
            title: 'Three Point Shooting Form',
            score: 90,
            uploadDate: '2024-02-25T09:15:00Z',
            thumbnail: null,
            duration: 52,
            status: 'completed',
            viewCount: 31,
            governmentVerified: true
          },
          {
            id: 4,
            sport: 'Tennis',
            title: 'Backhand Technique',
            score: 68,
            uploadDate: '2024-02-22T14:20:00Z',
            thumbnail: null,
            duration: 33,
            status: 'completed',
            viewCount: 8,
            governmentVerified: false
          }
        ];
        resolve({ data: mockVideos });
      }, 1000);
    });
  },

  deleteVideo: async (videoId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (videoId) {
          resolve({ data: { success: true, message: 'Video deleted successfully' } });
        } else {
          reject({ 
            response: { 
              data: { 
                message: 'Video ID required for deletion',
                code: 'VIDEO_ID_REQUIRED'
              } 
            } 
          });
        }
      }, 800);
    });
  },

  getVideoById: async (videoId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (videoId) {
          const mockVideo = {
            id: videoId,
            sport: 'Cricket',
            title: 'Advanced Bowling Technique',
            description: 'Working on spin and pace variations',
            videoUrl: 'https://example.com/video.mp4',
            thumbnailUrl: 'https://example.com/thumb.jpg',
            score: 88,
            uploadDate: '2024-03-01T10:30:00Z',
            duration: 47,
            status: 'completed',
            tags: ['bowling', 'spin', 'technique'],
            metrics: [
              { name: 'Technique', score: 90 },
              { name: 'Timing', score: 86 },
              { name: 'Accuracy', score: 89 },
              { name: 'Power', score: 87 }
            ]
          };
          resolve({ data: mockVideo });
        } else {
          reject({ 
            response: { 
              data: { 
                message: 'Video not found',
                code: 'VIDEO_NOT_FOUND'
              } 
            } 
          });
        }
      }, 600);
    });
  },

  reportVideo: async (videoId, reason) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: { 
            success: true, 
            message: 'Video reported successfully. Our team will review it within 24 hours.',
            reportId: Math.floor(Math.random() * 10000)
          } 
        });
      }, 1200);
    });
  }
};