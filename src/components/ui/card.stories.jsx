import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export const Default = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>Across all bonded creators</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="t-display-md">£24,308</p>
        <p className="t-body-sm">+12.4% vs last month</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="outline">View report</Button>
      </CardFooter>
    </Card>
  ),
}
