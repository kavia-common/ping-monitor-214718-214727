/**
 * PingService - Simulates ping functionality with realistic latency and packet loss
 * This is a client-side simulation for demonstration purposes
 */

// PUBLIC_INTERFACE
/**
 * PingService class that simulates ping operations
 */
class PingService {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
    this.currentTarget = null;
    this.sequenceNumber = 0;
    this.onLogCallback = null;
    this.worker = null;
    this.useWorker = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Set callback for log messages
   * @param {Function} callback - Function to call with log messages
   */
  setLogCallback(callback) {
    this.onLogCallback = callback;
  }

  // PUBLIC_INTERFACE
  /**
   * Enable Web Worker for ping simulation
   * @param {boolean} enable - Whether to use Web Worker
   */
  setUseWorker(enable) {
    this.useWorker = enable;
  }

  /**
   * Log a message via callback
   * @param {string} message - Message to log
   * @param {string} type - Message type (info, success, error)
   */
  log(message, type = 'info') {
    if (this.onLogCallback) {
      this.onLogCallback({
        timestamp: new Date().toISOString(),
        message,
        type,
        sequence: this.sequenceNumber
      });
    }
  }

  /**
   * Validate IP address format
   * @param {string} ip - IP address to validate
   * @returns {boolean} True if valid IP address
   */
  isValidIP(ip) {
    if (!ip) return false;
    
    // IPv4 pattern
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Hostname pattern (basic)
    const hostnamePattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (ipv4Pattern.test(ip)) {
      const parts = ip.split('.');
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
    }
    
    return hostnamePattern.test(ip);
  }

  /**
   * Simulate a single ping request
   * @returns {Promise<Object>} Ping result with latency and status
   */
  async simulatePing() {
    return new Promise((resolve) => {
      // Simulate network latency (10-100ms typically, with occasional spikes)
      const baseLatency = 10 + Math.random() * 40;
      const spike = Math.random() < 0.1 ? Math.random() * 100 : 0;
      const latency = Math.round(baseLatency + spike);
      
      // Simulate packet loss (2% chance)
      const packetLost = Math.random() < 0.02;
      
      setTimeout(() => {
        resolve({
          success: !packetLost,
          latency,
          timestamp: Date.now()
        });
      }, latency);
    });
  }

  /**
   * Execute a single ping and log the result
   */
  async executePing() {
    this.sequenceNumber++;
    const seq = this.sequenceNumber;
    
    try {
      const result = await this.simulatePing();
      
      if (result.success) {
        const message = `Reply from ${this.currentTarget}: bytes=32 time=${result.latency}ms TTL=64`;
        this.log(message, 'success');
      } else {
        const message = `Request timeout for icmp_seq ${seq}`;
        this.log(message, 'error');
      }
    } catch (error) {
      this.log(`Error during ping: ${error.message}`, 'error');
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Start pinging a target IP address
   * @param {string} ipAddress - IP address or hostname to ping
   * @returns {boolean} True if ping started successfully
   */
  start(ipAddress) {
    if (this.isRunning) {
      this.log('Ping is already running', 'error');
      return false;
    }

    if (!this.isValidIP(ipAddress)) {
      this.log(`Invalid IP address or hostname: ${ipAddress}`, 'error');
      return false;
    }

    this.currentTarget = ipAddress;
    this.sequenceNumber = 0;
    this.isRunning = true;
    
    this.log(`Starting ping to ${ipAddress}...`, 'info');
    this.log(`PING ${ipAddress} 56(84) bytes of data.`, 'info');
    
    // Execute first ping immediately
    this.executePing();
    
    // Then continue at 1 second intervals
    this.intervalId = setInterval(() => {
      this.executePing();
    }, 1000);
    
    return true;
  }

  // PUBLIC_INTERFACE
  /**
   * Stop the current ping operation
   * @returns {Object} Statistics about the ping session
   */
  stop() {
    if (!this.isRunning) {
      this.log('No ping operation is running', 'error');
      return null;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    
    const stats = {
      target: this.currentTarget,
      packetsTransmitted: this.sequenceNumber,
      timestamp: new Date().toISOString()
    };
    
    this.log(`\n--- ${this.currentTarget} ping statistics ---`, 'info');
    this.log(`${this.sequenceNumber} packets transmitted`, 'info');
    this.log('Ping stopped.', 'info');
    
    this.currentTarget = null;
    
    return stats;
  }

  // PUBLIC_INTERFACE
  /**
   * Check if ping is currently running
   * @returns {boolean} True if ping is active
   */
  getIsRunning() {
    return this.isRunning;
  }

  // PUBLIC_INTERFACE
  /**
   * Get current target being pinged
   * @returns {string|null} Current target or null
   */
  getCurrentTarget() {
    return this.currentTarget;
  }

  // PUBLIC_INTERFACE
  /**
   * Clean up resources
   */
  cleanup() {
    if (this.isRunning) {
      this.stop();
    }
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// Export singleton instance
const pingService = new PingService();
export default pingService;
