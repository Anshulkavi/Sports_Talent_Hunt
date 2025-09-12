//src/navigation/AppNavigator.jsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import PlayerNavigator from './PlayerNavigator';
import CoachNavigator from './CoachNavigator';
import ScoutNavigator from './ScoutNavigator';
import GovtNavigator from './GovtNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, userRole } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Navigate based on user role
  switch (userRole) {
    case 'player':
      return <PlayerNavigator />;
    case 'coach':
      return <CoachNavigator />;
    case 'scout':
      return <ScoutNavigator />;
    case 'govt':
      return <GovtNavigator />;
    default:
      return <PlayerNavigator />;
  }
};

export default AppNavigator;
