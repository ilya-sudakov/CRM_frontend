import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { App } from './App.js';
import { renderWithContext } from './utils/testing/functions.js';

describe('App component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders w/ context', () => {
    renderWithContext(<App />);
  });
});
