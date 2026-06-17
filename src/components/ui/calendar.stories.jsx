import * as React from 'react'
import { Calendar } from './calendar'

export default {
  title: 'Components/calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const CalendarExample = {
  name: 'Calendar',
  render: (args) => <Calendar {...args} />,
  args: {},
}
