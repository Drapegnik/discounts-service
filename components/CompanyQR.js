import React from 'react';
import QRCode from 'react-native-qrcode';

import { encode } from '../utils/qr';

const CompanyQR = ({ id, color = 'white' }) => (
  <QRCode value={encode(id)} size={300} fgColor={color} />
);

export default CompanyQR;
