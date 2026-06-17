import * as React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from './breadcrumb'

export default {
  title: 'Components/breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const BreadcrumbExample = {
  name: 'Breadcrumb',
  render: (args) => <Breadcrumb {...args} />,
  args: {},
}

export const BreadcrumbListExample = {
  name: 'BreadcrumbList',
  render: (args) => <BreadcrumbList {...args} />,
  args: {},
}

export const BreadcrumbItemExample = {
  name: 'BreadcrumbItem',
  render: (args) => <BreadcrumbItem {...args} />,
  args: {},
}

export const BreadcrumbLinkExample = {
  name: 'BreadcrumbLink',
  render: (args) => <BreadcrumbLink {...args} />,
  args: {},
}

export const BreadcrumbPageExample = {
  name: 'BreadcrumbPage',
  render: (args) => <BreadcrumbPage {...args} />,
  args: {},
}

export const BreadcrumbSeparatorExample = {
  name: 'BreadcrumbSeparator',
  render: (args) => <BreadcrumbSeparator {...args} />,
  args: {},
}

export const BreadcrumbEllipsisExample = {
  name: 'BreadcrumbEllipsis',
  render: (args) => <BreadcrumbEllipsis {...args} />,
  args: {},
}
