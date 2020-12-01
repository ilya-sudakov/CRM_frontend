import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Widget from './Widget.jsx'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  return {
    ...render(<MemoryRouter history={history}>{component}</MemoryRouter>),
  }
}

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Widget component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(<Widget />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/o props', () => {
    renderWithRouter(<Widget />)
  })

  it('redirects on link button click', () => {
    renderWithRouter(
      <Widget
        linkTo={{
          text: 'Перейти',
          address: '/requests',
        }}
      />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/requests')
  })
})
