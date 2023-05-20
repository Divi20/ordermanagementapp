import { render, screen } from '@testing-library/react';
import OrderManagementPage from './OrderManagementPage';

test('renders order management screen', () => {
  render(<OrderManagementPage />);
  const linkElement = screen.getByText('/ordermanagementpage/');
  expect(linkElement).toBeInTheDocument();
});
