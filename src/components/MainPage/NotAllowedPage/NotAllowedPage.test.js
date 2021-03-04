import NotAllowedPage from './NotAllowedPage.jsx';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../../../utils/testing/functions.js';

describe('NotAllowedPage component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouter(<NotAllowedPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders', () => {
    renderWithRouter(<NotAllowedPage />);
  });
});
