import { render, screen, fireEvent } from '@testing-library/react';
import ControlPanel from './ControlPanel';

describe('ControlPanel Component', () => {
  const mockOnStart = jest.fn();
  const mockOnStop = jest.fn();

  beforeEach(() => {
    mockOnStart.mockClear();
    mockOnStop.mockClear();
  });

  test('renders control panel title', () => {
    render(
      <ControlPanel
        isRunning={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget={null}
      />
    );
    const title = screen.getByText(/Ping Monitor/i);
    expect(title).toBeInTheDocument();
  });

  test('renders IP input field with default value', () => {
    render(
      <ControlPanel
        isRunning={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget={null}
      />
    );
    const input = screen.getByLabelText(/IP address or hostname/i);
    expect(input).toHaveValue('8.8.8.8');
  });

  test('calls onStart when start button clicked', () => {
    mockOnStart.mockReturnValue(true);
    render(
      <ControlPanel
        isRunning={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget={null}
      />
    );
    const startButton = screen.getByRole('button', { name: /Start Ping/i });
    fireEvent.click(startButton);
    expect(mockOnStart).toHaveBeenCalledWith('8.8.8.8');
  });

  test('calls onStop when stop button clicked', () => {
    render(
      <ControlPanel
        isRunning={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget="8.8.8.8"
      />
    );
    const stopButton = screen.getByRole('button', { name: /Stop Ping/i });
    fireEvent.click(stopButton);
    expect(mockOnStop).toHaveBeenCalled();
  });

  test('disables input when running', () => {
    render(
      <ControlPanel
        isRunning={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget="8.8.8.8"
      />
    );
    const input = screen.getByLabelText(/IP address or hostname/i);
    expect(input).toBeDisabled();
  });

  test('shows current target when running', () => {
    render(
      <ControlPanel
        isRunning={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
        currentTarget="8.8.8.8"
      />
    );
    const target = screen.getByText(/Currently pinging:/i);
    expect(target).toBeInTheDocument();
    expect(screen.getByText('8.8.8.8')).toBeInTheDocument();
  });
});
