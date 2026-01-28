import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faBars, faClock } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/OffersScreen.styles';
import { useLanguage } from '../locales';

const OffersScreen = ({ onNavigateBack, product, onLogout, onApply }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Format amount with commas
  const formatAmount = (amount) => {
    if (!amount) return '200,000';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Mock data - في التطبيق الحقيقي سيتم جلب هذه البيانات من API بناءً على المبلغ والمدة
  const offers = [
    {
      id: 1,
      bankName: 'ALINMA',
      bankNameAr: 'مصرف الإنماء',
      logo: null, // ستحتاج لإضافة الشعارات
      financingAmount: formatAmount(product?.amount),
      financingPeriod: `${product?.duration || '54'} شهر`,
      apr: '2.5%',
      totalProfit: '22,500.0',
      totalInstallments: '222,500.0',
      monthlyInstallment: '4,120.4',
    },
    {
      id: 2,
      bankName: 'FIRST ABU DHABI BANK (FAB)',
      bankNameAr: 'بنك أبوظبي الأول',
      logo: null, // ستحتاج لإضافة الشعارات
      financingAmount: formatAmount(product?.amount),
      financingPeriod: `${product?.duration || '54'} شهر`,
      apr: '9.5%',
      totalProfit: '85,500.0',
      totalInstallments: '285,500.0',
      monthlyInstallment: '5,287.0',
    },
  ];

  const handleApply = (offer) => {
    if (onApply) {
      onApply({
        ...product,
        selectedOffer: offer,
      });
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
          {/* 24 Hours Notice */}
          <View style={[styles.noticeContainer, { flexDirection }]}>
            <View style={styles.noticeIcon}>
              <Text style={styles.noticeIconText}>24</Text>
            </View>
            <Text style={[styles.noticeText, { textAlign }]}>
              {t('offers.validFor24Hours')}
            </Text>
          </View>

          {/* Offers List */}
          {offers.map((offer, index) => (
            <View key={offer.id}>
              <View style={styles.offerCard}>
                {/* Card Header */}
                <View style={[styles.cardHeader, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
                  <View style={styles.bankInfo}>
                    <Text style={[styles.bankName, { textAlign }]}>
                      {offer.bankName}
                    </Text>
                    <Text style={[styles.bankNameAr, { textAlign }]}>
                      {offer.bankNameAr}
                    </Text>
                  </View>
                  <View style={styles.logoContainer}>
                    {offer.logo ? (
                      <Image
                        source={offer.logo}
                        style={styles.bankLogo}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoPlaceholderText}>
                          {offer.bankNameAr}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Financing Amount Highlight */}
                <View style={styles.monthlyHighlight}>
                  <Text style={[styles.monthlyLabel, { textAlign }]}>
                    {t('offers.financingAmount')}
                  </Text>
                  <Text style={[styles.monthlyValue, { textAlign }]}>
                    {t('common.sar')} {offer.financingAmount}
                  </Text>
                </View>

                {/* Offer Details */}
                <View style={styles.detailsContainer}>
                  <View style={styles.detailsLeft}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { textAlign }]}>
                        {t('offers.monthlyInstallment')}
                      </Text>
                      <Text style={[styles.detailValue, { textAlign }]}>
                        {t('common.sar')} {offer.monthlyInstallment}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { textAlign }]}>
                        {t('offers.financingPeriod')}
                      </Text>
                      <Text style={[styles.detailValue, { textAlign }]}>
                        {offer.financingPeriod}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { textAlign }]}>
                        {t('offers.apr')}
                      </Text>
                      <Text style={[styles.detailValue, { textAlign }]}>
                        {offer.apr}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { textAlign }]}>
                        {t('offers.totalProfit')}
                      </Text>
                      <Text style={[styles.detailValue, { textAlign }]}>
                        {t('common.sar')} {offer.totalProfit}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { textAlign }]}>
                        {t('offers.totalInstallments')}
                      </Text>
                      <Text style={[styles.detailValue, { textAlign }]}>
                        {t('common.sar')} {offer.totalInstallments}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Apply Button */}
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => handleApply(offer)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.applyButtonText}>
                    {t('offers.applyNow')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 24 Hours Notice between cards */}
              {index < offers.length - 1 && (
                <View style={[styles.noticeContainer, { flexDirection, marginTop: 15, marginBottom: 15 }]}>
                  <View style={styles.noticeIcon}>
                    <Text style={styles.noticeIconText}>24</Text>
                  </View>
                  <Text style={[styles.noticeText, { textAlign }]}>
                    {t('offers.validFor24Hours')}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
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

export default OffersScreen;

