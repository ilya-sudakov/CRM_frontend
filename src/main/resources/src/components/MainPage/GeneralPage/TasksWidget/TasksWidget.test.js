import React from 'react'
import TasksWidget from './TasksWidget.jsx'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

it('matches snapshot', () => {
  // const { asFragment } = render(<TasksWidget />)
  // expect(asFragment()).toMatchSnapshot()
})
