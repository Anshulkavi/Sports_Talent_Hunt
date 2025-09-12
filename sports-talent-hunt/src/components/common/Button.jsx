// src/components/common/Button.jsx

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-xl flex-row items-center justify-center';
  
  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    outline: 'border-2 border-primary-500 bg-transparent',
    ghost: 'bg-transparent',
    danger: 'bg-red-500',
  };

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-primary-500 font-semibold',
    ghost: 'text-primary-500 font-semibold',
    danger: 'text-white font-semibold',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'primary' || variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        className={`${disabled ? 'opacity-50' : ''}`}
        {...props}
      >
        <LinearGradient
          colors={variant === 'primary' ? ['#22c55e', '#16a34a'] : ['#f97316', '#ea580c']}
          className={`${baseClasses} ${sizeClasses[size]} ${className}`}
        >
          {loading && <ActivityIndicator size="small" color="white" className="mr-2" />}
          {icon && !loading && icon}
          <Text className={`${textClasses[variant]} ${textSizeClasses[size]} ${icon ? 'ml-2' : ''}`}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      {...props}
    >
      {loading && <ActivityIndicator size="small" color="#22c55e" className="mr-2" />}
      {icon && !loading && icon}
      <Text className={`${textClasses[variant]} ${textSizeClasses[size]} ${icon ? 'ml-2' : ''}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;