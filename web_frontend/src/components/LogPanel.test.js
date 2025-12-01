import { render, screen, fireEvent } from '@testing-library/react';
import LogPanel from './LogPanel';

describe('LogPanel Component', () => {
  const mockOnClear = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    mockOnClear.mockClear();
    mockOnExport.mockClear();
  });

  test('renders log panel title', () => {
    render(<LogPanel logs={[]} onClear={mockOnClear} onExport={mockOnExport} />);
    const title = screen.getByText(/Ping Results/i);
    expect(title).toBeInTheDocument();
  });

  test('shows empty state when no logs', () => {
    render(<LogPanel logs={[]} onClear={mockOnClear} onExport={mockOnExport} />);
    const emptyMessage = screen.getByText(/No ping results yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('renders log entries', () => {
    const logs = [
      { timestamp: new Date().toISOString(), message: 'Test log 1', type: 'info' },
      { timestamp: new Date().toISOString(), message: 'Test log 2', type: 'success' }
    ];
    render(<LogPanel logs={logs} onClear={mockOnClear} onExport={mockOnExport} />);
    
    expect(screen.getByText('Test log 1')).toBeInTheDocument();
    expect(screen.getByText('Test log 2')).toBeInTheDocument();
  });

  test('export button disabled when no logs', () => {
    render(<LogPanel logs={[]} onClear={mockOnClear} onExport={mockOnExport} />);
    const exportButton = screen.getByRole('button', { name: /Export/i });
    expect(exportButton).toBeDisabled();
  });

  test('clear button disabled when no logs', () => {
    render(<LogPanel logs={[]} onClear={mockOnClear} onExport={mockOnExport} />);
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    expect(clearButton).toBeDisabled();
  });

  test('calls onClear when clear button clicked', () => {
    const logs = [
      { timestamp: new Date().toISOString(), message: 'Test log', type: 'info' }
    ];
    render(<LogPanel logs={logs} onClear={mockOnClear} onExport={mockOnExport} />);
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalled();
  });

  test('calls onExport when export button clicked', () => {
    const logs = [
      { timestamp: new Date().toISOString(), message: 'Test log', type: 'info' }
    ];
    render(<LogPanel logs={logs} onClear={mockOnClear} onExport={mockOnExport} />);
    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);
    expect(mockOnExport).toHaveBeenCalled();
  });

  test('displays log count', () => {
    const logs = [
      { timestamp: new Date().toISOString(), message: 'Log 1', type: 'info' },
      { timestamp: new Date().toISOString(), message: 'Log 2', type: 'info' },
      { timestamp: new Date().toISOString(), message: 'Log 3', type: 'info' }
    ];
    render(<LogPanel logs={logs} onClear={mockOnClear} onExport={mockOnExport} />);
    expect(screen.getByText('3 entries')).toBeInTheDocument();
  });
});
