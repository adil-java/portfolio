const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/**
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
const nextConfig = (phase) => ({
  // Keep production builds from replacing a running dev server's chunks.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});

module.exports = nextConfig;
