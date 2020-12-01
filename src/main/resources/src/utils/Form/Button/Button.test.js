import React from 'react'
import Button from './Button.jsx'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'

describe('Button component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(<Button />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/o props', () => {
    render(<Button />)
  })

  it('renders button w/ inverted styles', () => {
    render(<Button inverted />)
    const button = screen.getByRole('button')
    expect(button.classList.contains('button--inverted')).toBe(true)
  })

  it('handles onClick event', () => {
    let temp = 0
    render(<Button onClick={() => temp++} />)
    fireEvent.click(screen.getByRole('button'))
    expect(temp === 1).toBe(true)
  })

  it('ignores onClick event if loading is happening', () => {
    let temp = 0
    render(<Button onClick={() => temp++} isLoading={true} />)
    fireEvent.click(screen.getByRole('button'))
    expect(temp === 0).toBe(true)
  })
})
