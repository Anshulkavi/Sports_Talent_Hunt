// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// App.js

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingSpinner from './src/components/common/LoadingSpinner';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
          <FlashMessage position="top" />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
