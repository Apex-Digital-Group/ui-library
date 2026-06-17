import * as React from 'react'
import PostCard from './PostCard'

const sample = {
  author: 'Ahri',
  authorImage: 'https://i.pravatar.cc/64?img=5',
  timestamp: '2 hours ago',
  content: 'Just finished an amazing photoshoot — exclusive shots dropping for subscribers tonight 💜✨',
  images: [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=640',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=640',
  ],
}

export default { title: 'Components/Feed/PostCard', component: PostCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = { args: { post: sample } }
export const SinglePhoto = { args: { post: { ...sample, images: [sample.images[0]] } } }
export const TextOnly = { args: { post: { ...sample, images: [] } } }
