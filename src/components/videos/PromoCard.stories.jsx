import * as React from 'react'
import PromoCard from './PromoCard'

const sample = {
  thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=640',
  promoTitle: 'Go Live!',
  promoSubtitle: 'Start your own cam show and earn',
  promoCtaLabel: 'Start Broadcasting',
}

export default { title: 'Components/Videos/PromoCard', component: PromoCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = { args: { data: sample } }
