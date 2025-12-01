import React, { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import LogPanel from './components/LogPanel';
import pingService from './services/PingService';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component - Ping Monitor Application
 * Implements split-pane layout with control panel and log display
 */
function App() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);

  // Set up ping service log callback
  useEffect(() => {
    pingService.setLogCallback((logEntry) => {
      setLogs((prevLogs) => [...prevLogs, logEntry]);
    });

    // Cleanup on unmount
    return () => {
      pingService.cleanup();
    };
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Handle start ping operation
   * @param {string} ipAddress - IP address to ping
   * @returns {boolean} True if started successfully
   */
  const handleStart = useCallback((ipAddress) => {
    const success = pingService.start(ipAddress);
    if (success) {
      setIsRunning(true);
      setCurrentTarget(ipAddress);
    }
    return success;
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Handle stop ping operation
   */
  const handleStop = useCallback(() => {
    pingService.stop();
    setIsRunning(false);
    setCurrentTarget(null);
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Clear all logs
   */
  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Export logs to a text file
   */
  const handleExportLogs = useCallback(() => {
    if (logs.length === 0) return;

    const logText = logs.map(log => {
      const time = new Date(log.timestamp).toLocaleString();
      return `[${time}] ${log.message}`;
    }).join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ping-log-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [logs]);

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">🌐 Ping Monitor</h1>
        <p className="app-description">Real-time network connectivity monitoring</p>
      </header>
      
      <main className="app-main">
        <div className="split-pane-container">
          <div className="left-pane">
            <ControlPanel
              isRunning={isRunning}
              onStart={handleStart}
              onStop={handleStop}
              currentTarget={currentTarget}
            />
          </div>
          
          <div className="divider" role="separator" aria-orientation="vertical"></div>
          
          <div className="right-pane">
            <LogPanel
              logs={logs}
              onClear={handleClearLogs}
              onExport={handleExportLogs}
            />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Ping Monitor v1.0 • Powered by React</p>
      </footer>
    </div>
  );
}

export default App;
