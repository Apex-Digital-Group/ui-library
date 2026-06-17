import * as React from 'react'
import { Skeleton } from './skeleton'

export default {
  title: 'Components/skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const SkeletonExample = {
  name: 'Skeleton',
  render: (args) => <Skeleton {...args} />,
  args: {},
}
