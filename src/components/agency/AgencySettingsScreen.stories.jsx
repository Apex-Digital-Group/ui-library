import * as React from 'react'
import AgencySettingsScreen from './AgencySettingsScreen'

export default {
  title: 'Components/AgencySettingsScreen',
  component: AgencySettingsScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'AgencySettingsScreen',
  render: (args) => <AgencySettingsScreen {...args} />,
  args: {},
}
