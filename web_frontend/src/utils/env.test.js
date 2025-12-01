import { 
  getEnv, 
  isDevelopment, 
  getApiBaseUrl,
  getBackendUrl,
  getWsUrl,
  areFeatureFlagsEnabled,
  areExperimentsEnabled,
  getLogLevel
} from './env';

describe('Environment Utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset env before each test
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('getEnv returns env value when set', () => {
    process.env.REACT_APP_TEST_VAR = 'test-value';
    expect(getEnv('TEST_VAR')).toBe('test-value');
  });

  test('getEnv returns default when env not set', () => {
    expect(getEnv('NONEXISTENT', 'default')).toBe('default');
  });

  test('isDevelopment checks NODE_ENV', () => {
    process.env.REACT_APP_NODE_ENV = 'development';
    expect(isDevelopment()).toBe(true);
    
    process.env.REACT_APP_NODE_ENV = 'production';
    expect(isDevelopment()).toBe(false);
  });

  test('getApiBaseUrl returns configured URL', () => {
    process.env.REACT_APP_API_BASE = 'https://api.example.com';
    expect(getApiBaseUrl()).toBe('https://api.example.com');
  });

  test('getBackendUrl returns configured URL', () => {
    process.env.REACT_APP_BACKEND_URL = 'https://backend.example.com';
    expect(getBackendUrl()).toBe('https://backend.example.com');
  });

  test('getWsUrl returns configured WebSocket URL', () => {
    process.env.REACT_APP_WS_URL = 'wss://ws.example.com';
    expect(getWsUrl()).toBe('wss://ws.example.com');
  });

  test('areFeatureFlagsEnabled checks flag', () => {
    process.env.REACT_APP_FEATURE_FLAGS = 'true';
    expect(areFeatureFlagsEnabled()).toBe(true);
    
    process.env.REACT_APP_FEATURE_FLAGS = 'false';
    expect(areFeatureFlagsEnabled()).toBe(false);
  });

  test('areExperimentsEnabled checks flag', () => {
    process.env.REACT_APP_EXPERIMENTS_ENABLED = 'true';
    expect(areExperimentsEnabled()).toBe(true);
  });

  test('getLogLevel returns configured level', () => {
    process.env.REACT_APP_LOG_LEVEL = 'debug';
    expect(getLogLevel()).toBe('debug');
  });
});
