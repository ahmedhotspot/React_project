import { StyleSheet, Dimensions, Platform } from 'react-native';

// Calculate responsive sizes dynamically
export const getResponsiveSize = (baseSize, screenWidth) => {
  const scale = screenWidth / 375; // Base width (iPhone X)
  return Math.max(baseSize * scale, baseSize * 0.8); // Minimum 80% of base size
};

// Function to check device type dynamically
export const getDeviceType = (screenWidth) => {
  return {
    isSmallDevice: screenWidth < 375,
    isTablet: screenWidth >= 768,
  };
};

// Function to calculate modal width dynamically
export const getModalWidth = (screenWidth) => {
  if (screenWidth < 375) {
    return Math.min(screenWidth * 0.86, 320);
  } else if (screenWidth >= 768) {
    return Math.min(380, screenWidth * 0.42);
  } else {
    return Math.min(340, screenWidth * 0.82);
  }
};

// Function to calculate modal max height dynamically
export const getModalMaxHeight = (screenHeight) => {
  return screenHeight * 0.7;
};

// Base styles - will be enhanced with dynamic values
export const getStyles = (dimensions) => {
  const { width, height } = dimensions;
  const { isSmallDevice, isTablet } = getDeviceType(width);
  
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isSmallDevice ? 18 : isTablet ? 28 : 22,
    },
    overlayTouchable: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: isTablet ? 18 : 14,
      maxWidth: '88%',
      maxHeight: getModalMaxHeight(height),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 6,
    },
    closeButton: {
      position: 'absolute',
      top: isSmallDevice ? 8 : 10,
      zIndex: 10,
      width: getResponsiveSize(28, width),
      height: getResponsiveSize(28, width),
      borderRadius: getResponsiveSize(14, width),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      paddingTop: isSmallDevice ? 16 : isTablet ? 22 : 18,
      paddingBottom: isSmallDevice ? 10 : 12,
    },
    iconCircle: {
      width: getResponsiveSize(isTablet ? 70 : 58, width),
      height: getResponsiveSize(isTablet ? 70 : 58, width),
      borderRadius: getResponsiveSize(isTablet ? 35 : 29, width),
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconCircleLocation: {
      backgroundColor: '#E62130',
      // Gradient effect simulation
      borderWidth: 2,
      borderColor: '#F44336',
    },
    iconCircleNotifications: {
      backgroundColor: '#E62130',
      // Gradient effect simulation
      borderWidth: 2,
      borderColor: '#F44336',
    },
    content: {
      paddingHorizontal: isSmallDevice ? 16 : isTablet ? 22 : 20,
      paddingBottom: isSmallDevice ? 16 : 20,
    },
    title: {
      fontSize: getResponsiveSize(isTablet ? 20 : 17.5, width),
      fontWeight: '700',
      color: '#2C3E50',
      marginBottom: isSmallDevice ? 6 : 8,
      textAlign: 'center',
    },
    description: {
      fontSize: getResponsiveSize(isTablet ? 14 : 12.8, width),
      color: '#666666',
      lineHeight: getResponsiveSize(isTablet ? 20 : 18, width),
      marginBottom: isSmallDevice ? 16 : 20,
      textAlign: 'center',
    },
    benefitsContainer: {
      marginBottom: isSmallDevice ? 18 : 22,
      gap: isSmallDevice ? 9 : 11,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isSmallDevice ? 9 : 11,
    },
    benefitIcon: {
      width: getResponsiveSize(isTablet ? 22 : 19, width),
      height: getResponsiveSize(isTablet ? 22 : 19, width),
      borderRadius: getResponsiveSize(isTablet ? 11 : 9.5, width),
      justifyContent: 'center',
      alignItems: 'center',
    },
    benefitIconLocation: {
      backgroundColor: '#E62130',
    },
    benefitIconNotifications: {
      backgroundColor: '#E62130',
    },
    benefitText: {
      flex: 1,
      fontSize: getResponsiveSize(isTablet ? 13 : 12, width),
      color: '#555555',
      lineHeight: getResponsiveSize(isTablet ? 19 : 17, width),
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: isSmallDevice ? 9 : 11,
    },
    button: {
      flex: 1,
      borderRadius: isTablet ? 10 : 8,
      paddingVertical: isSmallDevice ? 12 : isTablet ? 14 : 12,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: getResponsiveSize(isTablet ? 46 : 42, width),
    },
    denyButton: {
      backgroundColor: '#F5F5F5',
      borderWidth: 2,
      borderColor: '#E0E0E0',
    },
    denyButtonText: {
      fontSize: getResponsiveSize(isTablet ? 14 : 13, width),
      fontWeight: '600',
      color: '#666666',
    },
    allowButtonLocation: {
      backgroundColor: '#E62130',
    },
    allowButtonNotifications: {
      backgroundColor: '#E62130',
    },
    allowButtonText: {
      fontSize: getResponsiveSize(isTablet ? 14 : 13, width),
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
};

// Export default styles for backward compatibility (using initial dimensions)
const initialDimensions = Dimensions.get('window');
export const styles = getStyles(initialDimensions);


