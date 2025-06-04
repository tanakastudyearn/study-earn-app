import { DefaultTheme } from 'react-native-paper';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const elevation = {
  small: 2,
  medium: 4,
  large: 8,
};

export const theme = {
  ...DefaultTheme,
  roundness: 8,
  spacing,
  elevation,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB', // Blue
    secondary: '#4F46E5', // Indigo
    accent: '#8B5CF6', // Purple
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    info: '#3B82F6',
    notification: '#EF4444',
    card: '#FFFFFF',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  dark: false,
};

// Common styles used across components
export const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.card,
    elevation: elevation.small,
    borderRadius: theme.roundness,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: elevation.small,
  },
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: spacing.md,
  },
  button: {
    marginVertical: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: spacing.xs,
  },
};

// Typography scale
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
};

// Animation configurations
export const animations = {
  scale: {
    duration: 200,
    easing: 'ease-in-out',
  },
  fade: {
    duration: 300,
    easing: 'ease-in-out',
  },
  slide: {
    duration: 300,
    easing: 'ease-in-out',
  },
};

// Layout constants
export const layout = {
  headerHeight: 56,
  tabBarHeight: 60,
  contentPadding: spacing.md,
  maxContentWidth: 1200,
  borderRadius: theme.roundness,
};

// Status colors with variants
export const statusColors = {
  success: {
    light: '#DCFCE7',
    main: theme.colors.success,
    dark: '#166534',
  },
  error: {
    light: '#FEE2E2',
    main: theme.colors.error,
    dark: '#991B1B',
  },
  warning: {
    light: '#FEF3C7',
    main: theme.colors.warning,
    dark: '#92400E',
  },
  info: {
    light: '#DBEAFE',
    main: theme.colors.info,
    dark: '#1E40AF',
  },
};

// Z-index stack order
export const zIndex = {
  modal: 1000,
  overlay: 900,
  drawer: 800,
  popover: 700,
  header: 600,
  footer: 500,
  content: 1,
};

export default {
  theme,
  styles,
  typography,
  animations,
  layout,
  statusColors,
  zIndex,
  spacing,
  elevation,
};
