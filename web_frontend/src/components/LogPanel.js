import React, { useEffect, useRef } from 'react';
import '../styles/LogPanel.css';

// PUBLIC_INTERFACE
/**
 * LogPanel component - Displays ping logs with auto-scroll and export capabilities
 * @param {Array} logs - Array of log entries
 * @param {Function} onClear - Callback to clear logs
 * @param {Function} onExport - Callback to export logs
 */
const LogPanel = ({ logs, onClear, onExport }) => {
  const logEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  /**
   * Format timestamp for display
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted time string
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  /**
   * Get CSS class for log entry based on type
   * @param {string} type - Log type (info, success, error)
   * @returns {string} CSS class name
   */
  const getLogClass = (type) => {
    switch (type) {
      case 'success':
        return 'log-entry log-success';
      case 'error':
        return 'log-entry log-error';
      default:
        return 'log-entry log-info';
    }
  };

  return (
    <div className="log-panel">
      <div className="log-panel-header">
        <h2>Ping Results</h2>
        <div className="log-controls">
          <button
            className="btn-secondary btn-small"
            onClick={onExport}
            disabled={logs.length === 0}
            aria-label="Export logs to file"
          >
            📥 Export
          </button>
          <button
            className="btn-secondary btn-small"
            onClick={onClear}
            disabled={logs.length === 0}
            aria-label="Clear all logs"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
      <div className="log-container" ref={containerRef} role="log" aria-live="polite">
        {logs.length === 0 ? (
          <div className="log-empty">
            <p>No ping results yet. Enter an IP address and click Start to begin.</p>
          </div>
        ) : (
          <div className="log-entries">
            {logs.map((log, index) => (
              <div key={index} className={getLogClass(log.type)}>
                <span className="log-time">[{formatTime(log.timestamp)}]</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
      <div className="log-footer">
        <span className="log-count">{logs.length} entries</span>
      </div>
    </div>
  );
};

export default LogPanel;
