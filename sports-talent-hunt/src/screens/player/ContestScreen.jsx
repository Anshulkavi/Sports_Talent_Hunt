// src/screens/player/ContestsScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaWrapper from '../../components/layout/SafeAreaWrapper';
import Header from '../../components/layout/Header';
import ContestCard from '../../components/ui/ContestCard';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { fetchContests, enterContest } from '../../store/slices/contestSlice';

const ContestsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const dispatch = useDispatch();
  const { contests, loading } = useSelector(state => state.contest);

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchContests());
    setRefreshing(false);
  };

  const filters = [
    { id: 'all', label: 'All Contests', icon: 'trophy' },
    { id: 'active', label: 'Active', icon: 'flash' },
    { id: 'upcoming', label: 'Upcoming', icon: 'calendar' },
    { id: 'my-contests', label: 'My Contests', icon: 'person' }
  ];

  const filteredContests = contests.filter(contest => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return contest.status === 'active';
    if (activeFilter === 'upcoming') return contest.status === 'upcoming';
    if (activeFilter === 'my-contests') return contest.isEntered;
    return true;
  });

  const handleEnterContest = async (contestId) => {
    try {
      await dispatch(enterContest(contestId)).unwrap();
      setShowEntryModal(false);
      setSelectedContest(null);
    } catch (error) {
      console.error('Failed to enter contest:', error);
    }
  };

  const EntryModal = () => (
    <Modal
      visible={showEntryModal}
      onClose={() => setShowEntryModal(false)}
      title="Enter Contest"
      size="lg"
    >
      {selectedContest && (
        <View>
          <Text className="text-gray-900 text-lg font-bold mb-2">
            {selectedContest.title}
          </Text>
          <Text className="text-gray-600 mb-4">
            {selectedContest.description}
          </Text>
          
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Contest Details:</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Sport:</Text>
                <Text className="text-gray-900 font-medium">{selectedContest.sport}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Category:</Text>
                <Text className="text-gray-900 font-medium">{selectedContest.category}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Prize:</Text>
                <Text className="text-gray-900 font-medium">{selectedContest.prize}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Deadline:</Text>
                <Text className="text-gray-900 font-medium">
                  {new Date(selectedContest.deadline).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
          
          <View className="space-y-3">
            <Button
              title="Enter Contest"
              onPress={() => handleEnterContest(selectedContest.id)}
            />
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setShowEntryModal(false)}
            />
          </View>
        </View>
      )}
    </Modal>
  );

  return (
    <SafeAreaWrapper>
      <Header 
        title="Contests" 
        subtitle="Compete and win prizes"
        showBack={false}
        rightComponent={
          <TouchableOpacity 
            onPress={() => navigation.navigate('Leaderboard')}
            className="p-2"
          >
            <Ionicons name="podium" size={24} color="#374151" />
          </TouchableOpacity>
        }
      />

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4 bg-white"
      >
        <View className="flex-row space-x-3">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full flex-row items-center ${
                activeFilter === filter.id
                  ? 'bg-primary-500'
                  : 'bg-gray-100'
              }`}
            >
              <Ionicons
                name={filter.icon}
                size={16}
                color={activeFilter === filter.id ? 'white' : '#6b7280'}
              />
              <Text
                className={`ml-2 font-medium ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              onPress={() => {
                setSelectedContest(contest);
                // Navigate to contest details or show modal
              }}
              onEnter={() => {
                setSelectedContest(contest);
                setShowEntryModal(true);
              }}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="trophy-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 text-lg font-medium mt-4">
              No contests found
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              {activeFilter === 'all' 
                ? 'Check back later for new contests' 
                : 'Try changing the filter'}
            </Text>
          </View>
        )}
      </ScrollView>

      <EntryModal />
    </SafeAreaWrapper>
  );
};

export default ContestsScreen;