import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import AccordionList from "@repo/ui/accordion";
import React from "react";

type Props = {};

function FAQ({}: Props) {
  return (
    <section id="faq" className="py-[120px] md:py-[200px]">
      <div className="container space-y-12">
        <LandingPageSectionHeader className="text-primary-900" title="FAQs" />
        <AccordionList
          accordion={[
            {
              title: "Do I need an account to book?",
              content:
                "No, you don’t need to create an account to book. However, you must provide accurate contact details, including an emergency contact, to help us properly identify and reach the customer—especially in case of emergencies or support-related issues. You can also book on behalf of someone else, as long as all required information is correctly provided.",
            },
            {
              title:
                "Is there an age limit for vehicles listed on the platform?",
              content:
                "Yes, vehicles must generally be less than 10 years old, but this may vary based on the location and vehicle type.",
            },
            {
              title: "Are there mileage or location limits for my trip?",
              content:
                "No strict mileage limits—your pricing is based on your trip details. Just note that certain outskirt locations may attract extra charges, and overnight or intercity trips may require additional arrangements.",
            },
            {
              title: "Can I book a trip outside Lagos?",
              content:
                "Yes, but any journey outside Lagos is treated as a full-day rental. Your rental period ends upon your return to Lagos—it doesn’t continue after reentry.",
            },
            {
              title: "What is AutoGirl’s cancellation policy?",
              content:
                "Cancellations made more than 72 hours before the trip may be eligible for a partial refund. No refunds are issued for cancellations within 72 hours. During festive or high-demand periods, bookings are non-refundable.",
            },
            {
              title: "Are airport pickups available?",
              content:
                "Yes. Some hosts offer airport pickup and drop-off services. Look for this option during your search or at checkout.",
            },
            {
              title: "Where do I pick up the vehicle?",
              content:
                "Pickup locations are listed on each vehicle profile. Some hosts offer delivery options for an added fee.",
            },
            {
              title: "What happens if I need the car for longer than 12 hours?",
              content:
                "If you plan to extend your trip, please make the request and complete payment before your initial 12-hour period expires. This ensures the vehicle remains available for you and avoids overtime disputes. If payment isn’t made in time, the driver may leave after notifying you via call or SMS.",
            },
          ]}
        />
      </div>
    </section>
  );
}

export default FAQ;
