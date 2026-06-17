import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

export default { title: 'UI/Accordion', component: Accordion, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="a">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. Comes pre-styled to match the rest of the system.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes, with collapsible content animations.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
