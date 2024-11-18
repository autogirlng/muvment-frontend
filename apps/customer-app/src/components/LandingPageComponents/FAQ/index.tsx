import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import AccordionList from "@repo/ui/accordion";
import React from "react";

type Props = {};

function FAQ({}: Props) {
  return (
    <section className="py-[120px] md:py-[200px]">
      <div className="container space-y-12">
        <LandingPageSectionHeader className="text-primary-900" title="FAQs" />
        <AccordionList
          accordion={[
            {
              title: "What types of vehicles are available for rental?",
              content:
                "You can easily book a vehicle through our website or by contacting our customer service team. Simply choose your preferred vehicle and rental period.",
            },
            {
              title: "How do I book a vehicle?",
              content:
                "You can easily book a vehicle through our website or by contacting our customer service team. Simply choose your preferred vehicle and rental period.",
            },
            { title: "What are the payment options?", content: "" },
            {
              title: "Are there any age requirements for renting a vehicle?",
              content: "",
            },
            {
              title: "Is insurance included in the rental price?",
              content: "",
            },
            { title: "Can I extend my rental period?", content: "" },
            { title: "What is the cancellation policy?", content: "" },
            { title: "Are there mileage limits on rentals?", content: "" },
          ]}
        />
      </div>
    </section>
  );
}

export default FAQ;
