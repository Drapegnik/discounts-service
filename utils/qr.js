import { QR_SECRET } from 'react-native-dotenv';

export const encode = value => `${QR_SECRET}${value}`;

export const validate = value => value.startsWith(QR_SECRET);

export const decode = value => value.slice(QR_SECRET.length);
