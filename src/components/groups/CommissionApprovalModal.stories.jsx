import * as React from 'react'
import CommissionApprovalModal from './CommissionApprovalModal'

export default { title: 'Components/Groups/CommissionApprovalModal', component: CommissionApprovalModal, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  args: {
    data: { newRate: 12, oldRate: 10 },
    groupName: 'Gemini Elite Creators',
    groupOwner: '@geminiowner',
    currentNet: 5200,
    onClose: () => {},
  },
}
