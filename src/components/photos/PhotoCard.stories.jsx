import * as React from 'react'
import PhotoCard from './PhotoCard'

const base = {
  author: '@ahri',
  category: 'Glamour',
  image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=640',
  isLocked: false,
  lockType: 'subscribers',
}

export default { title: 'Components/Photos/PhotoCard', component: PhotoCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = { args: { data: base } }
export const Locked = { args: { data: { ...base, isLocked: true, lockType: 'subscribers' } } }
export const Premium = { args: { data: { ...base, isLocked: true, lockType: 'premium' } } }
