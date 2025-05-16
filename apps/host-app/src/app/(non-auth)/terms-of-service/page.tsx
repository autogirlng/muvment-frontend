"use client";
import { TermsContentContainer } from "@/components/TermsOfService/TermsContainer";
import { BulletList } from "@/components/TermsOfService/BulletList";
import { NumberedList } from "@/components/TermsOfService/NumberedList";
import { TermsSection } from "@/components/TermsOfService/TermsSection";
import { SectionNav } from "@/components/TermsOfService/SectionNav";
import Footer from "@/components/LandingPageComponents/Footer";
import DesktopNav from "@/components/Navbar/DesktopNav";
import MobileNav from "@/components/Navbar/MobileNav";
import { PolicyHeader } from "@/components/TermsOfService/PolicyHeader";
import { Paragraph } from "@phosphor-icons/react";
import { ParagraphText } from "@/components/TermsOfService/Paragraph";

function TermsOfService() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  const complimentaryRide = [
    {
      title:
        "Local Area Restriction: All complimentary rides are restricted to within Lagos. Rides requested outside these geographical boundaries will incur standard charges.",
    },
    {
      title:
        "Additional Stops: Clients will incur charges for any stops not initially included in the agreed-upon itinerary.",
    },
    {
      title:
        "Extra Time Usage: If the complimentary ride exceeds the agreed timeline, additional charges for the extra time used will apply.",
    },
    {
      title:
        "Muvment’s Discretion: Muvment reserves the right to accept or reject any proposed itinerary for complimentary rides. This decision is based on factors like route feasibility, scheduling constraints, and operational capacity.",
    },
  ];
  const extraCharge = [
    {
      title:
        "Late Night and Early Morning Bookings: Bookings that commence between 10:00 PM and 6:00 AM are subject to an additional fee to cover operational costs and the inconvenience associated with late-night or early-morning service. This fee will be specified at the time of booking.",
    },

    {
      title:
        "Extra Time Charges: Extra time charges vary by vehicle type. Higher rates apply for newer models (2021 onwards), bulletproof vehicles, buses, vintage cars, and luxury cars compared to standard vehicle models.",
    },
    {
      title:
        "Late-Night Trips: Trips that extend into the night or start during late-night hours will incur additional charges.",
    },
    {
      title:
        "Geographical Travel Charges: Itineraries involving more than two crossings between central Lagos Island and the Mainland in a single trip will result in extra charges.",
    },
    {
      title:
        "Daily Rental Closing Time: Daily rentals end at 10 PM. Services used beyond this time are considered extra hours and will be charged accordingly.",
    },
  ];

  const vehicleSale = [
    {
      title:
        "If a customer’s mechanic has inspected and certified this car as okay which is mandatory before payment and therefore payment for this car is non-refundable.",
    },
  ];
  const airportPickup = [
    {
      title:
        "Cancellation Policy: Cancellations are not permitted within one hour of the scheduled pick-up time. If you do not use the vehicle, no refund will be provided.",
    },
    {
      title:
        "Service Coverage: Each booking covers a single pick-up and drop-off. If the vehicle is used for additional airport trips within the same day, each trip will be considered a separate booking and will incur additional charges.",
    },
    {
      title:
        "Booking Duration: Airport pick-ups include a four-hour service window. If there are changes to your flight that require extending this window, an additional fee will be charged for each hour beyond the initial four hours. This service does not accommodate multiple pick-ups or unscheduled stops; additional requests will result in extra charges.",
    },
    {
      title:
        "Additional Fees: All airport tolls and parking fees incurred during the service are the responsibility of the client.",
    },
    {
      title:
        "Overtime Charges: Services extending beyond the included four-hour duration will incur overtime charges.",
    },
    {
      title:
        "Non-Stop Travel Requirement: The airport pick-up and drop-off service is designed for direct travel from the pick-up point to the destination without unscheduled stops. Requests for stops during the journey are treated as separate bookings and will incur additional charges.",
    },
  ];

  const selfDrive = [
    {
      title:
        "Eligibility and Documentation: Self-drive options are available for select vehicles. Before accepting a self-drive request, we require the submission of specific documents to verify eligibility.",
    },
    {
      title: "Repairs and Maintenance: ",
      subItems: [
        "Minor Repairs: Renters are responsible for all minor repairs during the rental period, such as issues related to the battery or flat tyres. ",
        "Major Repairs: Any major repairs required, especially those involving engine work, must be reported to Muvment immediately for appropriate handling.",
      ],
    },
    {
      title:
        "Payment and Agreement: Upon completing payment for a self-drive rental, renters are obligated to adhere to all terms and conditions as outlined in the service level agreement.",
    },
    {
      title:
        "Identity Verification: A mandatory identity verification must be completed before any self-drive rental can commence. This verification process is completed 48 hours after payment is received.",
    },
    {
      title:
        "Geographical Limitations: Renters agree to operate the vehicle only within the geographical boundaries specified in the rental agreement and invoice. Violations, such as driving the vehicle beyond the designated area, will result in automatic forfeiture of any caution fee or remaining balance associated with the booking. This is crucial for ensuring the safety and proper usage of our vehicles.",
    },
  ];

  const monthlyBooking = [
    {
      title:
        "Booking Duration and Usage: When you reserve a vehicle for a monthly period, the booking is strictly valid for the dates specified in the invoice. Unused days within this period cannot be carried over or extended beyond the specified end date. If you require the vehicle beyond the contracted period, additional days are subject to availability and will be charged at our standard daily rate.",
    },
    {
      title:
        "Driver Assignment: A primary driver will be assigned to you at the start of the booking. Our drivers typically work six days a week; therefore, your assigned driver will have one day off each week. During the monthly booking, driver changes might occur due to scheduling or operational needs.",
    },
    {
      title:
        "Driver Changes: Muvment reserves the right to change the assigned driver as necessary. Reasons for changes include but are not limited to operational requirements or driver availability. You will be notified at least 4 hours before your scheduled pickup time, and we will provide the new driver’s information and details.",
    },
  ];
  const boatCruise = [
    {
      subItems: [
        "Please be punctual ",
        "Time slots will be forfeited if the client misses it.",
        "Ensure you have your life jacket and face masks on while on the cruise ",
        "50% of your booking fee is forfeited on late cancellations ",
        "If it’s raining during your time slot, you have the option of waiting for the rain to stop or choosing a date from the available dates which will be given to you by us",
      ],
    },
  ];

  const acceptTerms = [
    {
      content:
        "By making any partial or full payment for an invoice issued by Muvment, the customer is automatically deemed to agree to and accept all the Terms and Conditions set forth by Muvment. This agreement takes effect upon the successful processing of either a partial or full payment. Such payment constitutes the customer’s explicit acknowledgment and acceptance of all terms, including specific liabilities or service terms detailed in our agreement. Customers are presumed to have read, understood, and consented to all these terms. We encourage customers to contact Muvment for any clarifications or inquiries regarding these terms prior to making any payment. Records of all payments, partial or full, will be maintained as evidence of the customer’s acceptance of these terms.",
    },
  ];

  const conclusion = [
    {
      content:
        "Thank you for choosing Muvment. We value your trust and strive to provide exceptional service and convenience. By agreeing to these Terms and Conditions, you help ensure a smooth and enjoyable experience with our services. Should you have any questions or need further clarification on any aspect of these terms, please do not hesitate to contact our customer support team. We are here to assist you and ensure your satisfaction with our services.Muvment reserves the right to update and modify these Terms and Conditions at any time to reflect changes in our services or response to customer feedback or legal requirements. Such modifications will be effective immediately upon posting on our website or direct communication to you.We look forward to serving you and providing a reliable and enjoyable experience.",
    },
  ];

  const contact = [
    {
      content:
        "Should you have any questions or need further clarification on any aspect of these terms, please do not hesitate to contact our customer support team at the following:",
      subItems: [
        "Email: info@autogirl.ng",
        "Website: https://autogirl.ng",
        "Phone Number: +234816747416  and +2347002255288",
      ],
    },
  ];

  const sections = [
    { id: "general-terms", label: "General Terms" },
    { id: "general-rental", label: "General Rentals" },
    { id: "cancellation-refunds", label: "Cancellation and Refunds" },
    { id: "complimentary-ride", label: "Complimentary Ride " },
    { id: "extra-charge", label: "Extra Charge" },
    { id: "vehicle-sale", label: "Vehicle Sale" },
    { id: "airport-drop-pickup", label: "Airport Pick-Up and Drop-Off" },
    { id: "self-drive", label: "Self Drive" },
    { id: "monthly-booking", label: "Monthly Booking" },
    { id: "boat-cruise", label: "Boat Cruise" },
    { id: "acceptance-of-terms", label: "Acceptance of Terms through Payment" },
    { id: "conclusion", label: "Conclusion" },
    { id: "contact", label: "Contact Information" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbars with higher z-index */}
      <DesktopNav user={null} userToken={""} />
      <MobileNav user={null} userToken={""} />

      <PolicyHeader
        title="Terms & Conditions"
        imageSrc="/images/logo/logo_icon_blue.png"
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

            <TermsSection title="General Rental" id="general-rental">
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

            <TermsSection title="Complimentary Ride" id="complimentary-ride">
              <NumberedList items={complimentaryRide} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Extra Charges" id="extra-charge">
              <NumberedList items={extraCharge} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Vehicle Sale" id="vehicle-sale">
              <NumberedList items={vehicleSale} className="space-y-4" />
            </TermsSection>
            <TermsSection
              title="Airport Pickup And Drop Off"
              id="airport-drop-pickup"
            >
              <NumberedList items={airportPickup} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Self Drive" id="self-drive">
              <NumberedList items={selfDrive} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Monthly Booking" id="monthly-booking">
              <NumberedList items={monthlyBooking} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Boat Cruise" id="boat-cruise">
              <NumberedList items={boatCruise} className="space-y-4" />
            </TermsSection>
            <TermsSection
              title="Acceptance of Terms through Payment
"
              id="acceptance-of-terms"
            >
              <NumberedList items={acceptTerms} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Conclusion" id="conclusion">
              <NumberedList items={conclusion} className="space-y-4" />
            </TermsSection>
            <TermsSection title="Contact Information" id="contact">
              <NumberedList items={contact} className="space-y-4" />
            </TermsSection>
          </TermsContentContainer>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default TermsOfService;
