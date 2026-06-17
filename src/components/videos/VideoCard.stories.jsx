import * as React from 'react'
import VideoCard from './VideoCard'

const sample = {
  id: 'L1',
  type: 'model',
  thumbnail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=640',
  displayName: 'PinkBlonde',
  isOnline: true,
  statusLabel: 'LIVE',
  ribbonLabel: 'Hot',
  features: { hd: true, mobileLive: true },
  pricePerMinute: 0.99,
  showTypes: ['Free chat'],
}

export default { title: 'Components/Videos/VideoCard', component: VideoCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = { args: { data: sample } }
export const Offline = { args: { data: { ...sample, isOnline: false, statusLabel: 'OFFLINE' } } }
export const VipRibbon = { args: { data: { ...sample, ribbonLabel: 'VIP', pricePerMinute: 2.99 } } }
