// src/components/layout/SafeAreaWrapper.jsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children, className = '', style, ...props }) => {
  return (
    <SafeAreaView 
      className={`flex-1 bg-gray-50 ${className}`} 
      style={style}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;