import Pagination from './Pagination.jsx';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from 'Utils/testing/functions';

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

  it('renders 3', () => {
    renderWithRouter(<Pagination itemsCount={300} curPage={100} />);
  });

  it('renders 4', () => {
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

  it('user clicks on in between page', async () => {
    renderWithRouter(
      <Pagination itemsCount={300} curPage={15} setCurPage={(item) => item} />,
    );
    const inBetweenPageButton = document.getElementsByClassName(
      'main-window__page-number',
    )[2];
    fireEvent.click(inBetweenPageButton);
    // expect(await screen.findByText("14")).toBeInTheDocument();
  });

  it('user clicks on last page', async () => {
    renderWithRouter(
      <Pagination itemsCount={600} curPage={15} setCurPage={(item) => item} />,
    );
    let lastPageButton = document.getElementsByClassName(
      'main-window__page-number',
    );
    lastPageButton = lastPageButton[lastPageButton.length - 2];
    fireEvent.click(lastPageButton);
    // expect(await screen.findByText("14")).toBeInTheDocument();
  });

  it('user clicks on first page', async () => {
    renderWithRouter(
      <Pagination itemsCount={300} curPage={15} setCurPage={(item) => item} />,
    );
    let lastPageButton = document.getElementsByClassName(
      'main-window__page-number',
    );
    lastPageButton = lastPageButton[1];
    fireEvent.click(lastPageButton);
    // expect(await screen.findByText("14")).toBeInTheDocument();
  });

  it('user clicks on next page', async () => {
    renderWithRouter(
      <Pagination itemsCount={600} curPage={15} setCurPage={(item) => item} />,
    );
    const nextPageButton = document.getElementsByClassName(
      'main-window__page-number--skip',
    )[1];
    fireEvent.click(nextPageButton);
    // expect(await screen.findByText("14")).toBeInTheDocument();
  });
});
