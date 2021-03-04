import React from 'react';
import PageNotFound from './PageNotFound.jsx';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../../../utils/testing/functions.js';

describe('PageNotFound component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouter(<PageNotFound />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders', () => {
    renderWithRouter(<PageNotFound />);
  });
});
