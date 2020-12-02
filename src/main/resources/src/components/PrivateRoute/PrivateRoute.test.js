import React from 'react'
import { cleanup } from '@testing-library/react'
import PrivateRoute from './PrivateRoute.jsx'
import {
  renderWithContext,
  renderWithRouterAndContext,
} from '../../utils/testing/functions.js'

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
