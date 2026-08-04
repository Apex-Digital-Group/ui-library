import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsSection, {
  SettingsRow, SettingsButton, SettingsToggle, SettingsStepper, SettingsPillGroup,
} from './SettingsSection'

describe('Settings primitives', () => {
  it('exports section + compound pieces', () => {
    expect(SettingsSection).toBeDefined()
    expect(SettingsSection.Row).toBe(SettingsRow)
    expect(SettingsSection.Toggle).toBe(SettingsToggle)
    expect(SettingsSection.Stepper).toBe(SettingsStepper)
    expect(SettingsSection.PillGroup).toBe(SettingsPillGroup)
    expect(SettingsSection.Button).toBe(SettingsButton)
  })

  it('renders section with anchor id + rows', () => {
    render(
      <SettingsSection id="account" title="Account" subtitle="sub">
        <SettingsRow title="Row A" description="d" control={<span>ctl</span>} />
      </SettingsSection>
    )
    expect(document.getElementById('account')).toBeTruthy()
    expect(screen.getByText('Row A')).toBeTruthy()
  })

  it('comingSoon row shows the chip and mutes the control', () => {
    const onChange = vi.fn()
    const { container } = render(
      <SettingsRow title="Payouts" comingSoon control={<SettingsToggle ariaLabel="t" checked={false} onChange={onChange} />} />
    )
    expect(screen.getByText('Coming soon')).toBeTruthy()
    expect(container.querySelector('.bond-set-row--soon')).toBeTruthy()
  })

  it('toggle reports the flipped value and respects disabled', () => {
    const onChange = vi.fn()
    const { rerender } = render(<SettingsToggle ariaLabel="t" checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
    rerender(<SettingsToggle ariaLabel="t" checked disabled onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('stepper steps and clamps at min/max', () => {
    const onChange = vi.fn()
    render(<SettingsStepper ariaLabel="v" value={1} min={1} max={2} onChange={onChange} />)
    expect(screen.getByLabelText('Decrease').disabled).toBe(true)
    fireEvent.click(screen.getByLabelText('Increase'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('pill group selects exclusively via aria-pressed', () => {
    const onChange = vi.fn()
    render(<SettingsPillGroup ariaLabel="lang" value="en" onChange={onChange}
      options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }]} />)
    expect(screen.getByRole('button', { name: 'English' }).getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Français' }))
    expect(onChange).toHaveBeenCalledWith('fr')
  })

  it('button renders as link when as="a"', () => {
    render(<SettingsButton as="a" href="/wallet">Wallet</SettingsButton>)
    const a = screen.getByRole('link', { name: 'Wallet' })
    expect(a.getAttribute('href')).toBe('/wallet')
  })
})
