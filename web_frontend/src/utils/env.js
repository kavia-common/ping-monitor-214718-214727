/**
 * Environment configuration utility
 * Reads and provides access to REACT_APP environment variables
 */

// PUBLIC_INTERFACE
/**
 * Get environment variable value
 * @param {string} key - Environment variable name (without REACT_APP_ prefix)
 * @param {string} defaultValue - Default value if env var is not set
 * @returns {string} Environment variable value or default
 */
export const getEnv = (key, defaultValue = '') => {
  const envKey = `REACT_APP_${key}`;
  return process.env[envKey] || defaultValue;
};

// PUBLIC_INTERFACE
/**
 * Check if we're in development mode
 * @returns {boolean} True if in development mode
 */
export const isDevelopment = () => {
  return getEnv('NODE_ENV', 'development') === 'development';
};

// PUBLIC_INTERFACE
/**
 * Get API base URL
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  return getEnv('API_BASE', 'http://localhost:3000');
};

// PUBLIC_INTERFACE
/**
 * Get backend URL
 * @returns {string} Backend URL
 */
export const getBackendUrl = () => {
  return getEnv('BACKEND_URL', 'http://localhost:3000');
};

// PUBLIC_INTERFACE
/**
 * Get WebSocket URL
 * @returns {string} WebSocket URL
 */
export const getWsUrl = () => {
  return getEnv('WS_URL', 'ws://localhost:3000');
};

// PUBLIC_INTERFACE
/**
 * Check if feature flags are enabled
 * @returns {boolean} True if feature flags are enabled
 */
export const areFeatureFlagsEnabled = () => {
  return getEnv('FEATURE_FLAGS', 'false') === 'true';
};

// PUBLIC_INTERFACE
/**
 * Check if experiments are enabled
 * @returns {boolean} True if experiments are enabled
 */
export const areExperimentsEnabled = () => {
  return getEnv('EXPERIMENTS_ENABLED', 'false') === 'true';
};

// PUBLIC_INTERFACE
/**
 * Get log level
 * @returns {string} Log level (debug, info, warn, error)
 */
export const getLogLevel = () => {
  return getEnv('LOG_LEVEL', 'info');
};
