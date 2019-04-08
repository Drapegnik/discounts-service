import { Facebook } from 'expo';

import firebase from './firebase';
import config from '../config';

export const loginWithFacebook = async () => {
  const { appId, permissions } = config.facebook;
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, { permissions });

  if (type === 'success' && token) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  }

  return Promise.reject();
};

export const login = async (email, password) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

export const subscribeAuthChange = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

export const logout = async () => firebase.auth().signOut();
