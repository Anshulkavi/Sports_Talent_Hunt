// src/components/common/Modal.jsx
import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Modal = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  const sizeClasses = {
    sm: 'w-11/12 max-w-sm',
    md: 'w-11/12 max-w-md',
    lg: 'w-11/12 max-w-lg',
    xl: 'w-11/12 max-w-xl'
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <TouchableWithoutFeedback>
            <View className={`bg-white rounded-2xl ${sizeClasses[size]} max-h-4/5`}>
              {(title || showCloseButton) && (
                <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
                  <Text className="text-lg font-bold text-gray-900 flex-1">
                    {title}
                  </Text>
                  {showCloseButton && (
                    <TouchableOpacity onPress={onClose} className="p-1">
                      <Ionicons name="close" size={24} color="#6b7280" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View className="p-4">
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;