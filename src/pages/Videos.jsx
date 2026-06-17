import * as React from 'react'
import BrowseGridPage from './BrowseGridPage'
import { videoItems } from '../data/browseItems'

export default function Videos() {
  return <BrowseGridPage items={videoItems} />
}
