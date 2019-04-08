import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_AUTH_DOMAIN } from 'react-native-dotenv';

export default {
  apiKey: FIREBASE_API_KEY || '',
  projectId: FIREBASE_PROJECT_ID || '',
  authDomain: FIREBASE_AUTH_DOMAIN || '',
};
