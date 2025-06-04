// Re-export environment and config types
export * from './environment';
export * from './react-native-dotenv';
export type { AppConfig } from '@constants/config';

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  pendingPoints: number;
  totalEarnings: number;
  createdAt: string;
  updatedAt: string;
  preferences?: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  darkMode: boolean;
  language: string;
  soundEffects: boolean;
  autoPlay: boolean;
  downloadOverWifi: boolean;
}

export interface UserStats {
  coursesCompleted: number;
  lessonsCompleted: number;
  totalTimeSpent: number;
  averageScore: number;
  streak: number;
  longestStreak: number;
}

// Course related types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  points: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  requirements: string[];
  learningOutcomes: string[];
  lessons: Lesson[];
  progress?: number;
  rating: number;
  reviews: number;
  enrollments: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  points: number;
  videoUrl: string;
  thumbnail: string;
  completed: boolean;
  progress: number;
  attachments: Attachment[];
  quiz?: Quiz;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number;
  attempts: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple' | 'single' | 'true-false';
  options: string[];
  correctAnswer: number | number[];
  points: number;
}

// Points and Wallet related types
export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  reason: string;
  timestamp: string;
  status: TransactionStatus;
  metadata?: Record<string, any>;
}

export type TransactionType = 
  | 'COURSE_COMPLETION'
  | 'LESSON_COMPLETION'
  | 'QUIZ_COMPLETION'
  | 'CONTENT_UPLOAD'
  | 'CONTENT_APPROVED'
  | 'WATCH_REWARDED_AD'
  | 'WITHDRAWAL'
  | 'DAILY_LOGIN'
  | 'STREAK_BONUS';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  data?: Record<string, any>;
}

export type NotificationType = 
  | 'course'
  | 'points'
  | 'reward'
  | 'system'
  | 'achievement';

// API related types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Navigation related types
export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  CourseDetail: { course: Course };
  Lesson: { lesson: Lesson; courseId: string };
  Settings: undefined;
  Notifications: undefined;
};

export type TabParamList = {
  Home: undefined;
  Study: undefined;
  Upload: undefined;
  Wallet: undefined;
  Profile: undefined;
};

// Component Props types
export interface HeaderProps {
  title: string;
  showBack?: boolean;
  navigation: any;
  rightComponent?: React.ReactNode;
}

export interface CourseCardProps {
  course: Course;
  onPress: (course: Course) => void;
}

export interface PointsCardProps {
  points: number;
  earnings: number;
  onPress?: () => void;
}

export interface FileUploadCardProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

// Context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: Partial<User>) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  forgotPassword: (email: string) => Promise<void>;
}

export interface PointsContextType {
  points: number;
  earnings: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  awardPoints: (type: TransactionType, data?: any) => Promise<number>;
  processWithdrawal: (amount: number, paymentMethod: string) => Promise<any>;
  refreshPointsData: () => Promise<void>;
}

export interface AdContextType {
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  showInterstitial: () => Promise<boolean>;
  showRewardedAd: () => Promise<boolean>;
  getBannerProps: () => any;
}
