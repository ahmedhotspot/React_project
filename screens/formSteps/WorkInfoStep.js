import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import InputField from '../../components/InputField';
import Dropdown from '../../components/Dropdown';
import DatePicker from '../../components/DatePicker';
import { useLanguage } from '../../locales';
import { faBriefcase, faBuilding, faCalendar, faIndustry, faLandmark, faIdCard } from '@fortawesome/free-solid-svg-icons';

const WorkInfoStep = ({ data, onDataChange }) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const rtl = isRTL();

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);

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

  const industryOptions = [
    { label: t('form.industryBanking'), value: 'banking' },
    { label: t('form.industryEducation'), value: 'education' },
    { label: t('form.industryHealthcare'), value: 'healthcare' },
    { label: t('form.industryTechnology'), value: 'technology' },
    { label: t('form.industryRetail'), value: 'retail' },
    { label: t('form.industryConstruction'), value: 'construction' },
    { label: t('form.industryManufacturing'), value: 'manufacturing' },
    { label: t('form.industryOther'), value: 'other' },
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
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#2C3E50', marginBottom: 10, textAlign }}>
        {t('form.step2Title')}
      </Text>
      
      <Text style={{ fontSize: 14, color: '#666666', marginBottom: 20, textAlign }}>
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

      <Dropdown
        label={t('form.industry')}
        placeholder={t('form.industryPlaceholder')}
        options={industryOptions}
        value={localData.industry}
        onSelect={(value) => setLocalData({ ...localData, industry: value })}
        icon={faIndustry}
      />
    </View>
  );
};

export default WorkInfoStep;

