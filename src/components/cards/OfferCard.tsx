import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Spacing, BorderRadius, Typography} from '../../styles/theme';
import {useTheme} from '../../context/ThemeContext';

type OfferCardProps = {
  title: string;
  description: string;
  rate: string;
  tenor: string;
  image?: number;
};

export const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  rate,
  tenor,
  image,
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.white,
          borderColor: theme.applicationCardBorder,
        },
      ]}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[styles.title, {color: theme.primaryText}]}>{title}</Text>
          <Text style={[styles.description, {color: theme.disableText}]}>
            {description}
          </Text>
        </View>
        {image ? (
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
            accessible
          />
        ) : null}
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[styles.label, {color: theme.disableText}]}>APR</Text>
          <Text style={[styles.value, {color: theme.primary}]}>{rate}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.label, {color: theme.disableText}]}>
            Tenor
          </Text>
          <Text style={[styles.value, {color: theme.primaryText}]}>{tenor}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  flex: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  image: {
    width: 64,
    height: 64,
    marginLeft: Spacing.base,
  },
});

