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
  subtitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    textAlign: 'right',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E62130',
    marginBottom: 30,
    textAlign: 'right',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginQuestionText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 8,
  },
  loginLinkText: {
    color: '#E62130',
    fontSize: 16,
    fontWeight: '700',
  },
  termsContainer: {
    marginBottom: 15,
  },
  mainTermsCheckbox: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxWrapperTouchable: {
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  termsLabel: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
    lineHeight: 22,
  },
  showDetailsLink: {
    fontSize: 14,
    color: '#E62130',
    textAlign: 'right',
  },
  termsDetailsContainer: {
    marginTop: 10,
    marginRight: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  termsError: {
    color: '#E62130',
    fontSize: 12,
    marginTop: 5,
    marginRight: 30,
    textAlign: 'right',
  },
});

