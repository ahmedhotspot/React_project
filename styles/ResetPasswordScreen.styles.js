import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  keyboardView: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  backButton: {
    alignItems: 'flex-end',
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
  content: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E62130',
    marginBottom: 15,
    textAlign: 'right',
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'right',
    lineHeight: 22,
  },
  requirementsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  requirementIcon: {
    marginLeft: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#E62130',
    textAlign: 'right',
    lineHeight: 20,
  },
  requirementTextMet: {
    color: '#28a745',
  },
  resetButton: {
    marginTop: 10,
  },
});

