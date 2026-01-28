import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  testBox: {
    backgroundColor: '#e74c3c',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  testText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
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
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
  },
  instructionText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'right',
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e74c3c',
    marginBottom: 30,
    textAlign: 'right',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#34495e',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerQuestionText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 8,
  },
  registerLinkText: {
    color: '#E62130',
    fontSize: 16,
    fontWeight: '700',
  },
});

