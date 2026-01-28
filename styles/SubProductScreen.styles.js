import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  menuButton: {
    padding: 8,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E62130',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  productLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  productLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  productBadge: {
    backgroundColor: '#E62130',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  productBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subProductTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E62130',
    marginBottom: 25,
  },
  subProductsContainer: {
    gap: 12,
    marginTop: 10,
  },
  subProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  subProductCardSelected: {
    borderColor: '#E62130',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  subProductContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  subProductIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subProductTextContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  subProductText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 15,
    gap: 12,
    backgroundColor: '#F5F5F5',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#E62130',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: '#999999',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E62130',
    minHeight: 50,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E62130',
  },
});

