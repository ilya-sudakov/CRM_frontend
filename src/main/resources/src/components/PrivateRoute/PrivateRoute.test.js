import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import PrivateRoute from './PrivateRoute.jsx'
import UserContext from '../../App.js'
import { App } from '../../App/App.js'

const renderWithContext = (component) => {
  return {
    ...render(<App value={UserContext}>{component}</App>),
  }
}

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory()
  return {
    ...render(
      <MemoryRouter history={history}>
        {<App value={UserContext}>{component}</App>}
      </MemoryRouter>,
    ),
  }
}

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('PrivateRoute component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = renderWithContext(<PrivateRoute />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/ context', () => {
    renderWithContext(<PrivateRoute />)
  })

  it('renders w/ router & context', () => {
    renderWithRouterAndContext(<PrivateRoute />)
  })

  it('redirect to LoginPage if token is not stored', () => {
    renderWithRouterAndContext(<PrivateRoute />)
    setTimeout(
      () => expect(mockHistoryPush).toHaveBeenCalledWith('/login'),
      1000,
    )
  })

  it('renders component if user is allowed', () => {
    // renderWithRouterAndContext(<PrivateRoute />)
  })

  it('renders component if no restrictions are provided', () => {
    // renderWithRouterAndContext(<PrivateRoute />)
  })
})
