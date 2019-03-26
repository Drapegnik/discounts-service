import { Facebook } from 'expo';

import firebase from './firebase';
import config from '../config';

export const loginWithFacebook = async () => {
  const { appId, permissions } = config.facebook;
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, { permissions });

  if (type === 'success' && token) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    // await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    // return Promise.resolve({ type: 'success' });
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  }

  return Promise.reject();
};

export const subscribeAuthChange = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

export const logout = async () => firebase.auth().signOut();
