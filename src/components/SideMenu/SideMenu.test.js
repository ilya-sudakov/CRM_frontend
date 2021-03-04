import { cleanup, screen } from '@testing-library/react';
import SideMenu from './SideMenu.jsx';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouterAndContext } from 'Utils/testing/functions.js';
import { getDefaultItems, sortCategories } from './functions.js';

describe('Sidemenu component', () => {
  afterEach(cleanup);

  it('renders w/ router & context', () => {
    renderWithRouterAndContext(<SideMenu />);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouterAndContext(<SideMenu />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('is hidden', () => {
    renderWithRouterAndContext(<SideMenu hidden={true} />);
  });

  // FUNCTIONS
  it('sorts categories', () => {
    const categories = [
      { name: 'name1' },
      { name: 'name2' },
      { name: 'name2' },
      { name: '3name' },
    ];
    const expectedCategories = [
      { name: '3name' },
      { name: 'name1' },
      { name: 'name2' },
      { name: 'name2' },
    ];
    expect(sortCategories(categories)).toEqual(expectedCategories);
  });

  it('gets default sidemenu items list', () => {
    let userContext = { userHasAccess: () => true };
    expect(getDefaultItems(userContext));
    userContext = { userHasAccess: () => false };
    expect(getDefaultItems(userContext));
  });
});
