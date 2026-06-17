import * as React from 'react'
import JoinRequestModal from './JoinRequestModal'
import { mockGroups } from '../../lib/groupsMockData'

export default { title: 'Components/Groups/JoinRequestModal', component: JoinRequestModal, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  args: { group: mockGroups[0], onClose: () => {} },
}
