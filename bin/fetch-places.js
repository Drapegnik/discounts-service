#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
/* eslint-enable */

const foursquare = require('../lib/foursquare');
const firebase = require('../lib/firebase');

const {
  FOURSQUARE_CLIENT_ID,
  FOURSQUARE_CLIENT_SECRET,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
} = process.env;

const foursquareConfig = {
  clientId: FOURSQUARE_CLIENT_ID,
  clientSecret: FOURSQUARE_CLIENT_SECRET,
};

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
};

const PLACES = [
  { id: 'silverscreen' },
  { id: 'sport-family' },
  { id: 'lode', q: 'Лодэ' },
  { id: 'vetka-kvetka' },
];

const getQuery = query => ({
  ll: '53.9045,27.5615',
  limit: 1,
  query,
});

const fsq = foursquare(foursquareConfig);
const db = firebase(firebaseConfig);

const categoryMapper = ({ name, icon: { prefix, suffix } }) => ({
  name,
  icon: `${prefix}bg_64${suffix}`,
});

const venueMapper = ({ id, name, location: { address, lat, lng }, categories: [first] }) => ({
  id,
  name,
  address,
  coordinates: { lat, lng },
  category: categoryMapper(first),
});

const run = async () => {
  const promises = PLACES.map(({ id, q = id }) =>
    fsq.venues
      .getVenues(getQuery(q))
      .then(v => ({ ...v[0], id }))
      .then(venueMapper)
  );
  const data = await Promise.all(promises);
  await writeToFirebase(data);
  process.exit(0);
};

const writeToFirebase = places => {
  const promises = places.map(p =>
    db
      .collection('places')
      .doc(p.id)
      .set(p)
  );
  return Promise.all(promises);
};

run();
