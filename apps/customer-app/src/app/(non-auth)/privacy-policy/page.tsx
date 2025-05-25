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

function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = [
    { id: "policy-statement", label: "Policy Statement" },
    { id: "collection-of-information", label: "Collection of Information" },
    { id: "use-of-information", label: "Use of Information" },
    { id: "sharing-of-information", label: "Sharing of Information" },
    { id: "data-retention-and-security", label: "Data Retention and Security" },
    { id: "your-rights", label: "Your Rights" },
    { id: "policy-changes", label: "Policy Changes" },
    { id: "questions-and-changes", label: "Questions and Changes" },
    { id: "contact-information", label: "Contact Information" },
  ];

  const policyStatement = [
    "Welcome to Muvment's Privacy Policy. We are a Nigerian Vehicle Rental Company providing Cars, Boats, and Jets. This policy outlines how we collect, use, store, and protect your personal information. It also details your rights regarding that information. Please note, this policy does not apply to our licensees, affiliates, or other third parties you may interact with through our services.",
  ];

  const collectionOfInformation = [
    { title: "Methods of Collection:", content: "" },
    {
      title: "We collect personal data through various channels, including:",
      content: "",
      subItems: [
        "Our websites and mobile apps",
        "Phone calls and customer service contacts",
        "Rental vehicles",
        "Third-party service providers and business partners",
      ],
    },
    {
      title: "Types of Information Collected:",
      content: "",
      subItems: [
        "Personal Information: Name, age, gender, address, email, phone number, passport number, driver's license, ID photographs, pickup/drop-off locations, areas of use, and duration of use.",
        "Technological Information: IP address, device ID, browser type, operating system, mobile device identifiers, geo-location data, and details about your interactions with our websites.",
        "Rental Information: Name, email, phone number, pickup/drop-off locations, charges incurred, and duration of use.",
        "Vehicle Data: Telematics data such as vehicle condition, performance, location, and driver operation during the rental period.",
        "Sensitive Data: Health-related information for accommodations or in case of an accident, collected with your consent.",
        "Cookies and Online Data Collection: We use cookies to enhance your experience on our websites. Cookies help with website functionality, performance analysis, and targeted advertising. You may manage your cookie preferences through your browser settings.",
      ],
    },
  ];

  const useOfInformation = [
    {
      title: "Purpose:",
      content: "",
      subItems: [
        "Operations and Services: To provide the services you request, including rental reservations, billing, and customer support.",
        "Marketing: With your consent, to send you promotional offers and information about our products and services.",
        "Third-Party Marketing: With your consent, to share your information with third parties that may offer promotions of interest to you.",
        "Business Operations: To comply with legal obligations, protect our interests, enforce our terms, and manage business transactions.",
        "Telematics: To track vehicle performance, safety, and location for billing accuracy and security.",
      ],
    },
  ];

  const sharingOfInformation = [
    {
      title: "With Service Providers and Partners:",
      content:
        "We may share your personal data with trusted third-party providers and partners to fulfill services, process transactions, and enhance your rental experience. This includes:",
      subItems: [
        "Agents, licensees, and companies involved in your rental.",
        "Service providers who assist in business operations, marketing, and research.",
      ],
    },
    {
      title: "For Legal and Protective Reasons:",
      content:
        "We may disclose your data to comply with legal requirements, protect our rights, and manage claims or disputes.",
    },
    {
      title: "Corporate Transactions:",
      content:
        "In a merger, sale, or other business transaction, your data may be transferred as part of the process.",
    },
  ];

  const dataRetentionAndSecurity = [
    {
      title: "Data Retention:",
      content:
        "We retain personal data as long as necessary for the purposes it was collected, or as required by law. Retention periods vary based on the type of data and legal obligations.",
    },
    {
      title: "Security Measures:",
      content:
        "We implement reasonable administrative, technical, and physical measures to safeguard your data against unauthorized access, loss, or modification. Servers storing your data are primarily located in Nigeria, with some information stored in other locations.",
    },
    {
      title: "Transmission Security:",
      content:
        "While we strive to protect your data, no transmission method is completely secure. We encourage you to use secure communication methods when necessary and avoid sharing sensitive information through unencrypted channels.",
    },
  ];

  const yourRights = [
    {
      title: "You have the following rights regarding your personal data:",
      content: "",
      subItems: [
        "Access and Update: Request access to and update your personal data.",
        "Rectification: Correct any inaccuracies in your personal data.",
        "Objection to Processing: Object to the processing of your data for direct marketing or other legitimate interests.",
        "Erasure: Request the deletion of your data under certain circumstances.",
        "Restriction of Processing: Limit how your data is processed in specific situations.",
        "Data Portability: Receive your data in a portable format or request its transfer to another organization.",
        "Withdrawal of Consent: Withdraw consent for data processing at any time.",
      ],
    },
    {
      title:
        "To exercise these rights, please contact us as described in Section 6.",
      content: "",
    },
  ];

  const policyChanges = [
    {
      title: "",
      content:
        "We reserve the right to update this policy at any time. Changes will be effective upon posting and will not apply retroactively. Material changes will be noted on our website with the updated date.",
    },
  ];

  const questionsAndChanges = [
    {
      title: "",
      content:
        "Contact Us: If you have questions or concerns about our privacy practices, or wish to exercise your rights, please contact our Data Protection Officer at info@muvment.ng or write to:",
      subItems: ["Muvment, 16 Bankole Street, Oregun, Ikeja, Lagos, Nigeria"],
    },
    {
      title: "",
      content:
        "For general customer support inquiries, please visit our website and click the 'Contact Us' link.",
    },
  ];

  const contactinformation = [
    {
      title: "",
      content:
        "Should you have any questions or need further clarification on any aspect of these terms, please do not hesitate to contact our customer support team at the following:",
      subItems: ["Email: info@muvment.ng ", "Website: https://muvment.ng"],
      link: [
        { type: "email", href: "mailto:info@muvment.ng" },
        { type: "website", href: "https://muvment.ng" },
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbars with higher z-index */}
      <DesktopNav user={null} />
      <MobileNav user={null} />

      <PolicyHeader
        title="Privacy Policy"
        imageSrc="/images/logo_icon_blue.svg"
        date={currentDate}
        bgColor="bg-[#0673FF]"
      />

      {/* Main Content Area - Improved Layout */}
      <div className="pt-5 lg:pt-20">
        {/* Container with max-width to control overall layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Desktop Navigation Sidebar - Reduced width and better positioning */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0 sticky top-5 lg:top-20 lg:h-[calc(100vh-5rem)]">
              <SectionNav sections={sections} />
            </div>

            {/* Content - Removed excessive max-width constraints */}
            <div className="flex-1 py-8 lg:py-0">
              <TermsContentContainer className="bg-white">
                <TermsSection title="Policy Statement" id="policy-statement">
                  <ParagraphText>{policyStatement}</ParagraphText>
                </TermsSection>
                <TermsSection
                  title="Collection of Information"
                  id="collection-of-information"
                >
                  <NumberedList
                    items={collectionOfInformation}
                    className="space-y-4"
                  />
                </TermsSection>
                <TermsSection
                  title="Use of Information"
                  id="use-of-information"
                >
                  <NumberedList
                    items={useOfInformation}
                    className="space-y-4"
                  />
                </TermsSection>
                <TermsSection
                  title="Sharing Of Information"
                  id="sharing-of-information"
                >
                  <NumberedList
                    items={sharingOfInformation}
                    className="space-y-4"
                  />
                </TermsSection>
                <TermsSection
                  title="Data Retention And Security"
                  id="data-retention-and-security"
                >
                  <NumberedList
                    items={dataRetentionAndSecurity}
                    className="space-y-4"
                  />
                </TermsSection>
                <TermsSection title="Your Rights" id="your-rights">
                  <NumberedList items={yourRights} className="space-y-4" />
                </TermsSection>
                <TermsSection title="Policy Changes" id="policy-changes">
                  <NumberedList items={policyChanges} className="space-y-4" />
                </TermsSection>
                <TermsSection
                  title="Questions and Changes"
                  id="questions-and-changes"
                >
                  <NumberedList
                    items={questionsAndChanges}
                    className="space-y-4"
                  />
                </TermsSection>
                <TermsSection
                  title="Contact Information"
                  id="contact-information"
                >
                  <NumberedList
                    items={contactinformation}
                    linkItems={contactinformation[0].link}
                    className="space-y-4"
                  />
                </TermsSection>
              </TermsContentContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default PrivacyPolicy;
