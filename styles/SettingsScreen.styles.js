import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    padding: 8,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: isSmallDevice ? 20 : 30,
    paddingBottom: isSmallDevice ? 20 : 25,
  },
  title: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: '700',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  settingItem: {
    borderRadius: 15,
    padding: isSmallDevice ? 18 : 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: '400',
  },
  deleteSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: isSmallDevice ? 16 : 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E62130',
  },
  deleteButtonText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '700',
  },
});

