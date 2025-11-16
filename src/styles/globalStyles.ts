/**
 * Global Styles for React Native
 * Use StyleSheet.create() in components, but you can import common styles from here
 */

import {StyleSheet} from 'react-native';
import {Colors} from './theme/colors';
import {Typography} from './theme/typography';
import {Spacing, BorderRadius, Shadows} from './theme/spacing';

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: Spacing.base,
  },

  // Card Styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.md,
  },
  applicationCard: {
    backgroundColor: Colors.applicationCardBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.applicationCardBorder,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },

  // Button Styles
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonOutlineText: {
    color: Colors.primary,
  },

  // Input Styles
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.primaryText,
    borderWidth: 1,
    borderColor: Colors.greyBorder,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.danger,
  },

  // Text Styles
  textPrimary: {
    color: Colors.primaryText,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
  },
  textSecondary: {
    color: Colors.secondary,
  },
  textDanger: {
    color: Colors.danger,
  },
  textSuccess: {
    color: Colors.success,
  },
  textWarning: {
    color: Colors.warning,
  },
  textMuted: {
    color: Colors.disableText,
  },

  // Error Message
  errorMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.danger,
    marginTop: Spacing.xs,
    marginLeft: Spacing['2xl'],
  },

  // Utility Classes
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  mbSm: {
    marginBottom: Spacing.sm,
  },
  mbMd: {
    marginBottom: Spacing.md,
  },
  mbLg: {
    marginBottom: Spacing.lg,
  },
  mtSm: {
    marginTop: Spacing.sm,
  },
  mtMd: {
    marginTop: Spacing.md,
  },
  mtLg: {
    marginTop: Spacing.lg,
  },
  pSm: {
    padding: Spacing.sm,
  },
  pMd: {
    padding: Spacing.md,
  },
  pLg: {
    padding: Spacing.lg,
  },
});
