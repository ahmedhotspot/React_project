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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
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
  segmentedControl: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    gap: 10,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  segmentTextActive: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E62130',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicationsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  applicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  applicationCardExpanded: {
    paddingBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 2,
    justifyContent: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28A745',
    alignItems: 'center',
    justifyContent: 'center',
  },
  financeTypeContainer: {
    alignItems: 'flex-end',
  },
  financeTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  financeTypeValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7F8C8D',
  },
  providerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
  },
  providerTextAr: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2C3E50',
    marginTop: 2,
  },
  cardDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 20,
  },
  detailsColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
  },
  companyInfo: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  companyText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7F8C8D',
  },
  valuesText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7F8C8D',
  },
});

