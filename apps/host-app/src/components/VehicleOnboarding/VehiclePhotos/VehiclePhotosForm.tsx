import React from "react";
import { Formik, Form } from "formik";
import { vehiclePhotosSchema } from "@/utils/validationSchema";
import { StepperNavigation } from "@repo/ui/stepper";
import PhotoUpload from "@repo/ui/photoUpload";
import { vehiclePhotosValues } from "@/utils/initialValues";
import Image from "next/image";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

const photoViews = [
  {
    label: "Front View",
    name: "frontView",
    image: "/images/front_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Back View",
    name: "backView",
    image: "/images/back_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Side View 1",
    name: "sideView1",
    image: "/images/side_view_1.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
  {
    label: "Side View 2",
    name: "sideView2",
    image: "/images/side_view_2.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
  {
    label: "Interior Image",
    name: "interiorImage",
    image: "/images/interior_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Other Image",
    name: "otherImage",
    image: "/images/other_view.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
];

const VehiclePhotosForm = ({ currentStep, setCurrentStep, steps }: Props) => {
  return (
    <Formik
      initialValues={vehiclePhotosValues}
      validationSchema={vehiclePhotosSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {({
        values,
        touched,
        errors,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
          {photoViews.map((item) => (
            <PhotoUpload
              key={item.name}
              id={item.name}
              name={item.name}
              label={item.label}
              image={
                <Image
                  src={item.image}
                  alt=""
                  width={90}
                  height={67}
                  className={item.size}
                />
              }
              value={values.frontView}
              onChange={(fieldName, file) => {
                console.log(values);
                console.log(fieldName, file);

                setFieldTouched(fieldName, true);
                setFieldValue(fieldName, file);
              }}
              // error={
              //   errors.frontView && touched.frontView ? errors.frontView : ""
              // }
            />
          ))}

          <StepperNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            //      saveDraft={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default VehiclePhotosForm;
