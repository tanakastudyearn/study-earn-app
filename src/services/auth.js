// ... other imports and code

// Register
static async register(userData) {
  try {
    // Validate required fields
    const requiredFields = ['email', 'password', 'name'];
    requiredFields.forEach(field => {
      if (!userData[field]) {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });

    // Validate password strength
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Call register API
    const response = await authAPI.register(userData);

    // Ensure new user starts with 0 points and default stats
    const profile = {
      ...response.user,
      points: 0,
      pendingPoints: 0,
      totalEarnings: 0,
      stats: {
        coursesCompleted: 0,
        lessonsCompleted: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        streak: 0,
        longestStreak: 0,
      },
    };
    await StorageService.setUserProfile(profile);

    // Auto login after registration
    return await this.login(userData.email, userData.password);
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert(
      'Registration Failed',
      error.message || 'Unable to create account. Please try again.'
    );
    throw error;
  }
}
