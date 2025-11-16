import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  GlobalStyles,
  Colors,
  Typography,
  Spacing,
  TextStyles,
} from './styles/theme';

function App(): React.JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={GlobalStyles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>React Native App</Text>
          <Text style={styles.subtitle}>مرحباً بك في تطبيق React Native</Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(count + 1)}>
              <Text style={styles.buttonText}>اضغط هنا: {count}</Text>
            </TouchableOpacity>
            <Text style={styles.description}>
              عدّل ملف src/App.tsx واحفظ للتحديث
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TextStyles.h1,
    color: Colors.primaryText,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...TextStyles.body,
    fontSize: Typography.fontSize.lg,
    color: Colors.disableText,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
  card: {
    ...GlobalStyles.card,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    ...GlobalStyles.button,
    marginBottom: Spacing.md,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
  },
  description: {
    ...TextStyles.bodySmall,
    color: Colors.disableText,
    textAlign: 'center',
  },
});

export default App;
