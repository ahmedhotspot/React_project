import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ToggleSwitch = ({ value, onValueChange, disabled = false }) => {
  const [animatedValue] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#BDC3C7', '#E62130'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (!disabled && onValueChange) {
          onValueChange(!value);
        }
      }}
      disabled={disabled}
    >
      <View style={[styles.container, value && styles.containerActive, disabled && styles.disabled]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX }],
              backgroundColor: value ? '#FFFFFF' : '#FFFFFF',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#BDC3C7',
    justifyContent: 'center',
    padding: 2,
  },
  containerActive: {
    backgroundColor: '#E62130',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ToggleSwitch;

