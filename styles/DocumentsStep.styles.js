import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionIcon: {
    marginHorizontal: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  conditionsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  conditionsModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  conditionsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  conditionsSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 15,
  },
  conditionsList: {
    marginBottom: 20,
  },
  conditionItem: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    color: '#E62130',
    marginHorizontal: 8,
    marginTop: 2,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    lineHeight: 22,
  },
  conditionNote: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E62130',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 20,
  },
  understandButton: {
    backgroundColor: '#E62130',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  understandButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E62130',
    marginBottom: 20,
  },
});

