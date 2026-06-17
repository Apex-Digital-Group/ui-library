import * as React from 'react'
import { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from './pagination'

export default {
  title: 'Components/pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const PaginationExample = {
  name: 'Pagination',
  render: (args) => <Pagination {...args} />,
  args: {},
}

export const PaginationContentExample = {
  name: 'PaginationContent',
  render: (args) => <PaginationContent {...args} />,
  args: {},
}

export const PaginationLinkExample = {
  name: 'PaginationLink',
  render: (args) => <PaginationLink {...args} />,
  args: {},
}

export const PaginationItemExample = {
  name: 'PaginationItem',
  render: (args) => <PaginationItem {...args} />,
  args: {},
}

export const PaginationPreviousExample = {
  name: 'PaginationPrevious',
  render: (args) => <PaginationPrevious {...args} />,
  args: {},
}

export const PaginationNextExample = {
  name: 'PaginationNext',
  render: (args) => <PaginationNext {...args} />,
  args: {},
}

export const PaginationEllipsisExample = {
  name: 'PaginationEllipsis',
  render: (args) => <PaginationEllipsis {...args} />,
  args: {},
}
