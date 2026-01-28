import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 0,
  },
  stepContainer: {
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
  },
  stepCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#E62130',
    borderColor: '#E62130',
  },
  stepCircleCurrent: {
    borderWidth: 3,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999999',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLine: {
    width: 6,
    height: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginHorizontal: 2,
  },
  stepLineActive: {
    backgroundColor: '#E62130',
  },
  stepTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999999',
    marginTop: 8,
    textAlign: 'center',
  },
  stepTitleActive: {
    color: '#E62130',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 15,
    gap: 12,
    backgroundColor: '#F5F5F5',
  },
  previousButton: {
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
  previousButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E62130',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#E62130',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  nextButtonFull: {
    width: '100%',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  nextButtonTextDisabled: {
    color: '#999999',
  },
});

