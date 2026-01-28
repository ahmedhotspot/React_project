import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(width * 0.75, 320);

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    top: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItems: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 15,
  },
  menuItemActive: {
    // Active state styling is handled by text/icon color
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  menuItemTextActive: {
    color: '#E62130',
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: '#BDC3C7',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  legalSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  legalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  legalHeaderText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C3E50',
    flex: 1,
  },
  legalItems: {
    gap: 15,
    marginBottom: 25,
  },
  legalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  legalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
  },
  legalIcon: {
    // Icon positioning handled by flexDirection
  },
  legalChevron: {
    // Chevron positioning handled by flexDirection
  },
  licenseText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#95A5A6',
    marginTop: 5,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 15,
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E62130',
  },
});

