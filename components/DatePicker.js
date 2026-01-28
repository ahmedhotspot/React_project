import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/DatePicker.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const DatePicker = ({ label, placeholder, value, onSelect, icon, error, maximumDate, minimumDate, startYear }) => {
  const { getTextAlign, getFlexDirection, isRTL, t } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // Initialize with current date or selected date
  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth() + 1);
      setSelectedDay(date.getDate());
    } else {
      const today = new Date();
      setSelectedYear(today.getFullYear());
      setSelectedMonth(today.getMonth() + 1);
      setSelectedDay(today.getDate());
    }
  }, [value]);

  const currentYear = new Date().getFullYear();
  // Use provided startYear or default to 1900 for wide date range
  const yearStart = startYear || 1900;
  // Calculate end year - if no maximumDate, allow up to 50 years in the future
  let yearEnd = currentYear + 50;
  if (maximumDate) {
    const maxYear = new Date(maximumDate).getFullYear();
    yearEnd = Math.max(yearEnd, maxYear);
  } else {
    // If no maximumDate specified, allow a wide range (200 years from start)
    yearEnd = Math.max(yearEnd, yearStart + 200);
  }
  // Generate years array
  const years = Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => yearStart + i);
  const months = [
    { value: 1, label: 'يناير' },
    { value: 2, label: 'فبراير' },
    { value: 3, label: 'مارس' },
    { value: 4, label: 'أبريل' },
    { value: 5, label: 'مايو' },
    { value: 6, label: 'يونيو' },
    { value: 7, label: 'يوليو' },
    { value: 8, label: 'أغسطس' },
    { value: 9, label: 'سبتمبر' },
    { value: 10, label: 'أكتوبر' },
    { value: 11, label: 'نوفمبر' },
    { value: 12, label: 'ديسمبر' },
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const days = selectedMonth && selectedYear
    ? Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1)
    : [];

  const handleConfirm = () => {
    console.log('handleConfirm called', { selectedYear, selectedMonth, selectedDay });
    
    // Ensure we have all date components
    if (!selectedYear || !selectedMonth || !selectedDay) {
      console.log('Missing date components:', { selectedYear, selectedMonth, selectedDay });
      alert('يرجى اختيار التاريخ كاملاً (السنة، الشهر، اليوم)');
      return;
    }
    
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    const dateString = date.toISOString().split('T')[0];
    
    console.log('Date created:', dateString, 'min:', minimumDate, 'max:', maximumDate);
    
    // Check if date is within allowed range (only if constraints are provided)
    if (minimumDate && dateString < minimumDate) {
      console.log('Date is before minimum date');
      alert('التاريخ المحدد قبل الحد الأدنى المسموح');
      return;
    }
    if (maximumDate && dateString > maximumDate) {
      console.log('Date is after maximum date');
      alert('التاريخ المحدد بعد الحد الأقصى المسموح');
      return;
    }
    
    // Save the date and close modal
    console.log('DatePicker: Saving date:', dateString);
    if (onSelect) {
      console.log('DatePicker: Calling onSelect with:', dateString);
      onSelect(dateString);
      setIsVisible(false);
      console.log('DatePicker: Date saved and modal closed');
    } else {
      console.log('onSelect is not defined!');
      alert('خطأ: onSelect غير معرّف');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.log('Invalid date:', dateString);
        return '';
      }
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.log('Error formatting date:', error, dateString);
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { textAlign, color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.datePickerWrapper, error && styles.inputWrapperError, { flexDirection, backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }]}
        onPress={() => {
          // Always initialize selected values when opening modal
          if (value) {
            const date = new Date(value);
            setSelectedYear(date.getFullYear());
            setSelectedMonth(date.getMonth() + 1);
            setSelectedDay(date.getDate());
          } else {
            const today = new Date();
            setSelectedYear(today.getFullYear());
            setSelectedMonth(today.getMonth() + 1);
            setSelectedDay(today.getDate());
          }
          setIsVisible(true);
        }}
      >
        {rtl ? (
          <>
            <Text style={[styles.dateText, !value && styles.placeholder, { textAlign }]}>
              {value ? formatDate(value) : placeholder}
            </Text>
            {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={icon} size={18} color={colors.primary} />
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.dateText, !value && styles.placeholder, { textAlign }]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
            <FontAwesomeIcon icon={icon} size={18} color="#E62130" />
          </View>
            )}
          </>
        )}
      </TouchableOpacity>
      {error && <Text style={[styles.errorText, { textAlign, color: colors.error }]}>{error}</Text>}

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View 
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
            onStartShouldSetResponder={() => true}
            onResponderGrant={() => {}}
          >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>اختر التاريخ</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text style={[styles.modalClose, { color: colors.textSecondary }]}>إلغاء</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text style={[styles.pickerLabel, { color: colors.text }]}>السنة</Text>
                <ScrollView style={styles.pickerScroll}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.pickerItemSelected,
                        { backgroundColor: selectedYear === year ? colors.primary + '20' : 'transparent' },
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedYear === year && styles.pickerItemTextSelected,
                          { color: selectedYear === year ? colors.primary : colors.text },
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text style={[styles.pickerLabel, { color: colors.text }]}>الشهر</Text>
                <ScrollView style={styles.pickerScroll}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month.value}
                      style={[
                        styles.pickerItem,
                        selectedMonth === month.value && styles.pickerItemSelected,
                        { backgroundColor: selectedMonth === month.value ? colors.primary + '20' : 'transparent' },
                      ]}
                      onPress={() => {
                        setSelectedMonth(month.value);
                        const maxDays = getDaysInMonth(month.value, selectedYear || currentYear);
                        if (selectedDay > maxDays) {
                          setSelectedDay(maxDays);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMonth === month.value && styles.pickerItemTextSelected,
                          { color: selectedMonth === month.value ? colors.primary : colors.text },
                        ]}
                      >
                        {month.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Day Picker */}
              <View style={styles.pickerColumn}>
                <Text style={[styles.pickerLabel, { color: colors.text }]}>اليوم</Text>
                <ScrollView style={styles.pickerScroll}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.pickerItem,
                        selectedDay === day && styles.pickerItemSelected,
                        { backgroundColor: selectedDay === day ? colors.primary + '20' : 'transparent' },
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedDay === day && styles.pickerItemTextSelected,
                          { color: selectedDay === day ? colors.primary : colors.text },
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.confirmButton, { backgroundColor: colors.primary }]} 
              onPress={() => {
                console.log('Confirm button pressed');
                handleConfirm();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmButtonText}>تأكيد</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DatePicker;

