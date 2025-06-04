# Study & Earn App - Quick Start Guide

## 1. View Current Configuration

```bash
# Start the configuration test server
python3 -m http.server 8000 -d public

# Open in your browser
http://localhost:8000
```

You'll see three main sections:

1. API Configuration
   - BASE_URL: The API endpoint (https://api.studyearn.app)
   - VERSION: API version (v1)
   - TIMEOUT: Request timeout (30000ms)

2. Feature Flags
   - SOCIAL_LOGIN: Currently disabled
   - BIOMETRIC_AUTH: Currently disabled
   - PUSH_NOTIFICATIONS: Currently enabled
   - OFFLINE_MODE: Currently enabled

3. Points System
   - MIN_WITHDRAWAL: 500 points
   - CONVERSION_RATE: 0.01 (1 point = $0.01)
   - DAILY_BONUS: 10 points
   - STREAK_BONUS: 20 points

## 2. Change Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit the .env file with your values:
```env
# API Configuration
API_URL=your_api_url
API_VERSION=v1
API_TIMEOUT=30000

# Feature Flags
ENABLE_SOCIAL_LOGIN=false
ENABLE_BIOMETRIC_AUTH=false
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_OFFLINE_MODE=true

# Points System
MIN_WITHDRAWAL_AMOUNT=500
POINTS_TO_CURRENCY_RATIO=0.01
```

3. Restart the server to see your changes:
```bash
# Stop the current server (Ctrl+C)
# Then start it again
python3 -m http.server 8000 -d public
```

## 3. Use in Your Code

Import and use the configuration in your components:

```typescript
import APP_CONFIG from '../constants/config';

// Access API settings
const apiUrl = APP_CONFIG.API.BASE_URL;
const timeout = APP_CONFIG.API.TIMEOUT;

// Check feature flags
if (APP_CONFIG.FEATURES.PUSH_NOTIFICATIONS) {
  // Enable push notifications
}

// Use points system
const minWithdrawal = APP_CONFIG.POINTS.MIN_WITHDRAWAL;
const conversionRate = APP_CONFIG.POINTS.CONVERSION_RATE;
```

## 4. Type Safety

The configuration system is fully typed. You'll get autocomplete and type checking:

```typescript
// This works
const timeout = APP_CONFIG.API.TIMEOUT;

// This will show a TypeScript error
const invalid = APP_CONFIG.INVALID_KEY; // Error: Property 'INVALID_KEY' does not exist
```

## 5. Testing

View the configuration test page anytime at http://localhost:8000 to verify your settings.

Remember: Never commit your actual .env file - it contains sensitive information. Only commit the .env.example template.
