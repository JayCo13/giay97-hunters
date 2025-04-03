import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game container', () => {
  render(<App />);
  const gameElement = document.querySelector('.game-container');
  expect(gameElement).toBeInTheDocument();
});
