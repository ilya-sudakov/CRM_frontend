import React from 'react'
import { cleanup, screen } from '@testing-library/react'
import Header from './Header.jsx'
import '@testing-library/jest-dom/extend-expect'
import { renderWithRouterAndContext } from '../../utils/testing/functions.js'

describe('Header component', () => {
  afterEach(cleanup)

  it('renders w/ router & context', () => {
    renderWithRouterAndContext(<Header />)
  })

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouterAndContext(<Header />)
    expect(asFragment()).toMatchSnapshot()
  })
})
