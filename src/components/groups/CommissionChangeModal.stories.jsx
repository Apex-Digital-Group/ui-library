import * as React from 'react'
import CommissionChangeModal from './CommissionChangeModal'

export default { title: 'Components/Groups/CommissionChangeModal', component: CommissionChangeModal, tags: ['autodocs'], parameters: { layout: 'fullscreen' } }

export const Default = {
  args: {
    creator: {
      name: 'Ahri',
      username: '@ahri',
      avatar: 'https://i.pravatar.cc/80?img=11',
      commission: 10,
    },
    onClose: () => {},
  },
}
