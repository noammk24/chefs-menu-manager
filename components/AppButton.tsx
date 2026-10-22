import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'cancel';
};

const AppButton = ({
  title,
  onPress,
  type = 'primary',
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={type === 'primary' ? styles.primaryButton : styles.cancelButton}
      onPress={onPress}>
      <Text
        style={type === 'primary' ? styles.primaryText : styles.cancelText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default AppButton;
