import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "../../lib/faq";

const FAQ = () => {
  return (
    <div className="my-[100px]">
      <h1 className="text-center text-4xl font-semibold">FAQ</h1>
      <Accordion type="single" collapsible className="w-full mt-[50px]">
        {data.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
