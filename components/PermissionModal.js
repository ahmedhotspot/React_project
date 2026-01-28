import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt, faBell, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getStyles, getModalWidth } from '../styles/PermissionModal.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const PermissionModal = ({ 
  visible, 
  type, // 'location' or 'notifications'
  onAllow, 
  onDeny,
  onClose 
}) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const rtl = isRTL();
  
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);
  
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const iconScaleAnim = React.useRef(new Animated.Value(0.5)).current;
  
  // Calculate responsive icon size
  const iconSize = dimensions.width >= 768 ? 30 : dimensions.width < 375 ? 24 : 28;
  const checkIconSize = dimensions.width >= 768 ? 14 : dimensions.width < 375 ? 10 : 12;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
          delay: 100,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      iconScaleAnim.setValue(0.5);
    }
  }, [visible]);

  const isLocation = type === 'location';
  const icon = isLocation ? faMapMarkerAlt : faBell;
  const title = isLocation ? t('permissions.locationTitle') : t('permissions.notificationsTitle');
  const description = isLocation ? t('permissions.locationDescription') : t('permissions.notificationsDescription');
  const allowText = t('permissions.allow');
  const denyText = t('permissions.deny');

  // Get dynamic styles based on current dimensions
  const styles = getStyles(dimensions);

  const handleAllow = () => {
    if (onAllow) {
      onAllow();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleDeny = () => {
    if (onDeny) {
      onDeny();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: opacityAnim,
          }
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        >
              <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: scaleAnim }],
                backgroundColor: colors.surface,
                width: getModalWidth(dimensions.width),
              }
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <TouchableOpacity
                style={[styles.closeButton, { [rtl ? 'left' : 'right']: 15 }]}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <FontAwesomeIcon icon={faTimes} size={16} color={colors.textSecondary} />
              </TouchableOpacity>

              {/* Icon Container with Animation */}
              <View style={styles.iconContainer}>
                <Animated.View
                  style={[
                    styles.iconCircle,
                    isLocation ? styles.iconCircleLocation : styles.iconCircleNotifications,
                    {
                      transform: [{ scale: iconScaleAnim }],
                    }
                  ]}
                >
                  <FontAwesomeIcon 
                    icon={icon} 
                    size={iconSize} 
                    color="#FFFFFF" 
                  />
                </Animated.View>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Text style={[styles.title, { textAlign, color: colors.text }]}>
                  {title}
                </Text>
                <Text style={[styles.description, { textAlign, color: colors.textSecondary }]}>
                  {description}
                </Text>

                {/* Benefits List */}
                <View style={styles.benefitsContainer}>
                  {isLocation ? (
                    <>
                      {/* <View style={[styles.benefitItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                        <View style={[styles.benefitIcon, styles.benefitIconLocation]}>
                          <FontAwesomeIcon icon={faCheckCircle} size={checkIconSize} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.benefitText, { textAlign }]}>
                          {t('permissions.locationBenefit1')}
                        </Text>
                      </View> */}
                      <View style={[styles.benefitItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                        <View style={[styles.benefitIcon, styles.benefitIconLocation]}>
                          <FontAwesomeIcon icon={faCheckCircle} size={checkIconSize} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.benefitText, { textAlign }]}>
                          {t('permissions.locationBenefit2')}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={[styles.benefitItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                        <View style={[styles.benefitIcon, styles.benefitIconNotifications]}>
                          <FontAwesomeIcon icon={faCheckCircle} size={checkIconSize} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.benefitText, { textAlign }]}>
                          {t('permissions.notificationsBenefit1')}
                        </Text>
                      </View>
                      <View style={[styles.benefitItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                        <View style={[styles.benefitIcon, styles.benefitIconNotifications]}>
                          <FontAwesomeIcon icon={faCheckCircle} size={checkIconSize} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.benefitText, { textAlign }]}>
                          {t('permissions.notificationsBenefit2')}
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                {/* Buttons */}
                <View style={[styles.buttonsContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                  <TouchableOpacity
                    style={[styles.button, styles.denyButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={handleDeny}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.denyButtonText, { color: colors.text }]}>
                      {denyText}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, isLocation ? styles.allowButtonLocation : styles.allowButtonNotifications, { backgroundColor: colors.primary }]}
                    onPress={handleAllow}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.allowButtonText}>
                      {allowText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default PermissionModal;

