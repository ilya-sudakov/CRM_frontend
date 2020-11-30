import React from 'react'
import { render, cleanup } from '@testing-library/react'

import App from './App.js'

afterEach(cleanup)

it('matches snapshot', () => {
  const { asFragment } = render(<App />)
  expect(asFragment()).toMatchSnapshot()
})
