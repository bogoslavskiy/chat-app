import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    style={{ paddingHorizontal: 10 }}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={{ color: '#007BFF', fontSize: 17, fontWeight: '500' }}>
      {Platform.OS === 'android' ? title.toUpperCase() : title}
    </Text>
  </TouchableOpacity>
);