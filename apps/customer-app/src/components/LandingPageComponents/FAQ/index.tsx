import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import AccordionList from "@repo/ui/accordion";
import React from "react";

type Props = {};

function FAQ({}: Props) {
  return (
    <section id="faq" className="py-[120px] md:py-[150px]">
      <div className="container space-y-12">
        <LandingPageSectionHeader className="text-primary-900" title="FAQs" />
        <AccordionList
          accordion={[
            {
              title: "Do I need an account to book?",
              content:
                "No, you don’t need to create an account to book. However, you must provide accurate contact details, including an emergency contact, to help us properly identify and reach the customer, especially in case of emergencies or support-related issues.",
            },
            {
              title: "How long is the standard rental period on AutoGirl?",
              content:
                "Our standard rental period is 12 hours. Any use of the vehicle beyond this time will attract overtime charges, which vary depending on the vehicle category. You can view applicable overtime rates at checkout or in your booking summary.",
            },
            {
              title: "What happens if I need the car for longer than 12 hours?",
              content:
                "If you plan to extend your trip, please make the request and complete payment before your initial 12-hour period expires. This ensures the vehicle remains available for you and avoids overtime disputes. If payment isn’t made in time, the driver may leave after notifying you via call or SMS.",
            },
            {
              title: "Can I reject a vehicle if something is wrong with it?",
              content:
                "Yes. You have a 1-hour inspection window once the vehicle is delivered. If there’s a mechanical issue, like a faulty AC, you can reject the vehicle within that period, and our support team will step in to assist.",
            },
            {
              title: "Will I always have the same driver during my trip?",
              content:
                "For trips that last three days or longer, your initially assigned chauffeur may be replaced by another verified Muvment driver. This rotation is for safety reasons, ensuring our drivers stay well-rested and alert. Rest assured, all our chauffeurs are professional, courteous, and fully vetted.",
            },
            {
              title: "Are prices the same across all locations in Lagos?",
              content:
                "Our pricing covers most central city areas in Lagos. However, trips involving outskirts locations like Sangotedo, Ikorodu Town, Festac, Badagry, or Alimosho will attract additional charges. The fee reflects the longer travel times and logistics involved in serving those areas.",
            },
            {
              title: "Do I need to fuel the car during my rental?",
              content:
                "Yes, if you're responsible for refueling, there's a minimum fuel purchase requirement: ₦5,000 minimum for Sedans and ₦10,000 minimum for SUVs.",
            },
            {
              title: "Can I book a trip outside Lagos?",
              content:
                "Yes, but any journey outside Lagos is treated as a full-day rental. Your rental period ends upon your return to Lagos, it doesn’t continue after reentry.",
            },
            {
              title: "What happens if I forget something in the vehicle?",
              content:
                "Please notify us within 24 hours of the trip ending if you've left something behind. While we do our best to help, Muvment is not liable for lost items after that window.",
            },
          ]}
        />
      </div>
    </section>
  );
}

export default FAQ;
