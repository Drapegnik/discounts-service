/* eslint-disable import/no-extraneous-dependencies */
const fetch = require('node-fetch');
const qs = require('qs');
/* eslint-enable */

const DEFAULT_CONFIG = {
  apiUrl: 'https://api.foursquare.com/v2',
  version: '20180323',
};

const venues = config => {
  const { credentials } = config;
  return {
    getVenues: params => {
      const urlString = `${config.apiUrl}/venues/search?${qs.stringify(params)}&${qs.stringify(
        credentials
      )}`;
      return fetch(urlString)
        .then(res => res.json())
        .then(({ response: r }) => r.venues);
    },
  };
};

module.exports = ({ clientId, clientSecret, version }) => {
  const config = {
    apiUrl: DEFAULT_CONFIG.apiUrl,
    credentials: {
      v: version || DEFAULT_CONFIG.version,
      client_id: clientId,
      client_secret: clientSecret,
    },
  };
  return {
    venues: venues(config),
  };
};
