import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { StepperNavigation } from "@repo/ui/stepper";
import Image from "next/image";
import Icons from "@repo/ui/icons";
import cn from "classnames";
import Chip from "@repo/ui/chip";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

const sliderImages = [
  "/images/onboarding/slider.png",
  "/images/onboarding/slider.png",
  "/images/onboarding/slider.png",
  "/images/onboarding/slider.png",
  "/images/onboarding/slider.png",
  "/images/onboarding/slider.png",
];

const carPreviewImages = [
  "/images/onboarding/car_preview1.png",
  "/images/onboarding/car_preview2.png",
  "/images/onboarding/car_preview3.png",
  "/images/onboarding/car_preview4.png",
  "/images/onboarding/car_preview5.png",
  "/images/onboarding/car_preview6.png",
];

const vehicleDetails = [
  { make: "Hyundai" },
  { model: "Tuscon" },
  { year: 2018 },
  { colour: "White" },
  { city: "Lagos" },
  { vehicleType: "Sedan" },
  { seatingCapacity: 4 },
];

export default function VehicleSummary({
  currentStep,
  setCurrentStep,
  steps,
}: Props) {
  return (
    <div className="space-y-11">
      <div className="space-y-6 md:space-y-8">
        {/* slider */}
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="vehicle-summary-swiper"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt=""
                width={1120}
                height={460}
                className="w-full h-[218px] md:h-full rounded-[42px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* name of car */}
        <h2 className="text-h5 md:text-h3 3xl:text-4xl">Hyundai Tuscon 2018</h2>

        {/* car preview */}
        <div className="flex items-center gap-1 md:gap-7 3xl:gap-[41px]">
          {carPreviewImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt=""
              width={152}
              height={90}
              className="w-full h-[44px] sm:h-[90px] rounded-[18px] object-cover"
            />
          ))}
        </div>
      </div>

      {/* advance notice */}
      <div className="bg-grey-75 p-3 flex gap-3 items-center rounded-[18px]">
        <div className="bg-warning-75 border border-warning-400 text-warning-400 h-[50px] w-[50px] flex justify-center items-center rounded-xl">
          {Icons.ic_notification}
        </div>
        <h6 className="text-grey-700 text-xs md:text-base 3xl:text-h6 !font-medium">
          1 day advance notice required before booking
        </h6>
        <SectionTitle text="" />
      </div>

      <div className="flex items-start gap-10 ">
        <div className="w-2/3 space-y-10">
          {/* vehicle details */}
          <div className="space-y-5">
            <SectionTitle text="Vehicle Details" />
            <div className="flex flex-wrap gap-3">
              {vehicleDetails.map((detail, index) => {
                const [key, value] = Object.entries(detail)[0]; // Get key-value pair
                return (
                  <Chip
                    key={index}
                    text={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    variant="filled"
                    radius="sm"
                    color="dark"
                  />
                );
              })}
            </div>
          </div>

          {/* vehicle description */}
          <div className="space-y-5">
            <SectionTitle text="Description" className="text-black" />
            <p className="text-base 3xl:text-xl max-w-[535px]">
              2015 Toyota Camry with good fuel efficiency, spacious interior,
              and advanced safety features. Perfect for city driving and long
              trips. Includes GPS, Bluetooth connectivity, and a sunroof.
            </p>
          </div>

          {/* vehicle perks */}
          <div className="space-y-5">
            <SectionTitle text="Perks" />
            <div></div>
          </div>

          {/* vehicle features */}
          <div className="space-y-5">
            <SectionTitle text="Features" />
            <div></div>
          </div>

          {/* outskirt locations */}
          <div className="space-y-5">
            <SectionTitle text="Outskirt Locations" />
          </div>
        </div>

        {/* pricing */}
        <div className="w-1/3"></div>
      </div>

      <StepperNavigation
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        submitText="Submit Vehicle"
        disableSubmitButton
      />
    </div>
  );
}

const SectionTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <h6
    className={cn("text-grey-700 text-xl 3xl:text-h6 !font-medium", className)}
  >
    {text}
  </h6>
);
