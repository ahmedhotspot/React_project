import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextField} from '../../components/core/TextField';
import {PrimaryButton} from '../../components/core/PrimaryButton';
import {Spacing, Typography} from '../../styles/theme';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {login} = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{identifier?: string; password?: string}>(
    {},
  );

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!identifier) {
      nextErrors.identifier = t('please_enter_iqama_number');
    }
    if (!password) {
      nextErrors.password = t('password_required');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    try {
      setLoading(true);
      await login({
        iqama: identifier,
        email: identifier.includes('@') ? identifier : undefined,
        password,
      });
    } catch (error) {
      console.warn('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.primaryText}]}>
            {t('welcome')}
          </Text>
          <Text style={[styles.subtitle, {color: theme.disableText}]}>
            {t('login_msg')}
          </Text>
        </View>
        <View style={styles.form}>
          <TextField
            label={t('iqama_no')}
            placeholder="2XXXXXXXXX"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="number-pad"
            error={errors.identifier}
          />
          <TextField
            label={t('password')}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            style={styles.fieldSpacing}
          />
          <View style={styles.rememberRow}>
            <View style={styles.rememberLeft}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                thumbColor={rememberMe ? theme.white : theme.white}
                trackColor={{false: theme.disableText, true: theme.primary}}
              />
              <Text style={[styles.rememberLabel, {color: theme.primaryText}]}>
                {t('remember_me')}
              </Text>
            </View>
            <Text style={{color: theme.primary}}>{t('forgot_password')}</Text>
          </View>
          <PrimaryButton
            title={t('log_in')}
            onPress={handleLogin}
            loading={loading}
            style={styles.submit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: Spacing.base,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    lineHeight: 24,
  },
  form: {
    gap: Spacing.base,
  },
  fieldSpacing: {
    marginTop: Spacing.sm,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rememberLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  submit: {
    marginTop: Spacing.lg,
  },
});

