import React from 'react';
import { render } from '@testing-library/react';
import RadarDisplay from './components/RadarDisplay/RadarDisplayw';

// Sample data for testing
const mockDevices = [
  { id: 1, name: 'Device 1', x: 50, y: 30 },
  { id: 2, name: 'Device 2', x: 70, y: 40 },
  // Add more sample data as needed
];

test('RadarDisplay renders without crashing', () => {
  render(<RadarDisplay devices={[]} />);
});

test('RadarDisplay renders device icons', () => {
  const { getByTestId } = render(<RadarDisplay devices={mockDevices} />);
  const deviceIcon1 = getByTestId('device-icon-1');
  const deviceIcon2 = getByTestId('device-icon-2');

  // Test if the device icons are rendered correctly
  expect(deviceIcon1).toBeInTheDocument();
  expect(deviceIcon2).toBeInTheDocument();
});

// Add more test cases as needed
