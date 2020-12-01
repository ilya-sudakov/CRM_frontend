import React from 'react'
import { render, cleanup } from '@testing-library/react'

import PrivateRoute from './PrivateRoute.jsx'
import { UserContext } from '../../App.js'
import App from '../../App.js'

const renderWithContext = (component) => {
  return {
    ...render(<App value={UserContext}>{component}</App>),
  }
}

describe('PrivateRoute component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = renderWithContext(<PrivateRoute />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/ context', () => {
    renderWithContext(<PrivateRoute />)
  })

  //redirect to LoginPage if token is not stored

  //renders component if user is allowed

  //renders component if no restrictions are provided
})
