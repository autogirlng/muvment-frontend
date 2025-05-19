"use client";
import { TermsContentContainer } from "@/components/TermsOfService/TermsContainer";
import { NumberedList } from "@/components/TermsOfService/NumberedList";
import { TermsSection } from "@/components/TermsOfService/TermsSection";
import { SectionNav } from "@/components/TermsOfService/SectionNav";
import Footer from "@/components/LandingPageComponents/Footer";
import DesktopNav from "@/components/Navbar/DesktopNav";
import MobileNav from "@/components/Navbar/MobileNav";
import { PolicyHeader } from "@/components/TermsOfService/PolicyHeader";
import { ParagraphText } from "@/components/TermsOfService/Paragraph";

function TermsOfService() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = [
    { id: "general-terms", label: "General Terms" },
    { id: "general-rental", label: "General Rentals" },
    { id: "cancellation-refunds", label: "Cancellation and Refunds" },
  ];

  const generalTerms = [
    " By making a payment for any of Muvment services after receiving an invoice, you agree to abide by these Terms and Conditions. It is assumed that you have read, understood, and accepted all terms herein.",
  ];

  const generalRentalItems = [
    { title: "Standard Rental hours are 12 hours." },
    {
      title:
        "You will have to pay for every extra hour spent outside your 12-hour booking period.",
    },
    {
      title:
        "You have an hour to inspect or reject a vehicle based on mechanical faults such as faulty AC.",
    },
    {
      title:
        "Accommodation should be provided for drivers for journey or 24 hours bookings.",
    },
    {
      title:
        "Our general pricing applies within central city areas. Outskirts locations attract extra charges. Outskirts locations include but not limited to Sangotedo, Badagry, Amuwo Odofin, Festac Town, Alaba, Ikorodu Town, Agbara, Agege, Epe, Free Trade Zone, Igando, Akowonjo, Dopemu, Ajah, Agbado, Ojodu Berger, Ajegunle, Ibese, Iyana Ipaja, Alimoso, Ibeju Lekki.",
    },
    {
      title:
        "We will provide 15 litres of fuel for your ride, in the event the fuel finishes during trips, you will be responsible for fueling an amount that can complete your ride.",
    },
    {
      title:
        "For travels, we only give a full tank, afterward, you will be responsible for fueling the car when the fuel finishes.",
    },
    {
      title:
        "If you know you will be extending beyond your stated time, you will have to place the request and make payment before the expiration of those 12 hours.",
    },
    {
      title:
        "The driver is allowed to leave when the time has expired after giving a call or dropping a text message notice of expiration for the client.",
    },
    {
      title:
        "For bookings that are three days or longer, please note that the chauffeur initially assigned to you may be replaced by another verified and professional chauffeur from our office. This is done to ensure your safety and well-being, as our chauffeurs are given regular rest periods to stay alert on the job. Rest assured that any replacement chauffeur will be fully qualified to provide you with the same high-quality service that you expect from us.",
    },
    {
      title:
        "If a client forgets an item behind in our rental, they are expected to notify us within a 24-hour window after which we are not liable for the missing item if it was left in our rental vehicle.",
    },
    {
      title:
        "A journey beyond Lagos is a full-day booking, and the rental period does not extend after you are back in Lagos.",
    },
    {
      title:
        "Fuel Purchase Requirement: For rentals requiring the customer to refuel/fuel the vehicle, there is a mandatory minimum fuel purchase to ensure the proper functioning and maintenance of our fuel pumps. Customers renting SUVs must purchase a minimum of ₦10,000 worth of fuel, while those renting Sedans are required to purchase at least ₦5,000 worth of fuel. This policy helps maintain the optimal operation of our vehicles and ensures that each is adequately fueled for performance and reliability.",
    },
    {
      title:
        "Customers are solely responsible for any disputes, chargebacks, or reversals of transactions, and the Company is entitled to deduct such amounts from the payment due.",
    },
  ];

  const cancellationNoticeItems = [
    {
      title: "Cancellations with less than 72 hours’ notice",
      content: "Bookings canceled within this period will not be refunded.",
    },
    {
      title: "Cancellations with more than 72 hours’ notice",
      content:
        "50% of the booking price will be forfeited. The remaining 50% can be refunded (processed within 24 hours of the request) or converted into booking credit for future use.",
    },
    {
      title: "Peak Period Bookings (December)",
      content:
        "Due to high demand during the festive season, all December bookings are non-cancellable and non-refundable. Please ensure you are certain of your travel dates before finalizing your booking.",
    },
    {
      title: "Faulty Vehicle Refunds",
      content:
        "Refunds are permissible if a vehicle is found to be faulty. However, the issue must be reported to Muvment within one hour of vehicle use to qualify for a refund.",
    },
    {
      title: "Cancellation Process",
      content:
        "To cancel a booking, clients must submit a formal request via WhatsApp or by contacting our customer support team.",
      subItems: [
        "The request must include the reason for cancellation.",
        "If the request is not properly communicated through these channels before the scheduled start time, the booking period will commence as planned.",
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbars with higher z-index */}
      <DesktopNav user={null} />
      <MobileNav user={null} />

      <PolicyHeader
        title="Terms & Conditions"
        imageSrc="/images/logo_icon_blue.svg"
        date={currentDate}
        bgColor="bg-[#0673FF]"
      />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row pt-5 lg:pt-20">
        {" "}
        {/* Account for navbar height */}
        {/* Desktop Navigation Sidebar */}
        <div className=" lg:w-64 flex-shrink-0 px-4 sticky top-5 lg:top-20  lg:h-[calc(100vh-5rem)]">
          <SectionNav sections={sections} />
        </div>
        {/* Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TermsContentContainer className="bg-white ">
            <TermsSection title="General Terms" id="general-terms">
              <ParagraphText>{generalTerms}</ParagraphText>
            </TermsSection>

            <TermsSection title="General Rental" id="general-refund">
              <NumberedList items={generalRentalItems} className="space-y-4" />
            </TermsSection>

            <TermsSection
              title="Cancellation and Refunds"
              id="cancellation-refunds"
            >
              <NumberedList
                items={cancellationNoticeItems}
                className="space-y-4"
              />
            </TermsSection>
          </TermsContentContainer>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default TermsOfService;
