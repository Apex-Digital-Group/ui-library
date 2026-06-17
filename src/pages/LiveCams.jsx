import * as React from 'react'
import BrowseGridPage from './BrowseGridPage'
import { liveItems } from '../data/browseItems'

export default function LiveCams() {
  return <BrowseGridPage items={liveItems} />
}
