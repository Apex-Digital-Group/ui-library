import * as React from 'react'
import TransactionsModal from './TransactionsModal'

const TRANSACTIONS = [
  { id: 1, date: '2025-11-25 04:07', type: 'transfer', amount: '+7.00', paymentMode: '-', paymentType: '-', note: 'Fund Transferred to JustinCase' },
  { id: 2, date: '2025-11-24 18:32', type: 'tip', amount: '+15.00', paymentMode: 'Credits', paymentType: 'Tip', note: 'Tip from @LuckyFan23' },
  { id: 3, date: '2025-11-24 12:15', type: 'commission', amount: '-12.50', paymentMode: '-', paymentType: 'Commission', note: 'Platform commission on sale' },
  { id: 4, date: '2025-11-23 21:45', type: 'credit', amount: '+50.00', paymentMode: 'Card', paymentType: 'Purchase', note: 'Credits purchased via Visa' },
  { id: 5, date: '2025-11-23 14:20', type: 'purchase', amount: '+25.00', paymentMode: 'Credits', paymentType: 'Content', note: 'Video bundle sale to @viewer99' },
  { id: 6, date: '2025-11-22 09:30', type: 'support', amount: '+5.00', paymentMode: 'Credits', paymentType: 'Support', note: 'Support from @BigSupporter' },
  { id: 7, date: '2025-11-21 16:55', type: 'debit', amount: '-100.00', paymentMode: 'Bank', paymentType: 'Withdrawal', note: 'Withdrawal to bank account' },
  { id: 8, date: '2025-11-20 22:10', type: 'tip', amount: '+8.50', paymentMode: 'Credits', paymentType: 'Tip', note: 'Tip from @NightOwl42' },
  { id: 9, date: '2025-11-19 11:05', type: 'transfer', amount: '-20.00', paymentMode: '-', paymentType: '-', note: 'Transfer to @FriendlyModel' },
  { id: 10, date: '2025-11-18 08:45', type: 'credit', amount: '+100.00', paymentMode: 'PayPal', paymentType: 'Purchase', note: 'Credits purchased via PayPal' },
]

const TRANSACTION_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'credit', label: 'Credit' },
  { value: 'debit', label: 'Debit' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'tip', label: 'Tip' },
  { value: 'support', label: 'Support' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'commission', label: 'Commission' },
]

export default {
  title: 'Components/TransactionsModal',
  component: TransactionsModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    transactions: {
      control: 'object',
      description: 'Rows shown in the table. Each: { id, date, type, amount, paymentMode, paymentType, note }.',
    },
    transactionTypes: {
      control: 'object',
      description: 'Options for the type filter. Each: { value, label }.',
    },
    itemsPerPage: { control: 'number' },
    onClose: { action: 'close' },
    onExportCSV: { action: 'exportCSV', description: 'Called on Export CSV with { transactions, typeFilter, startDate, endDate }.' },
  },
}

export const Default = {
  name: 'TransactionsModal',
  render: (args) => <TransactionsModal {...args} />,
  args: {
    isOpen: true,
    transactions: TRANSACTIONS,
    transactionTypes: TRANSACTION_TYPES,
    itemsPerPage: 10,
  },
}
