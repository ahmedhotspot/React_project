import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faUser,
  faIdCard,
  faMapMarkerAlt,
  faCalendarAlt,
  faArrowLeft,
  faArrowRight,
  faCamera,
  faImages,
  faLock,
  faEdit,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import Sidebar from '../components/Sidebar';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { styles } from '../styles/ProfileScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const ProfileScreen = ({ username = 'jorie', onNavigateBack, onLogout }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    username: username,
    nationalId: '',
    city: '',
    phoneNumber: '',
    idExpiryDate: '',
  });

  useEffect(() => {
    loadProfileData();
    loadProfileImage();
  }, []);

  const loadProfileData = async () => {
    try {
      // محاولة تحميل البيانات من AsyncStorage
      const savedData = await AsyncStorage.getItem('userProfile');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProfileData({
          username: parsedData.username || username,
          nationalId: parsedData.nationalId || '',
          city: parsedData.city || '',
          phoneNumber: parsedData.phoneNumber || '',
          idExpiryDate: parsedData.idExpiryDate || '',
        });
      } else {
        // إذا لم تكن هناك بيانات محفوظة، استخدم البيانات الافتراضية
        // يمكنك استبدالها ببيانات من API أو مصدر آخر
        setProfileData({
          username: username,
          nationalId: '1234567890',
          city: t('form.cityRiyadh'),
          phoneNumber: '0501234567',
          idExpiryDate: '2025-12-31',
        });
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      // في حالة الخطأ، استخدم البيانات الافتراضية
      setProfileData({
        username: username,
        nationalId: '1234567890',
        city: t('form.cityRiyadh'),
        phoneNumber: '0501234567',
        idExpiryDate: '2025-12-31',
      });
    }
  };

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('userProfileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const saveProfileImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('userProfileImage', imageUri);
      setProfileImage(imageUri);
    } catch (error) {
      console.error('Error saving profile image:', error);
      Alert.alert(t('profile.error'), t('profile.errorSavingImage'));
    }
  };

  const handleSelectImageSource = async (source) => {
    setImagePickerModalVisible(false);
    let result;

    try {
      if (source === 'camera') {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(t('profile.permissionRequired'), t('profile.cameraPermissionMessage'));
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else if (source === 'gallery') {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(t('profile.permissionRequired'), t('profile.galleryPermissionMessage'));
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        await saveProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert(t('profile.error'), t('profile.errorSelectingImage'));
    }
  };

  const getCityLabel = (cityValue) => {
    const cityMap = {
      'riyadh': t('form.cityRiyadh'),
      'jeddah': t('form.cityJeddah'),
      'dammam': t('form.cityDammam'),
      'khobar': t('form.cityKhobar'),
      'mecca': t('form.cityMecca'),
    };
    return cityMap[cityValue] || cityValue || profileData.city;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString(rtl ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { flexDirection, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Logo width={120} height={40} />
          </View>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateBack}
          >
            <FontAwesomeIcon 
              icon={rtl ? faArrowRight : faArrowLeft} 
              size={22} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>

        {/* Profile Title */}
        <View style={styles.titleSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => setImagePickerModalVisible(true)}
            activeOpacity={0.8}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.surface }]}>
                <FontAwesomeIcon icon={faUser} size={40} color={colors.primary} />
              </View>
            )}
            <View style={[styles.editImageIcon, { backgroundColor: colors.primary }]}>
              <FontAwesomeIcon icon={faEdit} size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.title, { textAlign, color: colors.text }]}>
            {t('profile.title')}
          </Text>
        </View>

        {/* Profile Information Cards */}
        <View style={styles.infoContainer}>
          {/* Username */}
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.infoHeader, { flexDirection }]}>
              <FontAwesomeIcon icon={faUser} size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { textAlign, color: colors.textSecondary }]}>
                {t('profile.username')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { textAlign, color: colors.text }]}>
              {profileData.username}
            </Text>
          </View>

          {/* National ID */}
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.infoHeader, { flexDirection }]}>
              <FontAwesomeIcon icon={faIdCard} size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { textAlign, color: colors.textSecondary }]}>
                {t('profile.nationalId')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { textAlign, color: colors.text }]}>
              {profileData.nationalId || t('profile.notAvailable')}
            </Text>
          </View>

          {/* City */}
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.infoHeader, { flexDirection }]}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { textAlign, color: colors.textSecondary }]}>
                {t('profile.city')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { textAlign, color: colors.text }]}>
              {getCityLabel(profileData.city) || t('profile.notAvailable')}
            </Text>
          </View>

          {/* Phone Number */}
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.infoHeader, { flexDirection }]}>
              <FontAwesomeIcon icon={faPhone} size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { textAlign, color: colors.textSecondary }]}>
                {t('profile.phoneNumber')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { textAlign, color: colors.text }]}>
              {profileData.phoneNumber || t('profile.notAvailable')}
            </Text>
          </View>

          {/* ID Expiry Date */}
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.infoHeader, { flexDirection }]}>
              <FontAwesomeIcon icon={faCalendarAlt} size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { textAlign, color: colors.textSecondary }]}>
                {t('profile.idExpiryDate')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { textAlign, color: colors.text }]}>
              {formatDate(profileData.idExpiryDate) || t('profile.notAvailable')}
            </Text>
          </View>
        </View>

        {/* Change Password Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.changePasswordButton, { backgroundColor: colors.surface }]}
            onPress={() => setChangePasswordModalVisible(true)}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon icon={faLock} size={20} color={colors.primary} />
            <Text style={[styles.changePasswordText, { textAlign, color: colors.primary }]}>
              {t('profile.changePassword')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        visible={imagePickerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setImagePickerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { textAlign, color: colors.text }]}>
              {t('profile.selectImageSource')}
            </Text>
            
            <TouchableOpacity
              style={[styles.modalOption, { flexDirection, backgroundColor: colors.background }]}
              onPress={() => handleSelectImageSource('gallery')}
            >
              <FontAwesomeIcon icon={faImages} size={24} color={colors.primary} />
              <Text style={[styles.modalOptionText, { textAlign, color: colors.text }]}>
                {t('profile.selectFromGallery')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { flexDirection, backgroundColor: colors.background }]}
              onPress={() => handleSelectImageSource('camera')}
            >
              <FontAwesomeIcon icon={faCamera} size={24} color={colors.primary} />
              <Text style={[styles.modalOptionText, { textAlign, color: colors.text }]}>
                {t('profile.takePhoto')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setImagePickerModalVisible(false)}
            >
              <Text style={[styles.modalCancelText, { textAlign, color: colors.textSecondary }]}>
                {t('profile.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
      />

      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="profile"
        onLogout={onLogout}
      />
    </View>
  );
};

export default ProfileScreen;

