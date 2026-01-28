import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/Dropdown.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const Dropdown = ({ label, placeholder, options = [], value, onSelect, icon }) => {
  const { getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { textAlign, color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdownWrapper, { flexDirection, backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setIsVisible(true)}
      >
        {rtl ? (
          <>
            <View style={[styles.leftIconContainer, { marginLeft: 0 }]}>
              <FontAwesomeIcon icon={faChevronDown} size={14} color={colors.text} />
            </View>
            <Text style={[styles.dropdownText, !selectedOption && styles.placeholder, { textAlign, color: selectedOption ? colors.text : colors.textSecondary }]}>
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={icon} size={18} color={colors.primary} />
              </View>
            )}
          </>
        ) : (
          <>
            <View style={[styles.leftIconContainer, { marginLeft: 10, marginRight: 0 }]}>
              <FontAwesomeIcon icon={faChevronDown} size={14} color={colors.text} />
            </View>
            <Text style={[styles.dropdownText, !selectedOption && styles.placeholder, { textAlign, color: selectedOption ? colors.text : colors.textSecondary }]}>
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={icon} size={18} color={colors.primary} />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.optionItem, { backgroundColor: colors.surface }]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.optionText, { textAlign, color: colors.text }]}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;

