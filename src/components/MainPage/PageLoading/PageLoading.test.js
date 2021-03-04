import React from 'react';
import PageLoading from './PageLoading.jsx';
import { render, cleanup } from '@testing-library/react';

describe('PageLoading component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = render(<PageLoading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders', () => {
    render(<PageLoading />);
  });
});
