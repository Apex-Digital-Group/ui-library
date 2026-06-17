import * as React from 'react'
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from './toast'

export default {
  title: 'Components/toast',
  component: ToastProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const ToastProviderExample = {
  name: 'ToastProvider',
  render: (args) => <ToastProvider {...args} />,
  args: {},
}

export const ToastViewportExample = {
  name: 'ToastViewport',
  render: (args) => <ToastViewport {...args} />,
  args: {},
}

export const ToastExample = {
  name: 'Toast',
  render: (args) => <Toast {...args} />,
  args: {},
}

export const ToastTitleExample = {
  name: 'ToastTitle',
  render: (args) => <ToastTitle {...args} />,
  args: {},
}

export const ToastDescriptionExample = {
  name: 'ToastDescription',
  render: (args) => <ToastDescription {...args} />,
  args: {},
}

export const ToastCloseExample = {
  name: 'ToastClose',
  render: (args) => <ToastClose {...args} />,
  args: {},
}

export const ToastActionExample = {
  name: 'ToastAction',
  render: (args) => <ToastAction {...args} />,
  args: {},
}
