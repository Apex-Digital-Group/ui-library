import * as React from 'react'
import GroupCard from './GroupCard'
import { mockGroups, mockCreatorState } from '../../lib/groupsMockData'

export default { title: 'Components/Groups/GroupCard', component: GroupCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  args: { group: mockGroups[0], creatorState: mockCreatorState, onJoin: () => {} },
}

export const Featured = {
  args: { group: { ...mockGroups[0], featured: true }, creatorState: mockCreatorState, onJoin: () => {} },
}

export const HighCommission = {
  args: { group: { ...mockGroups[0], commission: 25 }, creatorState: mockCreatorState, onJoin: () => {} },
}
