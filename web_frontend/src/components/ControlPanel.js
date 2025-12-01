import React, { useState } from 'react';
import '../styles/ControlPanel.css';

// PUBLIC_INTERFACE
/**
 * ControlPanel component - Provides UI for IP input and ping control
 * @param {boolean} isRunning - Whether ping is currently active
 * @param {Function} onStart - Callback when Start button is clicked
 * @param {Function} onStop - Callback when Stop button is clicked
 * @param {string} currentTarget - Current IP being pinged
 */
const ControlPanel = ({ isRunning, onStart, onStop, currentTarget }) => {
  const [ipAddress, setIpAddress] = useState('8.8.8.8');
  const [error, setError] = useState('');

  /**
   * Handle IP address input change
   * @param {Event} e - Input change event
   */
  const handleIpChange = (e) => {
    setIpAddress(e.target.value);
    setError(''); // Clear error when user types
  };

  /**
   * Handle Start button click
   */
  const handleStart = () => {
    if (!ipAddress.trim()) {
      setError('Please enter an IP address or hostname');
      return;
    }
    
    const success = onStart(ipAddress.trim());
    if (!success) {
      setError('Failed to start ping. Please check the IP address.');
    } else {
      setError('');
    }
  };

  /**
   * Handle Stop button click
   */
  const handleStop = () => {
    onStop();
    setError('');
  };

  /**
   * Handle Enter key press in input field
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isRunning) {
      handleStart();
    }
  };

  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <h2>Ping Monitor</h2>
        <p className="subtitle">Enter an IP address or hostname to start monitoring</p>
      </div>
      
      <div className="control-content">
        <div className="input-group">
          <label htmlFor="ip-input" className="input-label">
            Target Address
          </label>
          <input
            id="ip-input"
            type="text"
            className={`ip-input ${error ? 'input-error' : ''}`}
            value={ipAddress}
            onChange={handleIpChange}
            onKeyPress={handleKeyPress}
            disabled={isRunning}
            placeholder="e.g., 8.8.8.8 or google.com"
            aria-label="IP address or hostname"
            aria-invalid={!!error}
            aria-describedby={error ? 'ip-error' : undefined}
          />
          {error && (
            <span id="ip-error" className="error-message" role="alert">
              {error}
            </span>
          )}
        </div>

        {currentTarget && (
          <div className="current-target" role="status">
            <span className="status-indicator">●</span>
            <span>Currently pinging: <strong>{currentTarget}</strong></span>
          </div>
        )}

        <div className="button-group">
          <button
            className="btn-primary btn-large"
            onClick={handleStart}
            disabled={isRunning}
            aria-label="Start ping operation"
          >
            ▶️ Start Ping
          </button>
          <button
            className="btn-stop btn-large"
            onClick={handleStop}
            disabled={!isRunning}
            aria-label="Stop ping operation"
          >
            ⏹️ Stop Ping
          </button>
        </div>

        <div className="info-box">
          <p className="info-title">ℹ️ Information</p>
          <ul className="info-list">
            <li>Pings are simulated client-side for demonstration</li>
            <li>Results update every second</li>
            <li>Export logs to save ping history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
