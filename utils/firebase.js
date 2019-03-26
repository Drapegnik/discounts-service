import * as firebase from 'firebase';

import config from '../config';

firebase.initializeApp(config.firebase);

export default firebase;
