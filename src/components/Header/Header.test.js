import { cleanup, fireEvent } from '@testing-library/react';
import Header from './Header.jsx';
import { renderWithRouterAndContext } from 'Utils/testing/functions.js';

describe('Header component', () => {
  afterEach(cleanup);

  it('renders w/ router & context', () => {
    renderWithRouterAndContext(<Header />);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouterAndContext(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('closes sidemenu', () => {
    let sidemenuHidden = false;
    renderWithRouterAndContext(
      <Header
        sidemenuHidden={sidemenuHidden}
        setSidemenuHidden={(sidemenuHidden) =>
          (sidemenuHidden = !sidemenuHidden)
        }
      />,
    );
    setTimeout(async () => {
      const sidemenuButton = document.getElementsByClassName(
        'header__sidemenu',
      )[0];
      fireEvent.click(sidemenuButton);
      expect(sidemenuHidden).toBe(true);
    }, 1000);
  });
});
