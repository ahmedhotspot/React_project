import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles/Logo.styles';

const Logo = ({ width = 200, height = 80 }) => {
  // First try logo.png (new logo), if it doesn't exist, it will use Icon.png
  // Note: In React Native, you need to have the file in assets folder
  // Save the new logo as: assets/logo.png
  
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={[styles.logo, { width, height }]}
        resizeMode="contain"
        onError={(error) => {
          console.log('Error loading logo.png, make sure the file exists in assets folder');
        }}
      />
    </View>
  );
};

export default Logo;
