import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, Typography} from '../../styles/theme';
import {applications, statusFilters} from '../../constants/dummyData';
import {ApplicationCard} from '../../components/cards/ApplicationCard';

export const ApplicationsScreen: React.FC = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [filter, setFilter] = useState<string>('all');

  const filteredApplications = useMemo(() => {
    if (filter === 'all') {
      return applications;
    }
    return applications.filter(item => item.status === filter);
  }, [filter]);

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, {color: theme.primaryText}]}>
          {t('your_applications')}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}>
          {statusFilters.map(item => {
            const isActive = item.value === filter;
            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? theme.primary : theme.white,
                    borderColor: theme.applicationCardBorder,
                  },
                ]}
                onPress={() => setFilter(item.value)}>
                <Text
                  style={{
                    color: isActive ? theme.white : theme.primaryText,
                    fontWeight: isActive
                      ? Typography.fontWeight.semiBold
                      : Typography.fontWeight.medium,
                  }}>
                  {t(item.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.list}>
          {filteredApplications.map(item => (
            <ApplicationCard key={`${item.product}-${item.date}`} {...item} />
          ))}
          {filteredApplications.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={{color: theme.disableText}}>
                {t('no_record_found')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  filters: {
    marginVertical: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  list: {
    marginTop: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
});

