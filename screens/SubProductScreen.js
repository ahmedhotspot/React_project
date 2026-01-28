import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faBars, faWallet, faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/SubProductScreen.styles';
import { useLanguage } from '../locales';

const SubProductScreen = ({ onNavigateBack, product, onLogout, onContinue }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSubProduct, setSelectedSubProduct] = useState(null);

  const subProducts = [
    {
      id: 1,
      title: t('subProducts.murabaha'),
      key: 'murabaha',
    },
    {
      id: 2,
      title: t('subProducts.murabahaRefinancing'),
      key: 'murabahaRefinancing',
    },
    {
      id: 3,
      title: t('subProducts.tawarruq'),
      key: 'tawarruq',
    },
  ];

  const handleSubProductSelect = (subProduct) => {
    setSelectedSubProduct(subProduct.id === selectedSubProduct ? null : subProduct.id);
  };

  const handleContinue = () => {
    if (selectedSubProduct && onContinue) {
      const selected = subProducts.find(sp => sp.id === selectedSubProduct);
      onContinue({
        ...product,
        subProduct: selected,
      });
    }
  };

  const handleCancel = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={[styles.header, { flexDirection }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color="#E62130" />
          </TouchableOpacity>
          
          {onNavigateBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateBack}
              activeOpacity={0.7}
            >
              <View style={styles.logoCircle}>
                <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color="#E62130" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Label */}
          <View style={styles.productLabelContainer}>
            <Text style={[styles.productLabel, { textAlign }]}>
              {t('subProducts.product')}
            </Text>
            <View style={styles.productBadge}>
              <Text style={styles.productBadgeText}>
                {product?.title || t('subProducts.personalFinance')}
              </Text>
            </View>
          </View>

          {/* Sub-Product Title */}
          <Text style={[styles.subProductTitle, { textAlign }]}>
            {t('subProducts.selectSubProduct')}
          </Text>

          {/* Sub-Products List */}
          <View style={styles.subProductsContainer}>
            {subProducts.map((subProduct) => (
              <TouchableOpacity
                key={subProduct.id}
                style={[
                  styles.subProductCard,
                  selectedSubProduct === subProduct.id && styles.subProductCardSelected,
                ]}
                onPress={() => handleSubProductSelect(subProduct)}
                activeOpacity={0.7}
              >
                <View style={[styles.subProductContent, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                  {/* Icon on the left */}
                  <View style={styles.subProductIconContainer}>
                    <FontAwesomeIcon icon={faWallet} size={32} color="#E62130" />
                  </View>
                  
                  {/* Text in the middle */}
                  <View style={styles.subProductTextContainer}>
                    <Text style={[styles.subProductText, { textAlign }]}>
                      {subProduct.title}
                    </Text>
                  </View>
                  
                  {/* Checkbox on the right */}
                  <View style={styles.checkboxContainer}>
                    <FontAwesomeIcon
                      icon={selectedSubProduct === subProduct.id ? faSquareCheck : faSquare}
                      size={22}
                      color={selectedSubProduct === subProduct.id ? '#E62130' : '#999'}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedSubProduct && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={!selectedSubProduct}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedSubProduct && styles.continueButtonTextDisabled,
            ]}>
              {t('subProducts.continue')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>
              {t('subProducts.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="home"
        onLogout={onLogout}
      />
    </View>
  );
};

export default SubProductScreen;

