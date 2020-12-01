import React from 'react'
import TasksList from './TasksList.jsx'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'

describe('TasksList component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(<TasksList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/o props', () => {
    render(<TasksList />)
  })

  it('renders tasks list', () => {
    // render(<TasksList />)
  })

  it('renders expired task', () => {
    // render(<TasksList />)
  })
})
