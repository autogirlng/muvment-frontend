import Image from 'next/image';
import React from 'react'

type Props = {}

export default function VehiclePhotosTips({}: Props) {
  return (
    <div className="py-2 md:py-4 3xl:py-5 px-2 md:px-4 3xl:px-6 bg-grey-75 h-fit w-full rounded-[45px]">
      <div className="flex gap-6 items-center">
        <Image
          src="/images/bulb.png"
          alt=""
          width={72}
          height={72}
          className="w-8 md:w-[60px] 3xl:w-[72px] h-8 md:h-[60px] 3xl:h-[72px]"
        />
        <div className="text-base 3xl:text-h6 text-grey-700 hidden md:block">
          <p className="font-medium"> Capture the Car&apos;s Condition</p>
          <p className="font-normal">
            Make sure your photos reflect the current condition of your car.
            Honesty builds trust with potential renters. If there are any minor
            dings or scratches, include a photo so there are no surprises.View
            example
          </p>
        </div>
      </div>
    </div>
  );
}