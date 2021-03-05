import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UserContext, { App } from '../../App.js';
import { render } from '@testing-library/react';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

export const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<MemoryRouter history={history}>{component}</MemoryRouter>),
  };
};

export const renderWithContext = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <MemoryRouter history={history}>
        <App value={UserContext}>{component}</App>
      </MemoryRouter>,
    ),
  };
};

export const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <MemoryRouter history={history}>
        {<App value={UserContext}>{component}</App>}
      </MemoryRouter>,
    ),
  };
};
