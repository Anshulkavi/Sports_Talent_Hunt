// //src/navigation/AppNavigator.jsx

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';

// import AuthNavigator from './AuthNavigator';
// import PlayerNavigator from './PlayerNavigator';
// import CoachNavigator from './CoachNavigator';
// import ScoutNavigator from './ScoutNavigator';
// import GovtNavigator from './GovtNavigator';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const { isAuthenticated, userRole } = useSelector(state => state.auth);

//   if (!isAuthenticated) {
//     return <AuthNavigator />;
//   }

//   // Navigate based on user role
//   switch (userRole) {
//     case 'player':
//       return <PlayerNavigator />;
//     case 'coach':
//       return <CoachNavigator />;
//     case 'scout':
//       return <ScoutNavigator />;
//     case 'govt':
//       return <GovtNavigator />;
//     default:
//       return <PlayerNavigator />;
//   }
// };

// export default AppNavigator;

// AppNavigator.jsx

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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      ) : (
        <>
          {userRole === 'player' && <Stack.Screen name="PlayerStack" component={PlayerNavigator} />}
          {userRole === 'coach' && <Stack.Screen name="CoachStack" component={CoachNavigator} />}
          {userRole === 'scout' && <Stack.Screen name="ScoutStack" component={ScoutNavigator} />}
          {userRole === 'govt' && <Stack.Screen name="GovtStack" component={GovtNavigator} />}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
