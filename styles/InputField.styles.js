import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    textAlign: 'right',
    fontWeight: '600',
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    minHeight: 50,
  },
  inputWrapperError: {
    borderColor: '#E62130',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#E62130',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  iconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    textAlign: 'right',
    paddingVertical: 12,
    marginRight: 9,
  },
  inputRightAlign: {
    textAlign: 'right',
    marginRight: 8,
  },
  leftIcon: {
    padding: 5,
  },
  rightIcon: {
    padding: 5,
    marginLeft: 10,
  },
  rightIconText: {
    fontSize: 20,
    color: '#e74c3c',
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 0,
    marginLeft: 8,
  },
  prefixText: {
    fontSize: 16,
    color: '#E62130',
    fontWeight: '600',
    marginRight: 4,
  },
  prefixDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
});

