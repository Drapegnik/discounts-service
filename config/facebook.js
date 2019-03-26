import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from 'react-native-dotenv';

export default {
  appId: FACEBOOK_APP_ID || '',
  appSecret: FACEBOOK_APP_SECRET || '',
  permissions: ['public_profile', 'email'],
};
