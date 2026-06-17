import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from './form'
import { Input } from './input'
import { Button } from './button'

export default { title: 'UI/Form', component: Form, tags: ['autodocs'], parameters: { layout: 'centered' } }

const schema = z.object({
  username: z.string().min(2, 'At least 2 characters'),
})

export const Default = {
  render: function Render() {
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { username: '' } })
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6 w-[320px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl><Input placeholder="bondmedia" {...field} /></FormControl>
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}
