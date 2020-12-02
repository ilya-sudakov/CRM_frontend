import React from 'react'
import TasksWidget from './TasksWidget.jsx'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import UserContext, { App } from '../../../../App.js'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(cleanup)

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

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

describe('TasksWidget component', () => {
  it('renders', () => {
    renderWithRouterAndContext(<TasksWidget />)
  })

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouterAndContext(<TasksWidget />)
    expect(asFragment()).toMatchSnapshot()
  })
})
