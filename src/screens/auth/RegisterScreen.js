import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Title, HelperText, Checkbox } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';

const RegisterScreen = ({ navigation }) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms and Conditions');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setError('');
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // Navigation is handled by AuthContext
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Title style={styles.title}>Create Account</Title>
            <Text style={styles.subtitle}>
              Join our community of learners and start earning rewards
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              mode="outlined"
              secureTextEntry={secureTextEntry.password}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry.password ? "eye" : "eye-off"}
                  onPress={() => setSecureTextEntry(prev => ({
                    ...prev,
                    password: !prev.password
                  }))}
                />
              }
            />

            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              mode="outlined"
              secureTextEntry={secureTextEntry.confirmPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry.confirmPassword ? "eye" : "eye-off"}
                  onPress={() => setSecureTextEntry(prev => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword
                  }))}
                />
              }
            />

            <View style={styles.termsContainer}>
              <Checkbox.Android
                status={acceptedTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                color={theme.colors.primary}
              />
              <Text style={styles.termsText}>
                I accept the{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => {/* Navigate to Terms */}}
                >
                  Terms and Conditions
                </Text>
                {' '}and{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => {/* Navigate to Privacy Policy */}}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {error ? (
              <HelperText type="error" visible={true}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
            >
              Create Account
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
              >
                Login
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  input: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  termsText: {
    flex: 1,
    marginLeft: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  termsLink: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  registerButton: {
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  loginText: {
    color: theme.colors.textSecondary,
  },
  loginButton: {
    marginLeft: theme.spacing.xs,
  },
});

export default RegisterScreen;
