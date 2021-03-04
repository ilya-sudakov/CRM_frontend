import Pagination from './Pagination.jsx';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../../testing/functions.js';

describe('Pagination component', () => {
  afterEach(cleanup);

  it('renders', () => {
    renderWithRouter(<Pagination />);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouter(<Pagination />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders 2', () => {
    renderWithRouter(<Pagination itemsCount={300} curPage={1} />);
  });

  it('renders 2', () => {
    renderWithRouter(<Pagination itemsCount={300} curPage={100} />);
  });

  it('renders 2', () => {
    renderWithRouter(<Pagination itemsCount={300} curPage={300} />);
  });

  it('user clicks on prev page', async () => {
    renderWithRouter(
      <Pagination itemsCount={300} curPage={15} setCurPage={(item) => item} />,
    );
    const prevPageButton = document.getElementsByClassName(
      'main-window__page-number--skip',
    )[0];
    fireEvent.click(prevPageButton);
    // expect(await screen.findByText("14")).toBeInTheDocument();
  });
});
