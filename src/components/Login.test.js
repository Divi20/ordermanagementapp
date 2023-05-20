import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders order management screen', () => {
  render(<Login />);
  const linkElement = screen.getByText('/login/');
  expect(linkElement).toBeInTheDocument();
});