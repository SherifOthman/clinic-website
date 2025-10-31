const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure proper alias resolution for @/ imports
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
