const firebase = require('firebase/app');
require('firebase/firestore');

module.exports = config => {
  firebase.initializeApp(config);
  return firebase.firestore();
};
