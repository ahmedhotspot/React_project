import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload, faFile, faCheckCircle, faFolder, faImages, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../locales';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from '../../styles/DocumentsStep.styles';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const DocumentsStep = ({ data, onDataChange }) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const rtl = isRTL();

  const [localData, setLocalData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [conditionsModalVisible, setConditionsModalVisible] = useState(false);
  const [selectedDocKey, setSelectedDocKey] = useState(null);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);

  useEffect(() => {
    // Show conditions modal when component mounts
    setConditionsModalVisible(true);
  }, []);

  const requiredDocuments = [
    { key: 'nationalId', label: t('form.docNationalId') },
    { key: 'bankIban', label: t('form.docBankIban') },
    { key: 'salaryCertificate', label: t('form.docSalaryCertificate') },
    { key: 'bankStatement', label: t('form.docBankStatement') },
    { key: 'otherDocuments', label: t('form.docOtherDocuments') },
  ];

  const handleDocumentPress = (docKey) => {
    setSelectedDocKey(docKey);
    setModalVisible(true);
  };

  const calculateTotalSize = () => {
    if (!localData.documents || localData.documents.length === 0) {
      return 0;
    }
    return localData.documents.reduce((total, doc) => {
      return total + (doc.size || 0);
    }, 0);
  };

  const validateFile = (file) => {
    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10 MB total for all files
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedPdfType = 'application/pdf';
    const allowedTypes = [...allowedImageTypes, allowedPdfType];

    // Check file type - reject videos and audio
    const fileType = (file.mimeType || file.type || '').toLowerCase();
    
    // Reject videos
    if (fileType.startsWith('video/')) {
      Alert.alert(
        t('form.invalidFileType'),
        t('form.videosNotAllowed') || 'الفيديوهات غير مسموحة'
      );
      return false;
    }

    // Reject audio
    if (fileType.startsWith('audio/')) {
      Alert.alert(
        t('form.invalidFileType'),
        t('form.audioNotAllowed') || 'الصوتيات غير مسموحة'
      );
      return false;
    }

    // Check if file type is allowed (only images and PDF)
    if (!allowedTypes.includes(fileType)) {
      Alert.alert(
        t('form.invalidFileType'),
        t('form.invalidFileTypeMessage')
      );
      return false;
    }

    // Check total size (existing files + new file)
    const currentTotalSize = calculateTotalSize();
    const existingIndex = localData.documents?.findIndex(doc => doc.key === selectedDocKey) ?? -1;
    const existingFileSize = existingIndex >= 0 ? (localData.documents[existingIndex].size || 0) : 0;
    const newFileSize = file.size || 0;
    const newTotalSize = currentTotalSize - existingFileSize + newFileSize;

    if (newTotalSize > MAX_TOTAL_SIZE) {
      Alert.alert(
        t('form.totalSizeExceeded') || 'تم تجاوز الحد الأقصى',
        t('form.totalSizeExceededMessage') || 'الحد الأقصى لمجموع الملفات هو 10 ميجابايت'
      );
      return false;
    }

    return true;
  };

  const handleSelectSource = async (source) => {
    setModalVisible(false);
    let result;

    try {
      if (source === 'camera') {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert('Permission Required', 'Camera permission is required to take photos.');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });
      } else if (source === 'gallery') {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert('Permission Required', 'Gallery permission is required to select images.');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });
      } else if (source === 'files') {
        result = await DocumentPicker.getDocumentAsync({
          type: ['image/*', 'application/pdf'],
          copyToCacheDirectory: true,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Validate file
        if (!validateFile(file)) {
          return;
        }

        const updatedDocuments = [...(localData.documents || [])];
        const existingIndex = updatedDocuments.findIndex(doc => doc.key === selectedDocKey);
        
        const documentData = {
          key: selectedDocKey,
          uploaded: true,
          uri: file.uri,
          name: file.name || `document_${selectedDocKey}`,
          type: file.mimeType || file.type || 'application/octet-stream',
          size: file.size || 0,
        };
        
        if (existingIndex >= 0) {
          updatedDocuments[existingIndex] = documentData;
        } else {
          updatedDocuments.push(documentData);
        }
        
        setLocalData({ ...localData, documents: updatedDocuments });
      } else if (!result.canceled && result.uri) {
        // For DocumentPicker result format
        const file = {
          uri: result.uri,
          name: result.name || `document_${selectedDocKey}`,
          mimeType: result.mimeType || 'application/octet-stream',
          size: result.size || 0,
        };

        // Validate file
        if (!validateFile(file)) {
          return;
        }

        const updatedDocuments = [...(localData.documents || [])];
        const existingIndex = updatedDocuments.findIndex(doc => doc.key === selectedDocKey);
        
        const documentData = {
          key: selectedDocKey,
          uploaded: true,
          uri: result.uri,
          name: result.name || `document_${selectedDocKey}`,
          type: result.mimeType || 'application/octet-stream',
          size: result.size || 0,
        };
        
        if (existingIndex >= 0) {
          updatedDocuments[existingIndex] = documentData;
        } else {
          updatedDocuments.push(documentData);
        }
        
        setLocalData({ ...localData, documents: updatedDocuments });
      }
    } catch (error) {
      console.error('Error selecting document:', error);
      Alert.alert('Error', 'Failed to select document. Please try again.');
    }
  };

  const isDocumentUploaded = (docKey) => {
    return localData.documents?.some(doc => doc.key === docKey && doc.uploaded);
  };

  return (
    <View>
      <Text style={[styles.mainTitle, { textAlign }]}>
        {t('form.step5Title')}
      </Text>

      <Text style={{ fontSize: 14, color: '#666666', marginBottom: 20, textAlign }}>
        {t('form.documentsDescription')}
      </Text>

      {requiredDocuments.map((doc) => {
        const isUploaded = isDocumentUploaded(doc.key);
        return (
          <TouchableOpacity
            key={doc.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: isUploaded ? (colors?.surface || '#E8F5E9') : (colors?.surface || '#FFFFFF'),
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
              borderWidth: 2,
              borderColor: isUploaded ? '#4CAF50' : (colors?.border || '#E0E0E0'),
            }}
            onPress={() => handleDocumentPress(doc.key)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <FontAwesomeIcon
                icon={isUploaded ? faCheckCircle : faFile}
                size={20}
                color={isUploaded ? '#4CAF50' : '#999999'}
                style={{ marginRight: 12 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#2C3E50', flex: 1 }}>
                {doc.label}
              </Text>
            </View>
            <FontAwesomeIcon
              icon={faUpload}
              size={18}
              color={isUploaded ? '#4CAF50' : '#E62130'}
            />
          </TouchableOpacity>
        );
      })}

      {/* Conditions Modal */}
      <Modal
        visible={conditionsModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConditionsModalVisible(false)}
      >
        <View style={styles.conditionsModalOverlay}>
          <View style={styles.conditionsModalContent}>
            <Text style={[styles.conditionsTitle, { textAlign }]}>
              {t('form.uploadConditionsTitle')}
            </Text>
            
            <Text style={[styles.conditionsSubtitle, { textAlign }]}>
              {t('form.uploadConditionsSubtitle')}
            </Text>

            <View style={styles.conditionsList}>
              <View style={[styles.conditionItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.conditionText, { textAlign, flex: 1 }]}>
                  {t('form.uploadCondition1')}
                </Text>
              </View>

              <View style={[styles.conditionItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.conditionText, { textAlign, flex: 1 }]}>
                  {t('form.uploadCondition2')}
                </Text>
              </View>

              <View style={[styles.conditionItem, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.conditionText, { textAlign, flex: 1 }]}>
                  {t('form.uploadCondition3')}
                </Text>
              </View>
            </View>

            <Text style={[styles.conditionNote, { textAlign }]}>
              {t('form.uploadConditionNote')}
            </Text>

            <TouchableOpacity
              style={styles.understandButton}
              onPress={() => setConditionsModalVisible(false)}
            >
              <Text style={styles.understandButtonText}>
                {t('form.understand')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Source Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalHeader, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
              <Text style={[styles.modalTitle, { textAlign }]}>
                {t('form.selectDocumentSource')}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesomeIcon icon={faTimes} size={20} color="#666666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.optionButton, { flexDirection: rtl ? 'row-reverse' : 'row' }]}
              onPress={() => handleSelectSource('files')}
            >
              <Text style={[styles.optionText, { textAlign }]}>
                {t('form.openFiles')}
              </Text>
              <FontAwesomeIcon icon={faFolder} size={20} color="#E62130" style={styles.optionIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, { flexDirection: rtl ? 'row-reverse' : 'row' }]}
              onPress={() => handleSelectSource('gallery')}
            >
              <Text style={[styles.optionText, { textAlign }]}>
                {t('form.openGallery')}
              </Text>
              <FontAwesomeIcon icon={faImages} size={20} color="#E62130" style={styles.optionIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, { flexDirection: rtl ? 'row-reverse' : 'row' }]}
              onPress={() => handleSelectSource('camera')}
            >
              <Text style={[styles.optionText, { textAlign }]}>
                {t('form.openCamera')}
              </Text>
              <FontAwesomeIcon icon={faCamera} size={20} color="#E62130" style={styles.optionIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default DocumentsStep;

