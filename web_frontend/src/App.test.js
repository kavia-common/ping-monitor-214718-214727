import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders ping monitor title', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { name: /🌐 Ping Monitor/i, level: 1 });
    expect(titleElement).toBeInTheDocument();
  });

  test('renders control panel', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Ping/i });
    expect(startButton).toBeInTheDocument();
  });

  test('renders log panel', () => {
    render(<App />);
    const logPanelTitle = screen.getByRole('heading', { name: /Ping Results/i });
    expect(logPanelTitle).toBeInTheDocument();
  });

  test('start button is enabled by default', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Ping/i });
    expect(startButton).not.toBeDisabled();
  });

  test('stop button is disabled initially', () => {
    render(<App />);
    const stopButton = screen.getByRole('button', { name: /Stop Ping/i });
    expect(stopButton).toBeDisabled();
  });

  test('shows empty state message when no logs', () => {
    render(<App />);
    const emptyMessage = screen.getByText(/No ping results yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('export button is disabled when no logs', () => {
    render(<App />);
    const exportButton = screen.getByRole('button', { name: /Export/i });
    expect(exportButton).toBeDisabled();
  });

  test('clear button is disabled when no logs', () => {
    render(<App />);
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    expect(clearButton).toBeDisabled();
  });

  test('clicking start enables stop button', async () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start Ping/i });
    const stopButton = screen.getByRole('button', { name: /Stop Ping/i });

    fireEvent.click(startButton);

    await waitFor(() => {
      expect(stopButton).not.toBeDisabled();
      expect(startButton).toBeDisabled();
    });
  });
});
