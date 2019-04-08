export const getUserName = ({ displayName, email }, profile) =>
  (profile && profile.name) || displayName || email;

export const getAvatar = ({ photoURL }, profile) => {
  let uri = photoURL;
  if (profile && profile.avatar) {
    uri = profile.avatar;
  }
  if (!uri) {
    return null;
  }
  return { uri };
};
