import Image from "next/image";
import { photoUploadTips } from "@/utils/data";
import { BlurredDialog } from "@repo/ui/dialog";
import { useState } from "react";

type Props = { photoTipIndex: number };

export default function VehiclePhotosTips({ photoTipIndex }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = (value: boolean) => setOpenModal(value);

  return (
    <div className="py-2 md:py-4 3xl:py-5 px-2 md:px-4 3xl:px-6 bg-grey-75 h-fit w-full rounded-[45px]">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex md:block gap-3 items-center min-w-fit">
          <Image
            src="/icons/bulb.png"
            alt=""
            width={72}
            height={72}
            className="w-8 md:w-[60px] 3xl:w-[72px] h-8 md:h-[60px] 3xl:h-[72px]"
          />
          <h5 className="text-black text-base md:text-h5 !font-normal block md:hidden">
            Tips
          </h5>
        </div>
        <div className="text-base 3xl:text-h6 text-grey-700">
          <p className="font-medium">
            {photoUploadTips[photoTipIndex || 0]?.title}
          </p>
          <p className="font-normal">
            {photoUploadTips[photoTipIndex || 0]?.description}{" "}
            <BlurredDialog
              open={openModal}
              onOpenChange={handleModal}
              trigger={
                <button className="text-primary-400">View example</button>
              }
              title="Photo Guidelines"
              content={
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 md:gap-8">
                  <Image
                    src="/images/onboarding/example_1.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                  <Image
                    src="/images/onboarding/example_2.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                  <Image
                    src="/images/onboarding/example_3.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                  <Image
                    src="/images/onboarding/example_4.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                  <Image
                    src="/images/onboarding/example_5.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                  <Image
                    src="/images/onboarding/example_6.png"
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-[250px] md:w-[450px]"
                  />
                </div>
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
}
