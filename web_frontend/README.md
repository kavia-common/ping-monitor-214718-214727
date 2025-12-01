# Ping Monitor Application

A modern, accessible web application for monitoring network connectivity through real-time ping operations. Built with React and the Ocean Professional theme.

## Features

- **Split-Pane UI**: Clean layout with control panel on the left and real-time logs on the right
- **Real-Time Monitoring**: Live ping results updating every second
- **Simulated Ping Service**: Client-side ping simulation with realistic latency and packet loss
- **Accessible Controls**: WCAG-compliant UI with keyboard navigation and ARIA labels
- **Log Management**: Export logs to file and clear history
- **Ocean Professional Theme**: Modern design with blue (#2563EB) and amber (#F59E0B) accents
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Environment Configuration**: Uses REACT_APP environment variables for flexibility

## Getting Started

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

Development mode:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

For CI/non-interactive mode:
```bash
CI=true npm test
```

## Usage

1. **Enter Target**: Type an IP address (e.g., 8.8.8.8) or hostname (e.g., google.com) in the input field
2. **Start Ping**: Click the "▶️ Start Ping" button to begin monitoring
3. **View Results**: Watch real-time ping results appear in the log panel
4. **Stop Ping**: Click the "⏹️ Stop Ping" button to halt monitoring
5. **Export Logs**: Click "📥 Export" to save logs to a text file
6. **Clear Logs**: Click "🗑️ Clear" to remove all log entries

## Architecture

### Components

- **App.js**: Main application container managing state and orchestration
- **ControlPanel**: Left pane with IP input and Start/Stop controls
- **LogPanel**: Right pane displaying real-time ping results

### Services

- **PingService**: Simulates ping operations with:
  - IP/hostname validation
  - Realistic latency (10-150ms)
  - Packet loss simulation (2%)
  - Sequence numbering
  - Optional Web Worker support

### Utilities

- **env.js**: Environment variable access helpers for REACT_APP_* variables

### Styling

- **Ocean Professional Theme**: Primary blue (#2563EB), secondary amber (#F59E0B)
- **Modern Design**: Rounded corners, subtle shadows, smooth transitions
- **CSS Variables**: Centralized theme management
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1200px

## Environment Variables

The application uses the following REACT_APP environment variables (defined in .env):

- `REACT_APP_API_BASE`: API base URL
- `REACT_APP_BACKEND_URL`: Backend service URL
- `REACT_APP_FRONTEND_URL`: Frontend URL
- `REACT_APP_WS_URL`: WebSocket URL
- `REACT_APP_NODE_ENV`: Environment mode
- `REACT_APP_NEXT_TELEMETRY_DISABLED`: Telemetry setting
- `REACT_APP_ENABLE_SOURCE_MAPS`: Source maps flag
- `REACT_APP_PORT`: Application port
- `REACT_APP_TRUST_PROXY`: Proxy trust setting
- `REACT_APP_LOG_LEVEL`: Logging level
- `REACT_APP_HEALTHCHECK_PATH`: Health check endpoint
- `REACT_APP_FEATURE_FLAGS`: Feature flags
- `REACT_APP_EXPERIMENTS_ENABLED`: Experiments flag

## Testing

The application includes comprehensive tests:

- **Component Tests**: ControlPanel, LogPanel, App
- **Service Tests**: PingService with validation and state management
- **Utility Tests**: Environment variable helpers

Test coverage includes:
- UI rendering and interactions
- Button state management
- Log display and formatting
- IP validation logic
- Service lifecycle management

## Accessibility

The application follows WCAG 2.1 AA guidelines:

- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Focus management and indicators
- Screen reader announcements for status changes
- High contrast color scheme
- Responsive text sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Web Worker implementation for background ping operations
- Historical data visualization with charts
- Multiple target monitoring
- Customizable ping intervals
- Ping statistics (min/max/avg latency, packet loss %)
- Dark mode toggle
- Sound notifications for connectivity issues

## License

This project is part of the KAVIA platform.

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
