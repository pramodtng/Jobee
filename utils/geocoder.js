const nodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEO_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEO_PROVIDER_KEY,
    formatter: null
}

const geocoder = nodeGeocoder(options);

module.exports = geocoder;