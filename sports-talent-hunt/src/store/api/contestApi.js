// src/store/api/contestApi.js
export const contestApi = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockContests = [
          {
            id: 1,
            title: 'Under-18 Cricket Championship',
            sport: 'Cricket',
            category: 'Under-18',
            status: 'active',
            deadline: '2024-04-15',
            participants: 156,
            prize: '₹50,000 + Sports Kit',
            description: 'National level cricket championship',
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
            description: 'Football skills competition',
            isEntered: false
          }
        ];
        resolve({ data: mockContests });
      }, 1000);
    });
  },

  enter: async (contestId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { contestId, success: true } });
      }, 1500);
    });
  },

  getDetails: async (contestId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: contestId,
            title: 'Contest Details',
            description: 'Detailed contest information',
            rules: ['Rule 1', 'Rule 2'],
            prizes: ['First Prize', 'Second Prize']
          }
        });
      }, 1000);
    });
  }
};