import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('accepts user typing', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Email" />)
    const el = screen.getByPlaceholderText('Email')
    await user.type(el, 'fazle@bondmedia.ae')
    expect(el).toHaveValue('fazle@bondmedia.ae')
  })

  it('forwards type attribute', () => {
    render(<Input type="password" placeholder="pwd" />)
    expect(screen.getByPlaceholderText('pwd')).toHaveAttribute('type', 'password')
  })
})
