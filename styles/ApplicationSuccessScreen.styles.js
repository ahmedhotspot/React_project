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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E62130',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    width: '100%',
  },
  applicationNumberSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  applicationNumberIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6213015',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicationNumberTextContainer: {
    flex: 1,
  },
  applicationNumberLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 6,
    fontWeight: '500',
  },
  applicationNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E62130',
    letterSpacing: 0.5,
  },
  messageContainer: {
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  contactMessage: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E62130',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 50,
    minWidth: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

