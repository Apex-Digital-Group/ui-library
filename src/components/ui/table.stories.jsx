import * as React from 'react'
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader,
  TableFooter, TableRow,
} from './table'

const INVOICES = [
  { invoice: 'INV001', status: 'Paid',    method: 'Credit card',  total: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal',       total: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid',  method: 'Bank transfer',total: '$350.00' },
  { invoice: 'INV004', status: 'Paid',    method: 'Credit card',  total: '$450.00' },
]

export default { title: 'UI/Table', component: Table, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Table className="w-[560px]">
      <TableCaption>Recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
