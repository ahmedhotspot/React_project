import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import InputField from '../../components/InputField';
import DatePicker from '../../components/DatePicker';
import { useLanguage } from '../../locales';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from '../../styles/PersonalInfoStep.styles';
import { faFileContract, faUsers, faGraduationCap, faHome, faBriefcase, faSchool, faVenusMars, faUserTie, faIdCard, faBuilding, faCalendar, faLandmark } from '@fortawesome/free-solid-svg-icons';

const PersonalInfoStep = ({ data, onDataChange }) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const rtl = isRTL();

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);

  const genderOptions = [
    { label: t('form.genderMale'), value: 'male' },
    { label: t('form.genderFemale'), value: 'female' },
  ];

  const maritalStatusOptions = [
    { label: t('form.maritalStatusSingle'), value: 'single' },
    { label: t('form.maritalStatusMarried'), value: 'married' },
    { label: t('form.maritalStatusDivorced'), value: 'divorced' },
    { label: t('form.maritalStatusWidowed'), value: 'widowed' },
  ];

  const nationalityOptions = [
    { label: t('form.nationalitySaudi'), value: 'saudi' },
    { label: t('form.nationalityResident'), value: 'resident' },
  ];

  const cityOptions = [
    { label: t('form.cityRiyadh'), value: 'riyadh' },
    { label: t('form.cityJeddah'), value: 'jeddah' },
    { label: t('form.cityDammam'), value: 'dammam' },
    { label: t('form.cityKhobar'), value: 'khobar' },
    { label: t('form.cityMecca'), value: 'mecca' },
  ];

  const financingPurposeOptions = [
    { label: t('form.financingPurposePersonal'), value: 'personal' },
    { label: t('form.financingPurposeRealEstate'), value: 'realEstate' },
    { label: t('form.financingPurposeCar'), value: 'car' },
    { label: t('form.financingPurposeEducation'), value: 'education' },
    { label: t('form.financingPurposeBusiness'), value: 'business' },
    { label: t('form.financingPurposeOther'), value: 'other' },
  ];

  const housingTypeOptions = [
    { label: t('form.housingTypeOwned'), value: 'owned' },
    { label: t('form.housingTypeRented'), value: 'rented' },
    { label: t('form.housingTypeFamily'), value: 'family' },
    { label: t('form.housingTypeOther'), value: 'other' },
  ];

  const employmentStatusOptions = [
    { label: t('form.employmentStatusEmployed'), value: 'employed' },
    { label: t('form.employmentStatusSelfEmployed'), value: 'selfEmployed' },
    { label: t('form.employmentStatusUnemployed'), value: 'unemployed' },
    { label: t('form.employmentStatusRetired'), value: 'retired' },
  ];

  const educationLevelOptions = [
    { label: t('form.educationLevelHighSchool'), value: 'highSchool' },
    { label: t('form.educationLevelDiploma'), value: 'diploma' },
    { label: t('form.educationLevelBachelor'), value: 'bachelor' },
    { label: t('form.educationLevelMaster'), value: 'master' },
    { label: t('form.educationLevelPhD'), value: 'phd' },
  ];

  const familyMembersOptions = Array.from({ length: 20 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const educationFeesOptions = [
    { label: t('form.educationFeesNone'), value: '0' },
    { label: '500 - 1,000 ' + t('form.currency'), value: '500-1000' },
    { label: '1,000 - 2,000 ' + t('form.currency'), value: '1000-2000' },
    { label: '2,000 - 5,000 ' + t('form.currency'), value: '2000-5000' },
    { label: '5,000 - 10,000 ' + t('form.currency'), value: '5000-10000' },
    { label: '10,000+ ' + t('form.currency'), value: '10000+' },
  ];

  const jobTypeOptions = [
    { label: t('form.jobTypeEmployed'), value: 'employed' },
    { label: t('form.jobTypeRetired'), value: 'retired' },
    { label: t('form.jobTypeFreelance'), value: 'freelance' },
  ];

  const workSectorOptions = [
    { label: t('form.workSectorPrivate'), value: 'private' },
    { label: t('form.workSectorGovernment'), value: 'government' },
    { label: t('form.workSectorMilitary'), value: 'military' },
  ];

  const employerOptions = [
    { label: t('form.employerPrivate'), value: 'private' },
    { label: t('form.employerGovernment'), value: 'government' },
    { label: t('form.employerMilitary'), value: 'military' },
    { label: t('form.employerBank'), value: 'bank' },
    { label: t('form.employerHospital'), value: 'hospital' },
    { label: t('form.employerSchool'), value: 'school' },
    { label: t('form.employerUniversity'), value: 'university' },
    { label: t('form.employerOther'), value: 'other' },
  ];

  return (
    <View>
      <Text style={[styles.sectionTitle, { marginBottom: 10, textAlign, color: '#E62130' }]}>
        {t('form.step1Title')}
      </Text>

      <Text style={[styles.descriptionText, { textAlign, color: colors?.textSecondary || '#7F8C8D' }]}>
        {t('form.enterInformationBelow')}
      </Text>

      <Dropdown
        label={t('form.financingPurpose')}
        placeholder={t('form.financingPurposePlaceholder')}
        options={financingPurposeOptions}
        value={localData.financingPurpose}
        onSelect={(value) => setLocalData({ ...localData, financingPurpose: value })}
        icon={faFileContract}
      />

      <Dropdown
        label={t('form.maritalStatus')}
        placeholder={t('form.maritalStatusPlaceholder')}
        options={maritalStatusOptions}
        value={localData.maritalStatus}
        onSelect={(value) => setLocalData({ ...localData, maritalStatus: value })}
        icon={faVenusMars}
      />

      <Dropdown
        label={t('form.familyMembers')}
        placeholder={t('form.familyMembersPlaceholder')}
        options={familyMembersOptions}
        value={localData.familyMembers}
        onSelect={(value) => setLocalData({ ...localData, familyMembers: value })}
        icon={faUsers}
      />

      <Dropdown
        label={t('form.educationFees')}
        placeholder={t('form.educationFeesPlaceholder')}
        options={educationFeesOptions}
        value={localData.educationFees}
        onSelect={(value) => setLocalData({ ...localData, educationFees: value })}
        icon={faGraduationCap}
      />

      <Dropdown
        label={t('form.housingType')}
        placeholder={t('form.housingTypePlaceholder')}
        options={housingTypeOptions}
        value={localData.housingType}
        onSelect={(value) => setLocalData({ ...localData, housingType: value })}
        icon={faHome}
      />

      <Dropdown
        label={t('form.employmentStatus')}
        placeholder={t('form.employmentStatusPlaceholder')}
        options={employmentStatusOptions}
        value={localData.employmentStatus}
        onSelect={(value) => setLocalData({ ...localData, employmentStatus: value })}
        icon={faUserTie}
      />

      <Dropdown
        label={t('form.educationLevel')}
        placeholder={t('form.educationLevelPlaceholder')}
        options={educationLevelOptions}
        value={localData.educationLevel}
        onSelect={(value) => setLocalData({ ...localData, educationLevel: value })}
        icon={faSchool}
      />

      <Checkbox
        label={t('form.isPoliticallyExposed')}
        checked={localData.isPoliticallyExposed || false}
        onToggle={() => setLocalData({ ...localData, isPoliticallyExposed: !localData.isPoliticallyExposed })}
      />

      {/* Work Information Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={[styles.workSectionTitle, { textAlign, color: '#E62130' }]}>
          {t('form.step2Title')}
        </Text>
        
        <Text style={[styles.workSectionDescription, { textAlign, color: colors?.textSecondary || '#7F8C8D' }]}>
          {t('form.workInfoDescription')}
        </Text>

        <Dropdown
          label={t('form.jobType')}
          placeholder={t('form.jobTypePlaceholder')}
          options={jobTypeOptions}
          value={localData.jobType}
          onSelect={(value) => setLocalData({ ...localData, jobType: value })}
          icon={faBriefcase}
        />

        <Dropdown
          label={t('form.workSector')}
          placeholder={t('form.workSectorPlaceholder')}
          options={workSectorOptions}
          value={localData.workSector}
          onSelect={(value) => setLocalData({ ...localData, workSector: value })}
          icon={faBuilding}
        />

        <Dropdown
          label={t('form.companyName')}
          placeholder={t('form.companyNamePlaceholder')}
          options={employerOptions}
          value={localData.companyName}
          onSelect={(value) => setLocalData({ ...localData, companyName: value })}
          icon={faLandmark}
        />

        <InputField
          label={t('form.jobTitle')}
          placeholder={t('form.jobTitlePlaceholder')}
          value={localData.jobTitle}
          onChangeText={(text) => setLocalData({ ...localData, jobTitle: text })}
          icon={faIdCard}
        />

        <DatePicker
          label={t('form.workStartDate')}
          placeholder={t('form.workStartDatePlaceholder')}
          value={localData.workStartDate}
          onSelect={(date) => setLocalData({ ...localData, workStartDate: date })}
          icon={faCalendar}
          startYear={1900}
        />

      </View>
    </View>
  );
};

export default PersonalInfoStep;

