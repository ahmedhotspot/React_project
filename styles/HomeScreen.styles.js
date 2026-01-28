import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  profileImageIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    lineHeight: 20,
  },
  productsHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#E62130',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productCardDisabled: {
    opacity: 0.9,
  },
  productIconContainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productIcon: {
    width: 90,
    height: 90,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    flex: 1,
  },
  productButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
  },
  productButtonTextDisabled: {
    color: '#7F8C8D',
  },
  enterprisesSection: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgb(212, 212, 212)',
    borderRadius: 15,
    padding: 20,
  },
  enterprisesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  enterprisesIconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterprisesIcon: {
    width: 60,
    height: 60,
  },
  enterprisesText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'right',
  },
  comingSoonText: {
    fontWeight: '700',
    color: '#5D6D7E',
  },
});

