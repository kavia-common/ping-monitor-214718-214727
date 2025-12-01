import pingService from './PingService';

describe('PingService', () => {
  beforeEach(() => {
    // Reset service state before each test
    if (pingService.getIsRunning()) {
      pingService.stop();
    }
  });

  afterEach(() => {
    // Cleanup after each test
    pingService.cleanup();
  });

  test('validates IP addresses correctly', () => {
    expect(pingService.isValidIP('8.8.8.8')).toBe(true);
    expect(pingService.isValidIP('192.168.1.1')).toBe(true);
    expect(pingService.isValidIP('google.com')).toBe(true);
    expect(pingService.isValidIP('invalid')).toBe(false);
    expect(pingService.isValidIP('999.999.999.999')).toBe(false);
    expect(pingService.isValidIP('')).toBe(false);
  });

  test('starts ping successfully with valid IP', () => {
    const result = pingService.start('8.8.8.8');
    expect(result).toBe(true);
    expect(pingService.getIsRunning()).toBe(true);
    expect(pingService.getCurrentTarget()).toBe('8.8.8.8');
  });

  test('fails to start with invalid IP', () => {
    const result = pingService.start('invalid');
    expect(result).toBe(false);
    expect(pingService.getIsRunning()).toBe(false);
  });

  test('stops ping successfully', () => {
    pingService.start('8.8.8.8');
    const stats = pingService.stop();
    expect(stats).not.toBeNull();
    expect(stats.target).toBe('8.8.8.8');
    expect(pingService.getIsRunning()).toBe(false);
  });

  test('cannot start when already running', () => {
    pingService.start('8.8.8.8');
    const result = pingService.start('1.1.1.1');
    expect(result).toBe(false);
    expect(pingService.getCurrentTarget()).toBe('8.8.8.8');
  });

  test('log callback receives messages', (done) => {
    let logReceived = false;
    pingService.setLogCallback((log) => {
      if (!logReceived) {
        expect(log).toHaveProperty('timestamp');
        expect(log).toHaveProperty('message');
        expect(log).toHaveProperty('type');
        logReceived = true;
        pingService.stop();
        done();
      }
    });
    pingService.start('8.8.8.8');
  });
});
