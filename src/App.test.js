import { cleanup } from '@testing-library/react';

import { App } from './App.js';
import { renderWithContext } from './utils/testing/functions.js';

describe('App component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = renderWithContext(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders w/ context', () => {
    renderWithContext(<App />);
  });
});
