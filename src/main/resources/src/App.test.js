import React from 'react'
import { render, cleanup } from '@testing-library/react'

import App from './App.js'
import { UserContext } from './App'

const renderWithContext = (component) => {
  return {
    ...render(
      <UserContext.Provider value={UserContext}>
        {component}
      </UserContext.Provider>,
    ),
  }
}

afterEach(cleanup)

it('matches snapshot', () => {
  const { asFragment } = render(<App />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders w/ context', () => {
  renderWithContext(<App />)
})

//successive login if accessToken cached (Header)

//redirect to LoginPage if token is not stored
